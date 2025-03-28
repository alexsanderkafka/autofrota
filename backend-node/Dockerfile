FROM node:20.15.1
COPY package.json package-lock.json ./
COPY tsconfig.json ./
COPY .env ./
RUN npm install
COPY src ./src
CMD ["npm", "run", "dev"]