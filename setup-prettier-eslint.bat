@echo off
echo 🚀 Setting up Prettier + ESLint for VS Code...

REM Install dependencies
echo 📦 Installing dependencies...
call npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier

REM Create .vscode directory
if not exist ".vscode" mkdir .vscode

REM Create .prettierrc
echo {> .prettierrc
echo   "singleQuote": true,>> .prettierrc
echo   "semi": true,>> .prettierrc
echo   "tabWidth": 2,>> .prettierrc
echo   "trailingComma": "es5",>> .prettierrc
echo   "printWidth": 80>> .prettierrc
echo }>> .prettierrc

REM Create .prettierignore
echo node_modules/> .prettierignore
echo *.log>> .prettierignore
echo .env>> .prettierignore
echo .DS_Store>> .prettierignore
echo *.min.js>> .prettierignore
echo coverage/>> .prettierignore
echo dist/>> .prettierignore
echo build/>> .prettierignore

REM Create .eslintrc.json
echo {> .eslintrc.json
echo   "extends": ["eslint:recommended", "prettier"],>> .eslintrc.json
echo   "plugins": ["prettier"],>> .eslintrc.json
echo   "env": {>> .eslintrc.json
echo     "node": true,>> .eslintrc.json
echo     "es6": true,>> .eslintrc.json
echo     "browser": true>> .eslintrc.json
echo   },>> .eslintrc.json
echo   "parserOptions": {>> .eslintrc.json
echo     "ecmaVersion": 2020,>> .eslintrc.json
echo     "sourceType": "module">> .eslintrc.json
echo   },>> .eslintrc.json
echo   "rules": {>> .eslintrc.json
echo     "prettier/prettier": "error",>> .eslintrc.json
echo     "no-console": "warn",>> .eslintrc.json
echo     "no-unused-vars": ["error", { "argsIgnorePattern": "req|res|next|val" }]>> .eslintrc.json
echo   }>> .eslintrc.json
echo }>> .eslintrc.json

REM Create .vscode/settings.json
echo {> .vscode\settings.json
echo   "editor.defaultFormatter": "esbenp.prettier-vscode",>> .vscode\settings.json
echo   "editor.formatOnSave": true,>> .vscode\settings.json
echo   "editor.formatOnPaste": true,>> .vscode\settings.json
echo   "editor.codeActionsOnSave": {>> .vscode\settings.json
echo     "source.fixAll.eslint": "explicit">> .vscode\settings.json
echo   },>> .vscode\settings.json
echo   "[javascript]": {>> .vscode\settings.json
echo     "editor.defaultFormatter": "esbenp.prettier-vscode">> .vscode\settings.json
echo   },>> .vscode\settings.json
echo   "[json]": {>> .vscode\settings.json
echo     "editor.defaultFormatter": "esbenp.prettier-vscode">> .vscode\settings.json
echo   },>> .vscode\settings.json
echo   "prettier.requireConfig": false,>> .vscode\settings.json
echo   "eslint.enable": true>> .vscode\settings.json
echo }>> .vscode\settings.json

echo ✅ Setup complete!
echo 📝 Remember to install VS Code extensions:
echo    - Prettier - Code formatter (esbenp.prettier-vscode)
echo    - ESLint (dbaeumer.vscode-eslint)
echo 🎉 You can now format with Shift+Alt+F or save to auto-format!
pause
