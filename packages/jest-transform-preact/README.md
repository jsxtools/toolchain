# jest-transform-preact [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][jsxtools]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[jest-transform-preact] is a [Jest] transformer for automatically transforming
[Preact] JSX.

## Installation

```sh
npm install @jsxtools/jest-transform-preact --save-dev
```

## Usage

```js
// jest.config.js
{
  "transform": {
    "^.+\\.jsx?$": "jest-transform-preact"
  }
}
```

**jest-transform-preact** works alongside existing babel configurations, adding
[babel-preset-preact] to transform **Preact JSX**.

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      corejs: 3,
      loose: true,
      useBuiltIns: 'entry',
    }]
  ]
}
```

[babel-preset-preact]: https://github.com/jonathantneal/preact-tools/packages/babel-preset-preact
[Jest]: https://github.com/facebook/jest
[jsxtools]: https://github.com/jsxtools/jsxtools
[jest-transform-preact]: https://github.com/jonathantneal/preact-tools/packages/jest-transform-preact
[Preact]: https://github.com/preactjs/preact

[cli-img]: https://img.shields.io/travis/jsxtools/jsxtools/master.svg
[cli-url]: https://travis-ci.org/jsxtools/jsxtools
[git-img]: https://img.shields.io/github/issues/jsxtools/jsxtools/jest-transform-preact.svg
[git-url]: https://github.com/jsxtools/jsxtools/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/jsxtools/jest-transform-preact.svg
[gpr-url]: https://github.com/jsxtools/jsxtools/pulls
