import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname
})

const eslintConfig = [
    {
        ignores: [
            '.next/**',
            'node_modules/**',
            'out/**',
            'build/**',
            '*.config.js',
            '*.config.mjs'
        ]
    },
    ...compat.extends('next/core-web-vitals'),
    {
        rules: {
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            'quotes': ['error', 'single', { 'avoidEscape': true }],
            'semi': ['error', 'never'],
            'comma-dangle': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
            'eol-last': ['error', 'always']
        }
    }
]

export default eslintConfig
