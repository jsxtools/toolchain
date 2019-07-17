const jsxImports = require('babel-plugin-jsx-imports');
const transformReactJSX = require.resolve('@babel/plugin-transform-react-jsx');
const transformReactDisplayName = require.resolve('@babel/plugin-transform-react-display-name');
const transformReactJSXSource = require.resolve('@babel/plugin-transform-react-jsx-source');
const transformReactJSXSelf = require.resolve('@babel/plugin-transform-react-jsx-self');

module.exports = (api, opts) => {
	opts = Object(opts);

	const pragma = jsxImports.getPragma(opts.pragma, jsxImports.pragmaDefault);
	const pragmaFrag = jsxImports.getPragma(opts.pragmaFrag, jsxImports.pragmaFragDefault);

	const throwIfNamespace = opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;

	const development = Boolean(opts.development);
	const useBuiltIns = Boolean(opts.useBuiltIns);

	return {
		plugins: [
			[
				jsxImports,
				{
					pragma: pragma,
					pragmaFrag: pragmaFrag
				}
			],
			[
				transformReactJSX,
				{
					pragma: pragma.aliasName,
					pragmaFrag: pragmaFrag.aliasName,
					throwIfNamespace,
					useBuiltIns
				},
			],
			transformReactDisplayName,

			development && transformReactJSXSource,
			development && transformReactJSXSelf,
		].filter(Boolean),
	};
};
