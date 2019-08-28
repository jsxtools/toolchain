# rescript-smooth [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][jsxtools]

[<img alt="npm version" src="https://img.shields.io/npm/v/rescript-smooth.svg" height="20">](https://www.npmjs.com/package/rescript-smooth)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/jsxtools/master.svg" height="20">](https://travis-ci.org/jsxtools/jsxtools)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/jsxtools/rescript-smooth.svg" height="20">](https://github.com/jsxtools/jsxtools/issues?q=is:issue+is:open+label:rescript-smooth)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/jsxtools/rescript-smooth.svg" height="20">](https://github.com/jsxtools/jsxtools/pulls?q=is:pr+is:open+label:rescript-smooth)

[rescript-smooth] is a [rescript] configuration for smooth Create React Apps, allowing you to:

- Write JSX in JavaScript without adding `react` imports.
- Write `class` and `for` attributes in JSX elements.
- Import modules from `paths` specified in `jsconfig.json`.
- Use your own babel, eslint, and postcss configurations.
- Use CSS sourcemaps in development.

## Installation

Add **rescript-smooth** to your project:

```sh
npm install rescript-smooth
```

## Usage

Add **rescript-smooth** to your rescript configuration:

```js
// package.json
{
  "rescripts": ["smooth"]
}
```

Define **path mapping** in `tsconfig.json` or `jsconfig.json`:

```js
// jsconfig.json
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

## FAQ

### How do I use this with the default Babel configuration?

Add a babel configuration with the following fields:

```js
{
  "presets": "react-app"
}
```

### How do I use this with the default Eslint configuration?

Add an eslint configuration with the following fields:

```js
{
  "extends": "react-app"
}
```

### How do I use this with the default PostCSS configuration?

Add a PostCSS configuration with the following fields:

```js
{
  plugins: [
    require('postcss-flexbug-fixes')(),
    require('postcss-preset-env')({ autoprefixer: { flexbox: 'no-2009' }, stage: 0 }),
    require('postcss-normalize')()
  ]
}
```

[rescript]: https://github.com/harrysolovay/rescripts
[rescript-smooth]: https://github.com/jsxtools/jsxtools/tree/master/packages/rescript-smooth
[jsxtools]: https://github.com/jsxtools/jsxtools
