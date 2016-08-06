FROM node:6.3.1-slim

# build mttrs-frontend
ENV MTTRS_FRONTEND /mttrs-frontend
RUN mkdir $MTTRS_FRONTEND
COPY . $MTTRS_FRONTEND
WORKDIR $MTTRS_FRONTEND

RUN npm install --production --silent --no-progress
