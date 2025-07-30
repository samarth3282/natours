# Prettier + ESLint Setup for VS Code

## 1. Install Dependencies
```bash
# Core packages
npm install --save-dev prettier eslint

# ESLint + Prettier integration
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

# Optional: For more comprehensive linting
npm install --save-dev eslint-config-standard eslint-plugin-import eslint-plugin-promise eslint-plugin-n
```

## 2. Create Configuration Files

### .prettierrc
```json
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
```

### .prettierignore
```
node_modules/
*.log
.env
.DS_Store
*.min.js
coverage/
dist/
build/
```

### .eslintrc.json
```json
{
  "extends": ["eslint:recommended", "prettier"],
  "plugins": ["prettier"],
  "env": {
    "node": true,
    "es6": true,
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    "no-console": "warn",
    "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]
  }
}
```

### .vscode/settings.json
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.requireConfig": false,
  "eslint.enable": true
}
```

## 3. Add npm Scripts to package.json
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## 4. VS Code Extensions (Install these)
- Prettier - Code formatter (esbenp.prettier-vscode)
- ESLint (dbaeumer.vscode-eslint)

## 5. Quick Setup Commands
```bash
# Create all config files at once
mkdir .vscode
echo '{"singleQuote":true,"semi":true,"tabWidth":2,"trailingComma":"es5","printWidth":80}' > .prettierrc
echo 'node_modules/\n*.log\n.env\n.DS_Store\n*.min.js\ncoverage/\ndist/\nbuild/' > .prettierignore
```

## Usage:
- Format: Ctrl+Shift+P → "Format Document" or Shift+Alt+F
- Auto-fix ESLint: Save file (auto-fix on save enabled)
- Manual commands: npm run format, npm run lint:fix
