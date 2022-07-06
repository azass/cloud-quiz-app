FROM node:current-alpine3.16 AS builder

WORKDIR /usr/local/app

COPY . .

RUN yarn --frozen-lockfile && yarn build

FROM nginx:1.20-alpine

COPY --from=builder /usr/local/app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
