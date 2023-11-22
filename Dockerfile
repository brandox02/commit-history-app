FROM node

COPY . /home/app

RUN cd /home/app && npm i && npm run build

CMD ["sh", "-c", "cd /home/app && npm start"]