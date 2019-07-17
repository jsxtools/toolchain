const { loadPartialConfig, transformSync } = require('@babel/core');

const babelPresetJest = require.resolve('babel-preset-jest');
const babelPresetPreact = require.resolve('@jsxtools/babel-preset-preact');
const babelPluginIstanbul = require.resolve('babel-plugin-istanbul');

const getBabelOptions = (filename, config, transformOptions) => {
	const canInstrument = transformOptions && transformOptions.instrument;

	const { options } = loadPartialConfig({
		caller: {
			name: 'babel-preset-preact',
			supportsStaticESM: false,
		},
		compact: false,
		plugins: canInstrument ? [
			[
				babelPluginIstanbul,
				{
					cwd: config.rootDir,
					exclude: [],
				},
			]
		] : [],
		presets: [
			babelPresetPreact,
			babelPresetJest
		],
		sourceMaps: 'both',
		cwd: config.cwd,
		filename,
	});

	if (transformOptions && transformOptions.instrument) {
		options.auxiliaryCommentBefore = ' istanbul ignore next ';
	}

	return options;
};

const transformer = {
	canInstrument: true,
	process (src, filename, config, transformOptions) {
		const options = getBabelOptions(filename, config, transformOptions);

		const result = transformSync(src, options);

		if (result) {
			const { code, map } = result;

			if (typeof code === 'string') {
				return { code, map };
			}
		}

		return src;
	}
};

module.exports = transformer;
