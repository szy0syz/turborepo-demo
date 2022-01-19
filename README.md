# Turborepo Demo

```bash
yarn build
yarn build --scope=docs
```

```js
const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
});
```

```bash
rm -rf node_modules/ apps/web/node_modules/ apps/docs/node_modules/

rm -rf apps/docs apps/web/

yarn create next-app --example with-tailwindcss with-tailwindcss-app

rm -rf with-tailwindcss-app/node_modules

mv with-tailwindcss-app next-app && cp -r next-app next-next-app
```

```json
{
  "name": "next-app",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "latest",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "server": "*",
    "ui": "*"
  },
  "devDependencies": {
    "@types/node": "17.0.4",
    "@types/react": "17.0.38",
    "autoprefixer": "^10.4.0",
    "config": "*",
    "eslint": "^8.4.1",
    "next-transpile-modules": "^9.0.0",
    "postcss": "^8.4.5",
    "tailwindcss": "^3.0.7",
    "typescript": "4.5.4"
  }
}
```

- `yarn install` 整个项目完美了
