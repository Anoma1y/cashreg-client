module.exports = {
	verbose: true,
	// collectCoverageFrom: ['src/utils/**/*.js'],
	// coverageThreshold: {
	// 	global: {
	// 		statements: 98,
	// 		branches: 91,
	// 		functions: 98,
	// 		lines: 98
	// 	}
	// },
	moduleDirectories: [
		'src',
		'node_modules',
	],
	testRegex: 'tests/.*\\.test\\.js$',
	moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
	},
};
