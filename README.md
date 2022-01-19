# Turborepo Demo

```bash
yarn build
yarn build --scope=docs
```

```js
const withTM = require('next-transpile-modules')(['ui']);

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
    "tsconfig": "*",
    "tailwindcss": "^3.0.7",
    "typescript": "4.5.4"
  }
}
```

- `yarn install` 整个项目完美了

```bash
# in project root
yarn workspace next-app add -D typescript @types/react @types/node
yarn workspace next-next-app add -D typescript @types/react @types/node
```

- ❗❗️❗️️ 多个️项目需要集中控制配置，例如 next 的配置、ts 的配置和服务端的配置。
  - `yarn install`
  - `yarn build`

```bash
mkdir apps/server

yarn workspace server add -D typescript @types/node nodemon

yarn install
```

- `turborepo` 涡轮增压的威力

```bash
Tasks:    3 successful, 3 total
Cached:    0 cached, 3 total
  Time:    10.697s 
✨  Done in 11.26s.

Tasks:    3 successful, 3 total
Cached:    0 cached, 3 total
  Time:    5.671s 
✨  Done in 6.02s.

Tasks:    3 successful, 3 total
Cached:    3 cached, 3 total
  Time:    117ms >>> FULL TURBO
✨  Done in 0.28s.
```
