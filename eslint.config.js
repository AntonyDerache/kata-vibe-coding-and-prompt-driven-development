import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/no-explicit-any': 0,
			'no-undef': 'off',
			eqeqeq: 'error',
			curly: 'error',
			'no-console': [
				'error',
				{
					allow: ['error']
				}
			],
			'keyword-spacing': 'error',
			'no-irregular-whitespace': 'error',
			'no-else-return': 'error',
			'require-await': 'warn',
			'no-var': 'error',
			'prefer-const': 'error',
			'arrow-spacing': 'error',
			'arrow-parens': ['error', 'as-needed'],
			'svelte/no-useless-mustaches': 'error',
			'svelte/first-attribute-linebreak': [
				'error',
				{
					multiline: 'below',
					singleline: 'beside'
				}
			],
			'svelte/html-closing-bracket-new-line': [
				'error',
				{
					singleline: 'never',
					multiline: 'always',
					selfClosingTag: {
						singleline: 'never',
						multiline: 'always'
					}
				}
			],
			'svelte/indent': [
				'error',
				{
					indent: 2,
					alignAttributesVertically: false
				}
			],
			'svelte/shorthand-attribute': [
				'error',
				{
					prefer: 'never'
				}
			],
			'svelte/sort-attributes': [
				'error',
				{
					order: [
						// `this` property.
						'this',
						// `bind:this` directive.
						'bind:this',
						// `let:` directives. (Alphabetical order within the same group.)
						{ match: '/^let:/u', sort: 'alphabetical' },
						// `id` attribute.
						'id',
						// `name` attribute.
						'name',
						// `slot` attribute.
						'slot',
						// `--style-props` (Alphabetical order within the same group.)
						{ match: '/^--/u', sort: 'alphabetical' },
						// `style` attribute, and `style:` directives.
						['style', '/^style:/u'],
						// `class` attribute.
						'class',
						// `class:` directives. (Alphabetical order within the same group.)
						{ match: '/^class:/u', sort: 'alphabetical' },
						// other attributes. (Alphabetical order within the same group.)
						{
							match: ['!/:/u', '!/^(?:this|id|name|style|class)$/u', '!/^--/u'],
							sort: 'alphabetical'
						},
						// `bind:` directives (other then `bind:this`), and `on:` directives.
						['/^bind:/u', '!bind:this', '/^on:/u'],
						// `use:` directives. (Alphabetical order within the same group.)
						{ match: '/^use:/u', sort: 'alphabetical' },
						// `transition:` directive.
						{ match: '/^transition:/u', sort: 'alphabetical' },
						// `in:` directive.
						{ match: '/^in:/u', sort: 'alphabetical' },
						// `out:` directive.
						{ match: '/^out:/u', sort: 'alphabetical' },
						// `animate:` directive.
						{ match: '/^animate:/u', sort: 'alphabetical' }
					]
				}
			],
			'svelte/max-attributes-per-line': [
				'error',
				{
					multiline: 1
				}
			],
			'svelte/no-at-html-tags': 1
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		}
	}
);
