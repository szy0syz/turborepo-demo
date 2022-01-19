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

- ESLINT

```bash
# 单独添加依赖
yarn workspace next-app add -D eslint
yarn workspace next-next-app add -D eslint
yarn workspace server add -D eslint

yarn workspace config add @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb eslint-config-airbnb-base eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jest eslint-plugin-testing-library
```

```bash
$ yarn lint
yarn run v1.22.17
$ turbo run lint
• Packages in scope: config, next-app, next-next-app, server, tsconfig, ui
• Running lint in 6 packages
next-app:lint: cache miss, executing 02d42d64e4c32c73
next-next-app:lint: cache hit, replaying output 7446afcb1d5ae34a
next-next-app:lint: $ eslint src --fix
server:lint: cache hit, replaying output 460d571b37b0b466
server:lint: $ eslint src --fix
next-app:lint: $ eslint src --fix

 Tasks:    3 successful, 3 total
Cached:    2 cached, 3 total
  Time:    2.96s 

✨  Done in 3.11s.
```

> **终于解开了我的一个心病**

```tsx
import { Button } from 'ui/Button';
import { IBoy } from 'server/src/lib/BoyInterface';
```

