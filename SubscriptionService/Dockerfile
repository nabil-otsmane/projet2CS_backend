FROM node:14-alpine as base

WORKDIR /src
COPY package.json /src/
EXPOSE 8000
RUN npm install
COPY . /src


FROM base as production
ENV NODE_ENV=production

CMD ["npm", "run", "start:dev"]

FROM base as development
ENV NODE_ENV=development
CMD ["npm", "run", "start:dev"]
