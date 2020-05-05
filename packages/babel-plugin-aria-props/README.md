# babel-plugin-aria-props [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][toolchain]

[<img alt="npm version" src="https://img.shields.io/npm/v/babel-plugin-aria-props.svg" height="20">](https://www.npmjs.com/package/babel-plugin-aria-props)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/toolchain/master.svg" height="20">](https://travis-ci.org/jsxtools/toolchain)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/toolchain/babel-plugin-aria-props.svg" height="20">](https://github.com/jsxtools/toolchain/issues?q=is:issue+is:open+label:babel-plugin-aria-props)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/toolchain/babel-plugin-aria-props.svg" height="20">](https://github.com/jsxtools/toolchain/pulls?q=is:pr+is:open+label:babel-plugin-aria-props)

[babel-plugin-aria-props] is a Babel plugin that transforms ARIA Reflection properties on JSX elements into React-compatible attributes.

## Installation

Add **babel-plugin-aria-props** to your project:

```sh
npm install babel-plugin-aria-props --save-dev
```

## Usage

Add **babel-plugin-aria-props** to your babel configuration:

```js
// babel.config.js
{
  "plugin": ["aria-props"]
}
```

Enjoy using ARIA reflection properties:

```js
// before:
function MuteButton(isMuted) {
  <button type="button" ariaPressed={isMuted}>Mute</button>
}
```

```js
// after:
function MuteButton(isMuted) {
  <button type="button" aria-pressed={isMuted}>Mute</button>
}
```

[babel-plugin-aria-props]: https://github.com/jsxtools/toolchain/tree/master/packages/babel-plugin-aria-props
[toolchain]: https://github.com/jsxtools/toolchain

[cli-img]: https://img.shields.io/travis/jsxtools/toolchain/master.svg
[cli-url]: https://travis-ci.org/jsxtools/toolchain
[git-img]: https://img.shields.io/github/issues/jsxtools/toolchain/babel-plugin-aria-props.svg
[git-url]: https://github.com/jsxtools/toolchain/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/toolchain/babel-plugin-aria-props.svg
[gpr-url]: https://github.com/jsxtools/toolchain/pulls
