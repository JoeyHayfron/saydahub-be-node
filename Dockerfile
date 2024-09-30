# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.13.0


FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app
EXPOSE 3000

RUN yarn policies set-version 1.22.22

FROM base as dev

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile
USER node
COPY . .
CMD yarn start-dev

FROM  base as prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    yarn install --frozen-lockfile
USER node
COPY . .
CMD yarn start-prod
