FROM codercom/code-server

RUN sudo curl -o /etc/apt/sources.list https://raw.githubusercontent.com/FantWings/code-server_cn/master/config/sources.list && \
	sudo apt-get update && sudo apt-get install -y \
	software-properties-common build-essential \
    apt-transport-https ca-certificates gnupg-agent \
	bsdtar curl sudo wget git vim locales zsh \
	python3 python3-pip \
	nodejs && \
	sudo apt-get clean && \
	sudo rm -rf /var/lib/apt/lists/*

# Set Locale Files
RUN sudo locale-gen zh_CN.UTF-8 && \
	sudo locale-gen en_US.UTF-8 && \
	sudo localedef -i zh_CN -f UTF-8 zh_CN.UTF-8

# Set USER Config
ENV HOME_DIR "/home/coder"
ENV CODE_SERVER_HOME "${HOME_DIR}/.local/share/code-server"
ENV LANG "zh_CN.UTF-8"
ENV SHELL "/bin/zsh"
ENV PATH "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/coder/.local/bin"
ENV LIBRARY_PATH "/home/coder/.local/lib:$LIBRARY_PATH"
ENV LD_LIBRARY_PATH "/home/coder/.local/lib:$LD_LIBRARY_PATH"

# Setup System
	# Set China TimeZone
RUN sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
	# Local VSCode language
	mkdir -p /home/coder/.local/share/code-server/User && \
	curl -o ${CODE_SERVER_HOME}/User/locale.json https://raw.githubusercontent.com/FantWings/code-server_cn/master/config/locale.json && \
	# Basic VSCode Settings
	curl -o ${CODE_SERVER_HOME}/User/settings.json https://raw.githubusercontent.com/FantWings/code-server_cn/master/config/settings.json && \
	# Init ZSH
	git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh && \
	curl -o ~/.zshrc https://raw.githubusercontent.com/FantWings/code-server_cn/master/config/zshrc

# Setup User Visual Studio Code Extentions From Internet
RUN code-server --install-extension donjayamanne.python-extension-pack && \
	code-server --install-extension redhat.java && \
	code-server --install-extension ms-vscode.Go && \
	code-server --install-extension vscjava.vscode-java-debug && \
	code-server --install-extension ritwickdey.LiveServer && \
	code-server --install-extension HookyQR.beautify && \
	code-server --install-extension ms-ceintl.vscode-language-pack-zh-hans && \
	code-server --install-extension oderwat.indent-rainbow && \
	code-server --install-extension streetsidesoftware.code-spell-checker && \
	code-server --install-extension jsjlewis96.one-dark-pro-italic-vivid && \
	code-server --install-extension waderyan.gitblame && \
	code-server --install-extension coenraads.bracket-pair-colorizer \
	code-server --install-extension vscode-icons-team.vscode-icons
