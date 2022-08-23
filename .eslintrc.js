module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'generator-star-spacing': 'off',
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off",
    "no-async-promise-executor": "off",
    "prettier/prettier": "off"  //关闭prettierc 本地代码自动格式化有冲突，如果你的没冲突 打开即可
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
};
