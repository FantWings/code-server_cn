# Contributing

## Development Workflow

- [VS Code prerequisites](https://github.com/Microsoft/vscode/wiki/How-to-Contribute#prerequisites)

```shell
yarn
yarn vscode
yarn watch # Visit http://localhost:8080 once completed.
```

Any changes made to the source will be live reloaded.

If changes are made to the patch and you've built previously you must manually
reset VS Code then run `yarn vscode:patch`.

Some docs are available at [../src/node/app](../src/node/app) on how code-server
works internally.

## Build

- [VS Code prerequisites](https://github.com/Microsoft/vscode/wiki/How-to-Contribute#prerequisites)

```shell
yarn
yarn vscode
yarn build
node ./build/out/node/entry.js # Run the built JavaScript with Node.
```
