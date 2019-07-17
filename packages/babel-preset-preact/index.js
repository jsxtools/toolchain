const presetJsx = require.resolve('@jsxtools/babel-plugin-preset-jsx');

const pragmaDefault = {
	aliasName: 'h',
	importName: 'h',
	moduleName: 'preact',
};

const pragmaFragDefault = {
	aliasName: 'Fragment',
	importName: 'Fragment',
	moduleName: 'preact',
};

module.exports = (api, opts) => {
	opts = Object(opts);

	opts.pragma = opts.pragma || pragmaDefault;
	opts.pragmaFrag = opts.pragmaFrag || pragmaFragDefault;

	return {
		presets: [
			presetJsx,
			opts
		]
	};
};
