const { default: babelPluginModuleResolver } = require('babel-plugin-module-resolver');
const { existsSync } = require('fs');
const { resolve } = require('path');

// babel-plugin-config-module-resolver
const babelPluginConfigModuleResolver = types => {
	const plugin = babelPluginModuleResolver(types);

	return Object.assign({}, plugin, {
		name: 'babel-plugin-config-resolver',
		pre(file) {
			// get the compiler options from tsconfig.json or jsconfig.json in the file root directory
			const compilerOptions = getCompilerOptions(file.opts.root);

			// set the `root` option from the existing `root` option or the `baseUrl` compiler option
			const hasRootOption = 'root' in this.opts;
			const hasBaseUrlOption = 'baseUrl' in compilerOptions;

			if (hasRootOption) {
				this.opts.root = this.opts.root;
				this.normalizedOpts = this.opts;
			} else if (hasBaseUrlOption) {
				this.opts.root = compilerOptions.baseUrl;
				this.normalizedOpts = this.opts;
			}

			// set the `alias` option from the existing `alias` option and the `paths` compiler option
			const hasPathsOption = 'paths' in compilerOptions;

			if (hasPathsOption) {
				// get the alias root from the `baseUrl` compiler option or the file root directory (and not the plugin root)
				const pathsRoot = hasBaseUrlOption ? compilerOptions.baseUrl : file.opts.root;

				this.opts.alias = Object.assign({}, this.opts.alias, getTransformedPaths(compilerOptions.paths, pathsRoot));
				this.normalizedOpts = this.opts;
			}

			// run the existing plugin.pre function
			if (typeof plugin.pre === 'function') {
				plugin.pre.call(this, file);
			}
		}
	});
};

// get compiler options from tsconfig.json or jsconfig.json
const getCompilerOptions = fileRootDirectory => {
	// get the resolved configuration paths
	const tsConfigFile = resolve(fileRootDirectory, 'tsconfig.json');
	const jsConfigFile = resolve(fileRootDirectory, 'jsconfig.json');

	// return the tsconfig.json configuration, if it is available
	const hasTsConfigFile = existsSync(tsConfigFile);

	if (hasTsConfigFile) {
		return Object(Object(require(tsConfigFile)).compilerOptions);
	}

	// return the jsconfig.json configuration, if it is available
	const hasJsConfigFile = existsSync(jsConfigFile);

	if (hasJsConfigFile) {
		return Object(Object(require(jsConfigFile)).compilerOptions);
	}
};

// get transformed tsconfig.json/jsconfig.json paths, replacing `*` with `(.*)` or `\1`
const getTransformedPaths = (paths, pathsRoot) => Object.entries(Object(paths)).reduce(
	(alias, [name, values]) => Object.assign(
		alias,
		{
			[name.replace(globRegExp, globCapture)]: resolve(pathsRoot, [].concat(values).pop().replace(globRegExp, globReplace))
		}
	),
	{}
);

// transformation strategies for going from path to alias
const globRegExp = /^(.*)\*/;
const globCapture = '^$1(.*)';
const globReplace = '$1/\\1';

module.exports = babelPluginConfigModuleResolver;