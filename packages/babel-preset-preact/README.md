# babel-preset-preact [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][jsxtools]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[babel-preset-preact] is a Babel preset for transforming JSX in JavaScript,
including the automated import of [Preact] used to replace JSX when present.

This preset uses [babel-preset-jsx] which always includes the following plugins:

- [@babel/plugin-syntax-jsx]
- [@babel/plugin-transform-react-jsx]
- [@babel/plugin-transform-react-display-name]
- [babel-plugin-jsx-imports]

And with the development option:

- [@babel/plugin-transform-react-jsx-self]
- [@babel/plugin-transform-react-jsx-source]

## Installation

```sh
npm install @jsxtools/babel-preset-preact --save-dev
```

## Usage

```js
// babel.config.js
{
  "presets": ["@jsxtools/babel-preset-preact"]
}
```

### Usage with Options

```js
// babel.config.js
{
  "presets": [
    "@jsxtools/babel-preset-preact",
    {
      "throwIfNamespace": true // defaults to false
    }
  ]
}
```

## Options

### throwIfNamespace

The `throwIfNamespace` option toggles whether or not to throw an error if a XML
namespaced tag name is used. For example:

```jsx
// will throw by default
<f:image />
```

### development

The `development` option toggles plugins that aid in development, such as
[@babel/plugin-transform-react-jsx-self] and
[@babel/plugin-transform-react-jsx-source].

### useBuiltIns

The `useBuiltIns` option determines whether the preset should use native
built-ins instead of trying to polyfill behavior for any plugins requiring it.

---

The following options should be used sparingly, namely to adjust the import
locations of Preact. Otherwise, they could be used to negate the purpose of
this plugin, in which case [babel-preset-jsx] should be used instead.

### pragma

The `pragma` option defines how the element creation function is added.

```js
// transforms <foo /> into createElement('foo') and potentially imports React
{
  pragma: '{ createElement } from react'
}
```

### pragmaFrag

The `pragmaFrag` option defines how the fragment creation function is added.

```js
// transforms <></> into Fragment and potentially imports React
{
  pragmaFrag: '{ Fragment } from react'
}
```

[@babel/plugin-syntax-jsx]: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-jsx
[@babel/plugin-transform-react-display-name]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-display-name
[@babel/plugin-transform-react-jsx-self]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
[@babel/plugin-transform-react-jsx-source]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
[@babel/plugin-transform-react-jsx]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx
[babel-plugin-jsx-imports]: https://github.com/jonathantneal/babel-plugin-jsx-imports
[babel-preset-jsx]: https://github.com/jsxtools/jsxtools/tree/master/packages/babel-preset-jsx
[babel-preset-preact]: https://github.com/jsxtools/jsxtools/tree/master/packages/babel-preset-preact
[jsxtools]: https://github.com/jsxtools/jsxtools
[Preact]: https://github.com/preactjs/preact

[cli-img]: https://img.shields.io/travis/jsxtools/jsxtools/master.svg
[cli-url]: https://travis-ci.org/jsxtools/jsxtools
[git-img]: https://img.shields.io/github/issues/jsxtools/jsxtools/babel-preset-preact.svg
[git-url]: https://github.com/jsxtools/jsxtools/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/jsxtools/babel-preset-preact.svg
[gpr-url]: https://github.com/jsxtools/jsxtools/pulls
