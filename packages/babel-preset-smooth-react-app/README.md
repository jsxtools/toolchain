# babel-preset-smooth-react-app [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][jsxtools]

[<img alt="npm version" src="https://img.shields.io/npm/v/babel-preset-smooth-react-app.svg" height="20">](https://www.npmjs.com/package/babel-preset-smooth-react-app)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/jsxtools/master.svg" height="20">](https://travis-ci.org/jsxtools/jsxtools)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/jsxtools/babel-preset-smooth-react-app.svg" height="20">](https://github.com/jsxtools/jsxtools/issues?q=is:issue+is:open+label:babel-preset-smooth-react-app)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/jsxtools/babel-preset-smooth-react-app.svg" height="20">](https://github.com/jsxtools/jsxtools/pulls?q=is:pr+is:open+label:babel-preset-smooth-react-app)

[babel-preset-smooth-react-app] is a Babel preset for smooth Create React Apps.

It is a light wrapper around [babel-preset-react-app] that allows you to:

- Write JSX in JavaScript without adding `react` imports.
- Write `class` and `for` attributes in JSX elements.
- Import modules from `paths` specified in `jsconfig.json`.

## Installation

Add **babel-preset-smooth-react-app** to your project:

```sh
npm install babel-preset-smooth-react-app --save-dev
```

## Usage

Add **babel-preset-smooth-react-app** to your babel configuration:

```js
// babel.config.js
{
  "presets": ["smooth-react-app"]
}
```

Define **path mapping** in `tsconfig.json` or `jsconfig.json`:

```js
// tsconfig.json or jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@com/*": ["components/*"],
      "@css/*": ["components/*.module.css"]
    }
  }
}
```

Enjoy writing a smooth **React App**:

```js
// App.js (before)
import Button from '@com/Button';
import style from '@css/Button/style';

export const App = props => <Button class={style.Button}>{props.children}</Button>;
```

```js
// App.js (after)
import { createElement } from 'react';
import Button from '/path/to/src/components/Button';
import ButtonStyle from '/path/to/src/components/style.module.css';

export const App = props => createElement(Button, { className: style.Button }, props.children);
```

## Options

All options are passed through into [babel-preset-react-app], with additional
options provided to other plugins.

### pragma

The `pragma` option defines how the element creation function is added.

```js
// transforms <foo /> into createElement('foo') and potentially imports React (default)
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
// transforms <></> into Fragment and potentially imports React (default)
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
// will not throw (default)
<f:image />
```

### development

The `development` option toggles plugins that aid in development, such as
[@babel/plugin-transform-react-jsx-self] and
[@babel/plugin-transform-react-jsx-source].

### useBuiltIns

The `useBuiltIns` option determines whether the preset should use native
built-ins instead of trying to polyfill behavior for any plugins requiring it.

[babel-preset-react-app]: https://github.com/facebook/create-react-app/tree/master/packages/babel-preset-react-app
[babel-preset-smooth-react-app]: https://github.com/jsxtools/jsxtools/tree/master/packages/babel-preset-smooth-react-app
[jsxtools]: https://github.com/jsxtools/jsxtools
