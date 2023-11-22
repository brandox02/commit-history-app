This is meeting-history-app, is build under one of the top-line web frameworks, nextjs, that is accompanied of tailwindcss as css library, matine as css component framework, react-hook-form as form handling and validation library, and react query as library to manage the incoming fetching. 

## Getting Started

First, you need to have the `meeting-history-api` running, then you need to set up the .env.local file, in order to make it, you just have to create a `.env.local` file at the project's root that contains the following:

```bas
NEXT_PUBLIC_API_URL=http://localhost:3250
```
it indicates where the app is going to aim to get the api

Once it is done, you are ready to start the project using docker, you just need to run the followings at the project's root

```bash
docker build -t commit-history-app .
```

```bash
docker-compose up
```


By default it takes the port 3000 to set up the development server so you can open it with your browser: [http://localhost:3000](http://localhost:3000) to see the result.

The app get the commit history of the `meeting-history-api` repo by default however you can fetch another repo you want by editing the `Username` and `Repository name` fields and clicking in search.
