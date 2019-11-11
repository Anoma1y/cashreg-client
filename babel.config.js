module.exports = {
	presets: [
		[
			'@babel/preset-env', {
				targets: '> 0.25%, not dead',
				modules: false,
				loose: true,
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/preset-react',
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-syntax-dynamic-import',
	],
	env: {
		production: {
			only: ['./src'],
			plugins: [
				'transform-react-remove-prop-types',
				'@babel/plugin-transform-react-inline-elements',
				'@babel/plugin-transform-react-constant-elements',
			],
		},
		test: {},
	},
};
