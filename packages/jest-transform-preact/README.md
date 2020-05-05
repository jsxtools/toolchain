# jest-transform-preact [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][toolchain]

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
[toolchain]: https://github.com/jsxtools/toolchain
[jest-transform-preact]: https://github.com/jonathantneal/preact-tools/packages/jest-transform-preact
[Preact]: https://github.com/preactjs/preact

[cli-img]: https://img.shields.io/travis/jsxtools/toolchain/master.svg
[cli-url]: https://travis-ci.org/jsxtools/toolchain
[git-img]: https://img.shields.io/github/issues/jsxtools/toolchain/jest-transform-preact.svg
[git-url]: https://github.com/jsxtools/toolchain/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/toolchain/jest-transform-preact.svg
[gpr-url]: https://github.com/jsxtools/toolchain/pulls
