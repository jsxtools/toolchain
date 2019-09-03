const { writeFileSync } = require('fs');
const cosmiconfig = require('cosmiconfig');
const babelPreconfig = cosmiconfig('babel');
const eslintPreconfig = cosmiconfig('eslint', { packageProp: 'eslintConfig' });
const postcssPreconfig = cosmiconfig('postcss');
const { isArray } = Array;
const { assign, entries, hasOwnProperty, getOwnPropertyDescriptor } = Object;

module.exports = opts => {
	opts = Object(opts);

	// determine whether we are working with a webpack configuration yet
	const isConfig = isArray(Object(opts.module).rules) && isArray(Object(opts.resolve).modules);

	// get the current environment (usually development or production)
	const env = isConfig ? opts.mode : process.env.NODE_ENV;

	// return the processed configuration or the processor
	return isConfig ? rescript(opts) : rescript;

	function rescript(config) {
		// resolve module paths
		const resolveOpts = { paths: [__dirname].concat(config.resolve.modules) };
		const resolve = request => require.resolve(request, resolveOpts);

		// get configurations
		const babelConfig = getEnvConfig(babelPreconfig, env);
		const eslintConfig = getEnvConfig(eslintPreconfig, env);
		const postcssConfig = getEnvConfig(postcssPreconfig, env, getShapePostcssConfig(resolve));

		const cachedBabelConfig = { presets: [], plugins: [] };

		walkRules(config.module.rules, rule => {
			// update babel-loader options
			const isTargetBabelRule = /\bbabel-loader\b/.test(rule.loader) && isArray(rule.options.presets) && rule.options.presets.some(preset => /\bbabel-preset-react-app[\\/]index/.test(preset));

			if (isTargetBabelRule) {
				assign(rule.options, {
					presets: [],
				}, babelConfig || {
					presets: [
						resolve('babel-preset-smooth-react-app'),
					],
				});
				assign(cachedBabelConfig.plugins, rule.options.plugins);
				assign(cachedBabelConfig.presets, rule.options.presets);

				return;
			}

			// update css-loader options
			const isTargetCssLoaderRule = /\bcss-loader\b/.test(rule.loader);

			if (isTargetCssLoaderRule) {
				rule.options.sourceMap = true;
			}

			// update eslint-loader options
			const isTargetEslintRule = /\beslint-loader\b/.test(rule.loader);

			if (isTargetEslintRule) {
				assign(rule.options.baseConfig, {
					extends: [],
					rules: {}
				}, eslintConfig || {
					extends: resolve('eslint-config-react-app'),
					rules: {
						'react/react-in-jsx-scope': 0
					},
				});

				return;
			}

			// update postcss-loader options
			const isTargetPostcssRule = /\bpostcss-loader\b/.test(rule.loader);

			if (isTargetPostcssRule) {
				assign(rule.options, {
					plugins: []
				}, postcssConfig ? postcssConfig : {
					plugins: [
						require(resolve('postcss-flexbugs-fixes'))(),
						require(resolve('postcss-preset-env'))({
							autoprefixer: { flexbox: 'no-2009' },
							stage: 0,
						}),
						require(resolve('postcss-normalize'))(),
					],
					sourceMap: true,
				});

				return;
			}
		});

		// update babel jest configuration
		const cachedBabelConfigJSON = JSON.stringify(cachedBabelConfig, null, '  ');
		const jestBabelTransformData = `module.exports=require('babel-jest').createTransformer(${cachedBabelConfigJSON})`;
		const jestBabelTransformPath = resolve('react-scripts/config/jest/babelTransform.js');

		writeFileSync(jestBabelTransformPath, jestBabelTransformData);

		return config;
	}
};

const walkRules = (rules, callback) => rules.forEach(rule => {
	if (rule.loader) {
		callback(rule);
	} else if (isArray(rule.use)) {
		walkRules(rule.use, callback);
	} else if (rule.oneOf) {
		walkRules(rule.oneOf, callback);
	}
});

const getDefaultFunction = request => typeof Object(request).default === 'function' ? request.default : request;
const getType = value => value === null ? 'null' : isArray(value) ? 'array' : typeof value;

const getEnvConfig = (preconfig, env, shapeConfig) => {
	const { config } = Object(preconfig.searchSync());
	const hasConfig = config === Object(config);

	if (!hasConfig) {
		return null;
	}

	const hasEnv = config.env === Object(config.env);

	if (!hasEnv) {
		return shapeConfig ? shapeConfig(config) : config;
	}

	const envConfig = config.env[env];
	const hasMatchingEnv = envConfig === Object(envConfig);

	delete config.env;

	if (!hasMatchingEnv) {
		return shapeConfig ? shapeConfig(config) : config;
	}

	Object.keys(envConfig).forEach(name => {
		if (hasOwnProperty.call(config, name)) {
			if (isArray(config[name]) && isArray(envConfig[name])) {
				config[name].push(...envConfig[name]);
			} else if (config[name] === Object(config[name]) && envConfig[name] === Object(envConfig[name])) {
				Object.assign(config[name], envConfig[name]);
			} else {
				config[name] = envConfig[name];
			}
		}
	});

	return shapeConfig ? shapeConfig(config) : config;
};

const getShapePostcssConfig = resolve => config => {
	// get the initializer of a postcss plugin
	const getInitializerFunction = plugin => typeof Object(getOwnPropertyDescriptor(plugin, 'postcss')).get === 'function'
		? plugin
	: () => plugin;

	// get an initialized postcss plugin
	const getPlugin = plugin => {
		switch (getType(plugin)) {
			case 'array':
				return getInitializerFunction(
					getDefaultFunction(
						typeof plugin[0] === 'string'
							? require(resolve(plugin[0]))
						: plugin[0] === Object(plugin[0])
							? plugin[0]
						: null
					)
				)(...plugin.slice(1, 2));
			case 'function':
				return getInitializerFunction(plugin)();
			case 'object':
				return getInitializerFunction(getDefaultFunction(plugin))();
			case 'string':
				return getInitializerFunction(getDefaultFunction(require(resolve(plugin))))();
			default:
				return null;
		}
	};

	// get a filtered array of initialized postcss plugins
	const getPlugins = plugins => plugins.reduce((filtered, plugin) => {
		plugin = getPlugin(plugin);

		if (typeof plugin === 'function') {
			filtered.push(plugin);
		}

		return filtered;
	}, []);

	// get an array of initialized postcss plugins
	const getPluginsArray = plugins => {
		switch (getType(plugins)) {
			case 'array': return getPlugins(plugins);
			case 'object': return getPlugins(entries(plugins));
			case 'function': return [
				getInitializerFunction(plugins)()
			];
			case 'string': return [
				getInitializerFunction(getDefaultFunction(require(resolve(plugins))))()
			];
			default: return [];
		}
	};

	// transform postcss "map" config into "sourceMap"
	if ('map' in config) {
		config.sourceMap = config.map;

		delete config.map;
	}

	// transform postcss "plugins" config
	if ('plugins' in config) {
		config.plugins = getPluginsArray(config.plugins);
	}

	return config;
};
