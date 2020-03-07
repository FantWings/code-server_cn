FROM debian

# install essential
COPY ./config/sources.list /etc/apt/sources.list
RUN apt-get update && apt-get install -y \
	software-properties-common build-essential \
	bsdtar curl sudo wget git vim \
	python3 python3-pip \
	openjdk-11-jdk && \
	apt-get clean &&\
	rm -rf /var/lib/apt/lists/*

# install node
#RUN curl -sL https://deb.nodesource.com/setup_12.x |  bash - &&\
COPY ./config/sources.list /etc/apt/sources.list
RUN	apt-get update && \
	apt-get install -y nodejs &&\
	apt-get clean &&\
	rm -rf /var/lib/apt/lists/*

# We cannot use update-locale because docker will not use the env variables
# configured in /etc/default/locale so we need to set it manually.
#ENV LC_ALL=en_US.UTF-8 \
#	SHELL=/bin/bash

#Add User Coder
RUN adduser --gecos '' --disabled-password coder && \
	echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

#Switch to Coder User
USER coder
WORKDIR /home/coder	

#Make USER Home Dir
RUN mkdir -p /home/coder/.local/share/code-server/User

# install VSCode Files
RUN sudo mkdir /app
COPY . /app
RUN sudo ln -s /app/code-server /usr/local/bin/code-server

# Setup User Visual Studio Code Extentions
ENV HOME_DIR "/home/coder"
ENV CODE_SERVER_HOME "${HOME_DIR}/.local/share/code-server"

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
	code-server --install-extension dongli.python-preview

#RUN code-server --install-extension /app/extensions/ms-ceintl.vscode-language-pack-zh-hans-1.42.0.vsix &&\
#	code-server --install-extension /app/extensions/auchenberg.vscode-browser-preview-0.5.9.vsix

# setup local language
#COPY ./config/locale.json ${CODE_SERVER_HOME}/User/locale.json
COPY ./config/settings.json ${CODE_SERVER_HOME}/User/settings.json

#Set Data Volume
VOLUME [ "/home/coder" ]

ENTRYPOINT ["code-server", "--host", "0.0.0.0"]
