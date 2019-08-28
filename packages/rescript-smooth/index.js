const { writeFileSync } = require('fs');
const cosmiconfig = require('cosmiconfig');
const babelPreconfig = cosmiconfig('babel');
const eslintPreconfig = cosmiconfig('eslint', { packageProp: 'eslintConfig' });
const postcssPreconfig = cosmiconfig('postcss');

module.exports = opts => {
	opts = Object(opts);

	const babelConfig = babelPreconfig.searchSync();
	const eslintConfig = eslintPreconfig.searchSync();
	const postcssConfig = postcssPreconfig.searchSync();
	const isConfig = Array.isArray(Object(opts.module).rules) && Array.isArray(Object(opts.resolve).modules)

	if (isConfig) {
		return rescript(opts);
	}

	return rescript;

	function rescript(config) {
		// resolve module paths
		const resolveOpts = { paths: [__dirname].concat(config.resolve.modules) };

		const cachedBabelConfig = { presets: [], plugins: [] };

		walkRules(config.module.rules, rule => {
			// update babel-loader options
			const isTargetBabelRule = /\bbabel-loader\b/.test(rule.loader) && Array.isArray(rule.options.presets) && rule.options.presets.some(preset => /\bbabel-preset-react-app[\\/]index/.test(preset));

			if (isTargetBabelRule) {
				const injectedBabelConfig = {
					presets: [
						require.resolve('babel-preset-smooth-react-app', resolveOpts)
					]
				};

				Object.assign(rule.options, injectedBabelConfig, Object(babelConfig).config);
				Object.assign(cachedBabelConfig.plugins, rule.options.plugins);
				Object.assign(cachedBabelConfig.presets, rule.options.presets);
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
				const injectedEslintConfig = {
					extends: require.resolve('eslint-config-react-app', resolveOpts),
					rules: {
						'react/react-in-jsx-scope': 0
					}
				};

				return Object.assign(rule.options.baseConfig, injectedEslintConfig, Object(eslintConfig).config);
			}

			// update postcss-loader options
			const isTargetPostcssRule = /\bpostcss-loader\b/.test(rule.loader);

			if (isTargetPostcssRule) {
				const injectedPostcssConfig = {
					plugins: [
						require(require.resolve('postcss-flexbugs-fixes', resolveOpts))(),
						require(require.resolve('postcss-preset-env', resolveOpts))({ autoprefixer: { flexbox: 'no-2009' }, stage: 0 }),
						require(require.resolve('postcss-normalize', resolveOpts))()
					],
					sourceMap: true
				};

				return Object.assign(rule.options, injectedPostcssConfig, Object(postcssConfig).config);
			}
		});

		// update babel jest configuration
		const cachedBabelConfigJSON = JSON.stringify(cachedBabelConfig, null, '  ');
		const jestBabelTransformData = `module.exports=require('babel-jest').createTransformer(${cachedBabelConfigJSON})`;
		const jestBabelTransformPath = require.resolve('react-scripts/config/jest/babelTransform.js', resolveOpts);
		writeFileSync(jestBabelTransformPath, jestBabelTransformData);

		return config;
	}
};

const walkRules = (rules, callback) => rules.forEach(rule => {
	if (rule.loader) {
		callback(rule);
	} else if (Array.isArray(rule.use)) {
		walkRules(rule.use, callback);
	} else if (rule.oneOf) {
		walkRules(rule.oneOf, callback);
	}
});
