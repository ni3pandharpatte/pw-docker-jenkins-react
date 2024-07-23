FROM mcr.microsoft.com/playwright:v1.45.1-focal

WORKDIR /app

EXPOSE 3000

COPY . /app

RUN cd /app

RUN npm install

CMD ["npm", "start"]