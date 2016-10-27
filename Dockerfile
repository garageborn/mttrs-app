FROM node:6.3.1-slim

# install dependencies
RUN apt-get update -qq && apt-get install --fix-missing -y \
  build-essential \
  git-core \
  locales

# setup locale
run echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen && dpkg-reconfigure --frontend=noninteractive locales
RUN locale-gen en_US.UTF-8
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# build mttrs-frontend
ENV MTTRS_FRONTEND /mttrs-frontend
RUN mkdir $MTTRS_FRONTEND
COPY . $MTTRS_FRONTEND
WORKDIR $MTTRS_FRONTEND

RUN npm install -g yarn
RUN npm install --production
