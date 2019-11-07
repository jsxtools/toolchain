const { default: babelPluginModuleResolver } = require('babel-plugin-module-resolver');
const { toPosixPath } = require('babel-plugin-module-resolver/lib/utils');
const { existsSync } = require('fs');
const { posix: { join }, resolve } = require('path');

const resolvePosixPath = request => toPosixPath(resolve(request));

// babel-plugin-config-module-resolver
const babelPluginConfigModuleResolver = types => {
	const plugin = babelPluginModuleResolver(types);

	return Object.assign({}, plugin, {
		name: 'babel-plugin-config-module-resolver',
		pre(file) {
			// get the compiler options from tsconfig.json or jsconfig.json in the file root directory
			const compilerOptions = getCompilerOptions(file.opts.root);

			// set the `root` option from the existing `root` option or the `baseUrl` compiler option
			const hasRootOption = 'root' in this.opts;
			const hasBaseUrlOption = 'baseUrl' in compilerOptions;

			if (hasRootOption) {
				this.opts.root = resolvePosixPath(this.opts.root);
				this.normalizedOpts = this.opts;
			} else if (hasBaseUrlOption) {
				this.opts.root = resolvePosixPath(compilerOptions.baseUrl);
				this.normalizedOpts = this.opts;
			}

			// set the `alias` option from the existing `alias` option and the `paths` compiler option
			const hasPathsOption = 'paths' in compilerOptions;

			if (hasPathsOption) {
				// get the alias root from the `baseUrl` compiler option or the file root directory (and not the plugin root)
				const pathsRoot = this.opts.root || toPosixPath(resolve(file.opts.root));

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

	return {};
};

// get transformed tsconfig.json/jsconfig.json paths, replacing `*` with `(.*)` or `\1`
const getTransformedPaths = (paths, pathsRoot) => Object.entries(Object(paths)).reduce(
	(alias, [name, values]) => Object.assign(
		alias,
		{
			[name.replace(globRegExp, globCapture)]: join(pathsRoot, [].concat(values).pop().replace(globRegExp, globReplace))
		}
	),
	{}
);

// transformation strategies for going from path to alias
const globRegExp = /^(.*)\*/;
const globCapture = '^$1(.*)';
const globReplace = '$1\\1';

module.exports = babelPluginConfigModuleResolver;
