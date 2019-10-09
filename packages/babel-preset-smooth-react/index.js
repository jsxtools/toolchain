const configModuleResolver = require.resolve('babel-plugin-config-module-resolver');
const jsxImports = require('babel-plugin-jsx-imports');
const presetReact = require.resolve('@babel/preset-react');
const reactHtmlAttrs = require.resolve('babel-plugin-react-html-attrs');
const transformReactJsx = require.resolve('@babel/plugin-transform-react-jsx');

module.exports = (api, opts) => {
	const env = process.env.BABEL_ENV || process.env.NODE_ENV;
	const isEnvDevelopment = env === 'development';
	const isEnvTest = env === 'test';

	const pragma = jsxImports.getPragma(opts.pragma, jsxImports.pragmaDefault);
	const pragmaFrag = jsxImports.getPragma(opts.pragmaFrag, jsxImports.pragmaFragDefault);

	const throwIfNamespace = opts.throwIfNamespace === undefined ? true : !!opts.throwIfNamespace;

	const isDevelopment = 'development' in opts ? Boolean(opts.development) : isEnvDevelopment || isEnvTest;
	const useBuiltIns = 'useBuiltIns' in opts ? Boolean(opts.useBuiltIns) : true;

	return {
		plugins: [
			configModuleResolver,
			[jsxImports, {
				pragma: pragma,
				pragmaFrag: pragmaFrag,
			}],
			reactHtmlAttrs,
			[transformReactJsx, {
				throwIfNamespace,
				useBuiltIns,
			}],
		].filter(Boolean),
		presets: [
			[
				presetReact,
				{
					...opts,
					pragma: pragma.aliasName,
					pragmaFrag: pragmaFrag.aliasName,
					throwIfNamespace,
					useBuiltIns,
					development: isDevelopment,
				},
			],
		],
	};
};
