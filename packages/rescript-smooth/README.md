# rescript-smooth [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][jsxtools]

[<img alt="npm version" src="https://img.shields.io/npm/v/rescript-smooth.svg" height="20">](https://www.npmjs.com/package/rescript-smooth)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/jsxtools/master.svg" height="20">](https://travis-ci.org/jsxtools/jsxtools)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/jsxtools/rescript-smooth.svg" height="20">](https://github.com/jsxtools/jsxtools/issues?q=is:issue+is:open+label:rescript-smooth)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/jsxtools/rescript-smooth.svg" height="20">](https://github.com/jsxtools/jsxtools/pulls?q=is:pr+is:open+label:rescript-smooth)

[rescript-smooth] is a [rescript] configuration for smooth React Apps, allowing you to:

- Use JSX in JavaScript without adding `react` imports.
- Use `class` and `for` attributes in JSX elements.
- Support path mapping specified in `jsconfig.json`.
- Use your own babel, eslint, and postcss configurations as needed.
- Enable CSS sourcemaps in development.

## Installation

Add **rescript-smooth** to your **Create React App** project:

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
      "@app/*": ["components/*"],
      "@css/*": ["components/*/index.module.css"]
    }
  }
}
```

Enjoy writing a smooth **React App**:

```js
// App.js (before)
import Button from '@app/Button';
import style from '@css/Button';

export const App = props => <Button class={style.Button}>{props.children}</Button>;
```

```js
// App.js (after)
import { createElement } from 'react';
import Button from '/path/to/src/components/Button';
import ButtonStyle from '/path/to/src/components/Button/index.module.css';

export const App = props => createElement(Button, { className: style.Button }, props.children);
```

## FAQ

### How do I use this with the default Babel configuration?

Add a babel configuration with the following fields:

```js
// .babelrc.json, or "babel" in package.json
{
  "presets": "react-app"
}
```

#### What if I want the smooth Babel configuration?

```js
// .babelrc.json, or "babel" in package.json
{
  "presets": "smooth-react-app"
}
```

### How do I use this with the default Eslint configuration?

Add an eslint configuration with the following fields:

```js
// .eslintrc.json, or "eslintConfig" in package.json
{
  "extends": "react-app"
}
```

#### What if I want the smooth Eslint configuration?

```js
// .eslintrc.json, or "eslintConfig" in package.json
{
  "extends": "smooth-react-app"
}
```

### How do I use this with the default PostCSS configuration?

Add a PostCSS configuration with the following fields:

```js
// .postcssrc.json
{
  "plugins": [
    "postcss-flexbug-fixes",
    ["postcss-preset-env", { autoprefixer: { flexbox: "no-2009" }, stage: 3 }],
    "postcss-normalize"
  ]
}
```

#### What if I want the smooth PostCSS configuration?

The default and smooth PostCSS configurations are the same.

[rescript]: https://github.com/harrysolovay/rescripts
[rescript-smooth]: https://github.com/jsxtools/jsxtools/tree/master/packages/rescript-smooth
[jsxtools]: https://github.com/jsxtools/jsxtools
