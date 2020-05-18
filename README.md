# code-server

Run [VS Code](https://github.com/Microsoft/vscode) on any machine anywhere and access it in the browser.

- **Code everywhere:** Code on your Chromebook, tablet, and laptop with a
  consistent dev environment. Develop on a Linux machine and pick up from any
  device with a web browser.
- **Server-powered:** Take advantage of large cloud servers to speed up tests, compilations, downloads, and more.
  Preserve battery life when you're on the go since all intensive tasks runs on your server.
  Make use of a spare computer you have lying around and turn it into a full development environment.

![Example gif](./doc/assets/code-server.gif)

## Getting started

For a full setup and walkthrough, please see [./doc/guide.md](./doc/guide.md).

### Debian, Ubuntu

```bash
curl -sSOL https://github.com/cdr/code-server/releases/download/3.3.0/code-server_3.3.0_amd64.deb
sudo dpkg -i code-server_3.3.0_amd64.deb
systemctl --user enable --now code-server
# Now visit http://127.0.0.1:8080. Your password is in ~/.config/code-server/config.yaml
```

### Fedora, Red Hat, SUSE

```bash
curl -sSOL https://github.com/cdr/code-server/releases/download/3.3.0/code-server-3.3.0-amd64.rpm
sudo yum install -y code-server-3.3.0-amd64.rpm
systemctl --user enable --now code-server
# Now visit http://127.0.0.1:8080. Your password is in ~/.config/code-server/config.yaml
```

### npm

We recommend installing from `npm` if we don't have a precompiled release for your machine's
platform or architecture.

**note:** Installing via `npm` builds native modules on install and so requires C dependencies.
See [./doc/npm.md](./doc/npm.md) for installing these dependencies.

You will need at least node v12 installed. See [#1633](https://github.com/cdr/code-server/issues/1633).

```bash
npm install -g code-server
code-server
# Now visit http://127.0.0.1:8080. Your password is in ~/.config/code-server/config.yaml
```

### macOS

```bash
brew install code-server
brew services start code-server
# Now visit http://127.0.0.1:8080. Your password is in ~/.config/code-server/config.yaml
```

### Docker

```bash
# This will start a code-server container and expose it at http://127.0.0.1:8080.
# It will also mount your current directory into the container as `/home/coder/project`
# and forward your UID/GID so that all file system operations occur as your user outside
# the container.
docker run -it -p 127.0.0.1:8080:8080 \
  -v "$PWD:/home/coder/project" \
  -u "$(id -u):$(id -g)" \
  codercom/code-server:latest
```

### Static releases

We publish self contained `.tar.gz` archives for every release on [github](https://github.com/cdr/code-server/releases).
They bundle the node binary and compiled native modules.

1. Download the latest release archive for your system from [github](https://github.com/cdr/code-server/releases).
2. Unpack the release.
3. You can run code-server by executing `./bin/code-server`.

Add the code-server `bin` directory to your `$PATH` to easily execute `code-server` without the full path every time.

Here is an example script for installing and using a static `code-server` release on Linux:

```bash
curl -sSL https://github.com/cdr/code-server/releases/download/3.3.0/code-server-3.3.0-linux-amd64.tar.gz | sudo tar -C /usr/local -xz
sudo mv /usr/local/code-server-3.3.0-linux-amd64 /usr/local/code-server
PATH="$PATH:/usr/local/code-server/bin"
code-server
# Now visit http://127.0.0.1:8080. Your password is in ~/.config/code-server/config.yaml
```

## FAQ

See [./doc/FAQ.md](./doc/FAQ.md).

## Contributing

See [./doc/CONTRIBUTING.md](./doc/CONTRIBUTING.md).

## Enterprise

Visit [our website](https://coder.com) for more information about our
enterprise offerings.
