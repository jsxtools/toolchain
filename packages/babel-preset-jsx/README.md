# babel-preset-jsx [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][toolchain]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[babel-preset-jsx] is a Babel preset for transforming JSX in JavaScript,
including the automated import of functions used to replace JSX when present.

This preset always includes the following plugins:

- [@babel/plugin-syntax-jsx]
- [@babel/plugin-transform-react-jsx]
- [@babel/plugin-transform-react-display-name]
- [babel-plugin-jsx-imports]

And with the development option:

- [@babel/plugin-transform-react-jsx-self]
- [@babel/plugin-transform-react-jsx-source]

## Installation

```sh
npm install @jsxtools/babel-preset-jsx --save-dev
```

## Usage

```js
// babel.config.js
{
  "presets": ["@jsxtools/babel-preset-jsx"]
}
```

### Usage with Options

```js
// babel.config.js
{
  "presets": [
    "@jsxtools/babel-preset-jsx",
    {
      "pragma": "{ h } from preact", // default is createElement from react
      "pragmaFrag": "{ Fragment } from preact", // default is Fragment from react
      "throwIfNamespace": false // defaults to true
    }
  ]
}
```

## Options

### pragma

The `pragma` option defines how the element creation function is added.

```js
// transforms <foo /> into createElement('foo') and potentially imports React
{
  pragma: '{ createElement } from react'
}
```

```js
// transforms <foo /> into h('foo') and potentially imports Preact
{
  pragma: '{ h } from preact'
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

```js
// transforms <></> into Fragment and potentially imports Preact
{
  pragmaFrag: '{ Fragment } from preact'
}
```

### throwIfNamespace

The `throwIfNamespace` option toggles whether or not to throw an error if a XML
namespaced tag name is used. For example:

```jsx
// will not throw by default
<f:image />
```

### development

The `development` option toggles plugins that aid in development, such as
[@babel/plugin-transform-react-jsx-self] and
[@babel/plugin-transform-react-jsx-source].

### useBuiltIns

The `useBuiltIns` option determines whether the preset should use native
built-ins instead of trying to polyfill behavior for any plugins requiring it.

[@babel/plugin-syntax-jsx]: https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-jsx
[@babel/plugin-transform-react-display-name]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-display-name
[@babel/plugin-transform-react-jsx-self]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
[@babel/plugin-transform-react-jsx-source]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
[@babel/plugin-transform-react-jsx]: https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx
[babel-plugin-jsx-imports]: https://github.com/jonathantneal/babel-plugin-jsx-imports
[babel-preset-jsx]: https://github.com/jsxtools/toolchain/tree/master/packages/babel-preset-jsx
[toolchain]: https://github.com/jsxtools/toolchain

[cli-img]: https://img.shields.io/travis/jsxtools/toolchain/master.svg
[cli-url]: https://travis-ci.org/jsxtools/toolchain
[git-img]: https://img.shields.io/github/issues/jsxtools/toolchain/babel-preset-jsx.svg
[git-url]: https://github.com/jsxtools/toolchain/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/toolchain/babel-preset-jsx.svg
[gpr-url]: https://github.com/jsxtools/toolchain/pulls
