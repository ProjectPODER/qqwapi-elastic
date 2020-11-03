FROM mhart/alpine-node:10
MAINTAINER Martín Szyszlican <martin@rindecuentas.org>

ENV PORT=${PORT:-8080}
ENV NODE_ENV=production

RUN apk --no-cache add tini git \
  && addgroup -S node \
  && adduser -S -G node node

WORKDIR /src

COPY package.json .

COPY . .

RUN chown -R node:node /src

EXPOSE $PORT

USER node
RUN npm install

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["npm", "start"]
