# babel-plugin-config-module-resolver [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][jsxtools]

[<img alt="npm version" src="https://img.shields.io/npm/v/babel-plugin-config-module-resolver.svg" height="20">](https://www.npmjs.com/package/babel-plugin-config-module-resolver)
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/jsxtools/master.svg" height="20">](https://travis-ci.org/jsxtools/jsxtools/jsxtools)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/jsxtools/babel-plugin-config-module-resolver.svg" height="20">](https://github.com/jsxtools/jsxtools/issues?q=is:issue+is:open+label:babel-plugin-config-module-resolver)
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/jsxtools/babel-plugin-config-module-resolver.svg" height="20">](https://github.com/jsxtools/jsxtools/pulls?q=is:pr+is:open+label:babel-plugin-config-module-resolver)

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
[babel-plugin-config-module-resolver]: https://github.com/jsxtools/jsxtools/tree/master/packages/babel-plugin-config-module-resolver
[jsxtools]: https://github.com/jsxtools/jsxtools

[cli-img]: https://img.shields.io/travis/jsxtools/jsxtools/master.svg
[cli-url]: https://travis-ci.org/jsxtools/jsxtools
[git-img]: https://img.shields.io/github/issues/jsxtools/jsxtools/babel-plugin-config-module-resolver.svg
[git-url]: https://github.com/jsxtools/jsxtools/issues
[gpr-img]: https://img.shields.io/github/issues-pr/jsxtools/jsxtools/babel-plugin-config-module-resolver.svg
[gpr-url]: https://github.com/jsxtools/jsxtools/pulls
