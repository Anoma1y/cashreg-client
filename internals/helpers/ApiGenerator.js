const fs = require('fs');

const MODULE_NAME = 'ApiModule';
const API_FOLDER_NAME = './src/api/Modules';
const OUTPUT_FILE = `${API_FOLDER_NAME }/` + '_index.js';
const ignoreFiles = /(.gitignore|.gitkeep|_?index.[jt]s)/;

function getAllApiModules(path) {
	const output = [];
	const items = fs.readdirSync(path);

	items.map((element) => {
		if (ignoreFiles.test(element)) return;
		const name = element.substr(0, element.lastIndexOf('.')) || element;

		output.push(name);
	});

	return output;
}

function generateExportModules(modules) {
	let output = '// !! WARNING !!\n';
	output += '// This file is auto generated, do not edit by hand\n';
	output += '// run "yarn generate:api" to regenerate this file\n\n';

	output += '/*eslint-disable */\n\n';

	const imports = [];
	const modulesName = [];
	modules.map(module => {
		const moduleName = module + MODULE_NAME;
		const importName = `import ${ moduleName } from './${ module }';`;
		imports.push(importName);
		modulesName.push(moduleName);
	});

	output += imports.join('\n', imports);

	if (imports.length) {
		output += '\n\n';
	}

	output += 'export default {\n  ';
	output += `${modulesName.join(',\n  ') }\n`;
	output += '};\n';
	return output;
}

console.log(`Analyzing ${ API_FOLDER_NAME}`);

const modules = getAllApiModules(API_FOLDER_NAME);

console.log('Generating file output');
const contents = generateExportModules(modules);


if (fs.existsSync(OUTPUT_FILE)) {
	console.log(`Backing up previous version to "${ OUTPUT_FILE }.bak"`);
	fs.renameSync(OUTPUT_FILE, `${OUTPUT_FILE }.bak`);
}

console.log(`Writing to "${ OUTPUT_FILE }"`);
fs.appendFileSync(OUTPUT_FILE, contents);

console.log('DONE!');
