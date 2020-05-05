# eslint-config-preact-app [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][toolchain]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[eslint-config-preact-app] is an [ESLint] configuration for [Preact] apps modeled after [Create React App].

## Installation

```sh
npm install @jsxtools/eslint-config-preact-app --save-dev
```

## Usage

```js
// package.json
{
  "scripts": {
    "lint": "eslint . --resolve-plugins-relative-to node_modules"
  },
  "eslintConfig": {
    "extends": "eslint-config-preact-app"
  }
}
```

[Create React App]: https://github.com/facebook/create-react-app
[ESLint]: https://github.com/eslint/eslint
[eslint-config-preact-app]: https://github.com/jsxtools/toolchain/tree/master/packages/eslint-config-preact-app
[toolchain]: https://github.com/jsxtools/toolchain
[Preact]: https://github.com/preactjs/preact

[cli-img]: https://img.shields.io/travis/jsxtools/toolchain/master.svg
[cli-url]: https://travis-ci.org/jsxtools/toolchain
[git-img]: https://img.shields.io/github/issues/jsxtools/toolchain/eslint-config-preact-app.svg
[git-url]: https://github.com/jsxtools/toolchain/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/toolchain/eslint-config-preact-app.svg
[gpr-url]: https://github.com/jsxtools/toolchain/pulls
