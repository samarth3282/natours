#!/usr/bin/env pwsh
# Prettier + ESLint Setup Script for Windows
# Run this in your project root directory

Write-Host "🚀 Setting up Prettier + ESLint for VS Code..." -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier

# Create .vscode directory
if (!(Test-Path ".vscode")) {
    New-Item -ItemType Directory -Path ".vscode"
}

# Create .prettierrc
$prettierrc = @"
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}
"@
$prettierrc | Out-File -FilePath ".prettierrc" -Encoding UTF8

# Create .prettierignore
$prettierignore = @"
node_modules/
*.log
.env
.DS_Store
*.min.js
coverage/
dist/
build/
"@
$prettierignore | Out-File -FilePath ".prettierignore" -Encoding UTF8

# Create .eslintrc.json
$eslintrc = @"
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
"@
$eslintrc | Out-File -FilePath ".eslintrc.json" -Encoding UTF8

# Create .vscode/settings.json
$vscodeSettings = @"
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
"@
$vscodeSettings | Out-File -FilePath ".vscode/settings.json" -Encoding UTF8

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host "📝 Remember to install VS Code extensions:" -ForegroundColor Cyan
Write-Host "   - Prettier - Code formatter (esbenp.prettier-vscode)" -ForegroundColor White
Write-Host "   - ESLint (dbaeumer.vscode-eslint)" -ForegroundColor White
Write-Host "🎉 You can now format with Shift+Alt+F or save to auto-format!" -ForegroundColor Green
