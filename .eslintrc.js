module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
	},
	'extends': [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:@typescript-eslint/recommended',
	],
	'overrides': [
	],
	'parser': 'vue-eslint-parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'parser': '@typescript-eslint/parser',
	},
	'plugins': [
		'vue',
		'@typescript-eslint',
	],
	'rules': {
		'indent': ['error', 'tab'],
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-types': 'off',
		'no-console': 'warn',
		'quotes': ['error', 'single'],
		'semi': ['error', 'never'],
		'no-multiple-empty-lines': ['error', {'max': 1, 'maxEOF': 0}],
		'comma-dangle': ['error', 'always-multiline'],
		'@typescript-eslint/no-empty-function': 'off',
		'vue/multi-word-component-names': 'off',
	},
}
