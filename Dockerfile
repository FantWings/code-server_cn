FROM codercom/code-server

# 官方已开放Home目录，不再使用
# install essential
# COPY ./config/sources.list /etc/apt/sources.list
# RUN apt-get update && apt-get install -y \
# 	software-properties-common build-essential \
# 	bsdtar curl sudo wget git vim locales zsh \
# 	python3 python3-pip \
# 	nodejs && \
# 	apt-get clean && \
# 	rm -rf /var/lib/apt/lists/*

# 已直接采用官方母盘，不再使用
# Add User Coder
# RUN adduser --gecos '' --disabled-password coder && \
# 	echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# 已直接采用官方母盘，不再使用
# Switch to Coder User
# USER coder
# WORKDIR /home/coder	

# Set Locale
RUN sudo locale-gen zh_CN.UTF-8 && \
	sudo locale-gen en_US.UTF-8 && \
	sudo localedef -i zh_CN -f UTF-8 zh_CN.UTF-8


# Set USER Config
ENV HOME_DIR "/home/coder"
ENV CODE_SERVER_HOME "${HOME_DIR}/.local/share/code-server"
ENV PATH "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ENV LANG "zh_CN.UTF-8"

# Init ZSH
ENV SHELL "/bin/zsh"
RUN git clone https://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh && curl -o  ~/.zshrc https://gitlab.furry.top/FuzzyPaws/tools/code-server_cn/-/raw/master/config/zshrc

# 已直接采用官方母盘，不再使用
# Install VSCode Files
# RUN sudo mkdir /app
# COPY . /app

# Create Soft Link && Setup local language && Setup TimeZone
RUN sudo ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
	mkdir -p /home/coder/.local/share/code-server/User && \
	curl -o /app/config/locale.json ${CODE_SERVER_HOME}/User/locale.json https://gitlab.furry.top/FuzzyPaws/tools/code-server_cn/-/raw/master/config/locale.json

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
	
# 已直接采用官方母盘，不再使用
# Set DataVolume incase they lose ther shit.
# VOLUME [ "/home/coder" ]

# ENTRYPOINT ["code-server", "--host", "0.0.0.0"]
