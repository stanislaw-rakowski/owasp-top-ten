FROM node

WORKDIR /app

COPY package*.json .
RUN npm install

COPY tsconfig.json .
COPY *.d.ts .
COPY src ./src
RUN npm run build

CMD npm start