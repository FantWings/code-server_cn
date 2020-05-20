FROM codercom/code-server

# Set Locale Files
RUN sudo locale-gen zh_CN.UTF-8 && \
	sudo locale-gen en_US.UTF-8 && \
	sudo localedef -i zh_CN -f UTF-8 zh_CN.UTF-8

# Set USER Config
ENV HOME_DIR "/home/coder"
ENV CODE_SERVER_HOME "${HOME_DIR}/.local/share/code-server"
ENV PATH "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/home/coder/.local/bin"
ENV LANG "zh_CN.UTF-8"
ENV SHELL "/bin/zsh"

# Setup System
	#TimeZone
RUN sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
	#Local VSCode language
	mkdir -p /home/coder/.local/share/code-server/User && \
	curl -o ${CODE_SERVER_HOME}/User/locale.json https://gitlab.furry.top/FuzzyPaws/tools/code-server_cn/-/raw/master/config/locale.json && \
	#Basic VSCode Settings
	curl -o ${CODE_SERVER_HOME}/User/settings.json https://gitlab.furry.top/FuzzyPaws/tools/code-server_cn/-/raw/master/config/settings.json && \
	#APT Source
	sudo curl -o /etc/apt/source.list https://gitlab.furry.top/FuzzyPaws/tools/code-server_cn/-/raw/master/config/sources.list && \
	# Init ZSH
	git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh && \
	curl -o ~/.zshrc https://gitlab.furry.top/FuzzyPaws/tools/code-server_cn/-/raw/master/config/zshrc

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
	code-server --install-extension akamud.vscode-theme-onedark && \
	code-server --install-extension waderyan.gitblame && \
	code-server --install-extension CoenraadS.bracket-pair-colorizer-2 \
	code-server --install-extension vscode-icons-team.vscode-icons