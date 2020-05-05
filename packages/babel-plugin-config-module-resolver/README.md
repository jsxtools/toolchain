# babel-plugin-config-module-resolver [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][toolchain]

[<img alt="npm version" src="https://img.shields.io/npm/v/babel-plugin-config-module-resolver.svg" height="20">](https://www.npmjs.com/package/babel-plugin-config-module-resolver)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/toolchain/master.svg" height="20">](https://travis-ci.org/jsxtools/toolchain/jsxtools)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/toolchain/babel-plugin-config-module-resolver.svg" height="20">](https://github.com/jsxtools/toolchain/issues?q=is:issue+is:open+label:babel-plugin-config-module-resolver)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/toolchain/babel-plugin-config-module-resolver.svg" height="20">](https://github.com/jsxtools/toolchain/pulls?q=is:pr+is:open+label:babel-plugin-config-module-resolver)

[babel-plugin-config-module-resolver] is a Babel plugin that resolves modules
using the `tsconfig.json` or `jsconfig.json` configuration.

It is a light wrapper around [babel-plugin-module-resolver].

## Installation

Add **babel-plugin-config-module-resolver** to your project:

```sh
npm install babel-plugin-config-module-resolver --save-dev
```

## Usage

Add **babel-plugin-config-module-resolver** to your babel configuration:

```js
// babel.config.js
{
  "plugin": ["config-module-resolver"]
}
```

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

```js
// App.js (before)
import Button from '@com/Button';
import ButtonStyle from '@css/Button';

// App.js (after)
import Button from '/path/to/src/components/Button';
import ButtonStyle from '/path/to/src/components/Button.module.css';
```

[babel-plugin-module-resolver]: https://github.com/tleunen/babel-plugin-module-resolver
[babel-plugin-config-module-resolver]: https://github.com/jsxtools/toolchain/tree/master/packages/babel-plugin-config-module-resolver
[toolchain]: https://github.com/jsxtools/toolchain

[cli-img]: https://img.shields.io/travis/jsxtools/toolchain/master.svg
[cli-url]: https://travis-ci.org/jsxtools/toolchain
[git-img]: https://img.shields.io/github/issues/jsxtools/toolchain/babel-plugin-config-module-resolver.svg
[git-url]: https://github.com/jsxtools/toolchain/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/toolchain/babel-plugin-config-module-resolver.svg
[gpr-url]: https://github.com/jsxtools/toolchain/pulls
