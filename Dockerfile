FROM debian

# install essential
COPY ./config/sources.list /etc/apt/sources.list
RUN apt-get update && apt-get install -y \
	software-properties-common build-essential \
	bsdtar curl sudo wget git vim locales\
	python3 python3-pip \
	openjdk-11-jdk \
	nodejs && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

#Add User Coder
RUN adduser --gecos '' --disabled-password coder && \
	echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

#Switch to Coder User
USER coder
WORKDIR /home/coder	

# Set Locale
RUN sudo locale-gen zh_CN.UTF-8 && \
	sudo locale-gen en_US.UTF-8 && \
	sudo localedef -i en_US -f UTF-8 en_US.UTF-8
ENV SHELL=/bin/bash

#Make USER Home Dir
ENV HOME_DIR "/home/coder"
ENV CODE_SERVER_HOME "${HOME_DIR}/.local/share/code-server"
RUN mkdir -p /home/coder/.local/share/code-server/User

# Install VSCode Files
RUN sudo mkdir /app
COPY . /app
RUN sudo ln -s /app/code-server /usr/local/bin/code-server

RUN sudo apt update && \
	sudo apt install /app/extensions/google-chrome-stable_current_amd64.deb -y && \
	sudo apt-get clean && \
	sudo rm -rf /var/lib/apt/lists/*

# Setup User Visual Studio Code Extentions From Internet
RUN code-server --install-extension ms-python.python && \
	code-server --install-extension redhat.java && \
	code-server --install-extension ms-vscode.Go && \
	code-server --install-extension vscjava.vscode-java-debug && \
	code-server --install-extension ritwickdey.LiveServer && \
	code-server --install-extension HookyQR.beautify && \
	code-server --install-extension vscode-icons-team.vscode-icons && \
	code-server --install-extension oderwat.indent-rainbow && \
	code-server --install-extension streetsidesoftware.code-spell-checker && \
	code-server --install-extension akamud.vscode-theme-onedark && \
	code-server --install-extension waderyan.gitblame && \
	code-server --install-extension CoenraadS.bracket-pair-colorizer-2 && \
	code-server --install-extension dongli.python-preview

# Setup User Visual Studio Code Extentions From Localy
RUN code-server --install-extension /app/extensions/MS-CEINTL.vscode-language-pack-zh-hans-1.41.1.vsix && \
	code-server --install-extension /app/extensions/auchenberg.vscode-browser-preview-0.5.9.vsix

# setup local language
RUN cp /app/config/locale.json ${CODE_SERVER_HOME}/User/locale.json && \
	cp /app/config/settings.json ${CODE_SERVER_HOME}/User/settings.json

#Set DataVolume incase they lose ther shit.
VOLUME [ "/home/coder" ]

ENTRYPOINT ["code-server", "--host", "0.0.0.0"]
