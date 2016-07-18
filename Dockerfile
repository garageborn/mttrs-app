FROM node:6.3.1-slim

# install dependencies
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  git-core \
  postgresql-common \
  libpq-dev \
  nodejs

# build mttrs-frontend
ENV MTTRS_API /mttrs-frontend
RUN mkdir $MTTRS_API
COPY . $MTTRS_API
WORKDIR $MTTRS_API

RUN npm install --production --silent --no-progress
