// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: [
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
            ],
            files: ["*.ts", "*.tsx"],
            parserOptions: {
                project: path.join(__dirname, "tsconfig.json"),
            },
        },
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": ["node_modules", "src/"]
            },
            "typescript": {
                "alwaysTryTypes": true
            }
        }
    },
    plugins: ["prettier", "@typescript-eslint"],
    extends: [
        "prettier",
        "plugin:@typescript-eslint/recommended"
    ],
    rules: {
        "@typescript-eslint/consistent-type-imports": [
            "warn",
            {
                prefer: "type-imports",
                fixStyle: "inline-type-imports",
            },
        ],
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/explicit-module-boundary-types": "error",
        "prettier/prettier": [
            "error",
            {
                "bracketSpacing": true,
                "printWidth": 140,
                "singleQuote": true,
                "trailingComma": "all",
                "useTabs": true,
                "semi": true,
                "quoteProps": "as-needed",
                "jsxSingleQuote": false,
                "bracketSameLine": false,
                "arrowParens": "always"
            }
        ],
        'no-unreachable': 'warn',
        'prefer-const': 'warn',
        'spaced-comment': 'warn',
        "curly": ["error", "all"],
        'brace-style': ['warn', '1tbs'],
    },
};

module.exports = config;
