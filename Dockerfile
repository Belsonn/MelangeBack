FROM node:12 AS ui-build
WORKDIR /usr/src/app
COPY Front/ ./Front/
RUN cd Front && npm install @angular/cli && npm install && npm run build

FROM node:12 AS server-build
WORKDIR /root/
COPY . .
RUN rm  -r ./Front/
COPY --from=ui-build /usr/src/app/Front/dist/ ./Front/dist
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]


