#!/usr/bin/env node

const { existsSync: exists, readFileSync: read, writeFileSync: write } = require('fs');
const { hasOwnProperty, keys } = Object;

process.chdir(process.env.INIT_CWD || process.env.PWD);

const program = () => {
	if (exists('package.json')) {
		let json, data;

		try {
			json = read('package.json', 'utf8');
			data = parseJson(json);
		} catch (error) {
			console.error('Could not read package.json.');

			process.exit(1);
		}

		updatePackageScripts(data.value);

		const updatedJson = `${data.style.before}${JSON.stringify(data.value, null, data.style.indent)}${data.style.after}`;

		try {
			write('package.json', updatedJson);
		} catch (error) {
			console.error('Could not write package.json.');

			process.exit(1);
		}

		console.log('package.json successfully updated.')
	}

	process.exit(0);
};

const parseJson = json => {
	// get the boundary spacing before and after the json text
	const [, before, text, after] = json.match(/^(\s*)([\W\w]*?)(\s*)$/);

	// get the indentation used within the json text
	const indent = /\s+/.test(text) ? (text.match(/\n\s+/) || [''])[0].slice(1) : '  ';

	// parse the value from the json text
	const value = JSON.parse(text);

	// return the parsed json value as well as the spacing styles
	return { value, style: { before, indent, after } };
};

const updatePackageScripts = pkg => {
	const reactScriptsMatch = /(^|\s)react-scripts(\s|$)/g;

	if (pkg.scripts === Object(pkg.scripts)) {
		let didUpdateScripts = false;

		keys(pkg.scripts).forEach(key => {
			const prevScript = pkg.scripts[key];
			const nextScript = prevScript.replace(reactScriptsMatch, '$1rescripts$2');

			if (prevScript !== nextScript) {
				didUpdateScripts = true;

				pkg.scripts[key] = nextScript;
			}
		});

		if (didUpdateScripts) {
			updateEslintConfig(pkg);
			updateRescriptConfig(pkg);
		}
	}
};

const updateEslintConfig = pkg => {
	const hasEslintConfig = pkg.eslintConfig === Object(pkg.eslintConfig);

	if (hasEslintConfig) {
		if (typeof pkg.eslintConfig.extends === 'string') {
			pkg.eslintConfig.extends = updateEslintConfigExtendName(pkg.eslintConfig.extends);
		} else if (Array.isArray(pkg.eslintConfig.extends)) {
			pkg.eslintConfig.extends = pkg.eslintConfig.extends.map(updateEslintConfigExtendName);
		}
	}
};

const updateRescriptConfig = pkg => {
	if (!hasOwnProperty.call(pkg, 'rescripts')) {
		pkg.rescripts = [];
	}

	if (Array.isArray(pkg.rescripts) && !pkg.rescripts.length) {
		pkg.rescripts.push('smooth');
	}
};

const updateEslintConfigExtendName = name => (
	name === 'eslint-config-react-app'
		? 'eslint-config-smooth-react-app'
	: name === 'react-app'
		? 'smooth-react-app'
	: name
);

program();
