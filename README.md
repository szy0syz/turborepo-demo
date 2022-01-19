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

## sharing tailwindcss ui

```bash
yarn workspace next-app add -D next-transpile-modules

yarn workspace ui add -D tailwindcss postcss autoprefixer
```

```js
const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  reactStrictMode: true,
});
```

- 这个 tailwind.config.js 属实有点凶
  - postcss 真凶
  - 还好有 `jit` 加持
  - 你那边是一种，我这边是一种，大家各成方圆，🌝 🌚

```js
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```bash
yarn add -D -W husky lint-staged

npx husky add .husky/pre-commit "npm run test && npx lint-staged"
```

- 1.`yarn build`
- 2.`yarn test`

```bash
Tasks:    3 successful, 3 total
Cached:    0 cached, 3 total
  Time:    14.999s 
✨  Done in 15.57s.


Tasks:    3 successful, 3 total
Cached:    3 cached, 3 total
  Time:    397ms >>> FULL TURBO
✨  Done in 0.57s.
```

```bahs
~/git/turborepo-demo on  main! ⌚ 15:44:53
$ git commit -m "test: 测试husky"         

> turborepo-basic-shared@0.0.0 test
> turbo run test

• Packages in scope: config, next-app, next-next-app, server, tsconfig, ui
• Running test in 6 packages
ui:test: cache hit, replaying output 8fae2fa6573df746
ui:test: $ echo "tests"
ui:test: tests
server:test: cache hit, replaying output 88a7a86901268167
server:test: $ echo "server-test"
server:test: server-test
server:build: cache hit, replaying output cd1b5ca411b24354
server:build: $ tsc
next-app:test: cache hit, replaying output c5908fd2c591b261
next-app:test: $ echo "next-app"
next-app:test: next-app
next-next-app:test: cache hit, replaying output f6504964af82842d
next-next-app:test: $ echo "next-next-app"
next-next-app:test: next-next-app

 Tasks:    5 successful, 5 total
Cached:    5 cached, 5 total
  Time:    65ms >>> FULL TURBO

✔ Preparing lint-staged...
✔ Running tasks for staged files...
✔ Applying modifications from tasks...
✔ Cleaning up temporary files...
[main f2b53dd] test: 测试husky
 16 files changed, 51 insertions(+), 6 deletions(-)
 create mode 100755 .husky/pre-commit
 mode change 100644 => 100755 apps/server/dist/src/index.d.ts
 mode change 100644 => 100755 apps/server/dist/src/index.d.ts.map
 mode change 100644 => 100755 apps/server/dist/src/index.js
 mode change 100644 => 100755 apps/server/dist/src/index.js.map
 mode change 100644 => 100755 apps/server/dist/src/lib/BoyInterface.d.ts
 mode change 100644 => 100755 apps/server/dist/src/lib/BoyInterface.d.ts.map
 mode change 100644 => 100755 apps/server/dist/src/lib/BoyInterface.js
 mode change 100644 => 100755 apps/server/dist/src/lib/BoyInterface.js.map
 mode change 100644 => 100755 apps/server/dist/tsconfig.tsbuildinfo
```