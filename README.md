This is meeting-history-app, is build under one of the top-line web frameworks, nextjs, that is accompanied of tailwindcss as css library, matine as css component framework, react-hook-form as form handling and validation library, and react query as library to manage the incoming fetching. 

It has authentication flow integrated, token session via cookies with js-cookie, login and sign up flow and api fetching with axios.

## Installation

First, you need to have the `meeting-history-api` running, then you need to set up the .env file, in order to make it, you just have to create a `.env.local` file at the project's root that contains the following:

```bas
NEXT_PUBLIC_API_URL=http://localhost:3250
```
it indicates where the app is going to aim to get the api

Once it is done, install the dependencies: 

```bash
npm install
#or
yarn
```

After execute the following to run the development server:

```bash
npm run dev
# or
yarn dev
```

By default it takes the port 3000 to set up the development server so you can open it with your browser: [http://localhost:3000](http://localhost:3000) to see the result.


## Getting Started

If you already have and account you can sign in, if not, you will have to create one, just click on sign up, fill the fields and click on the `sign up` button. You are going to receive a new email with a confirmation code, it is going to be a must to active your account, you just need to introduce this confirmation code in the app, once you do that, you will be able to sign in.

There is a default account i have created to you in case you do not want to do the auth flow. the email is `brandonprogamer02@gmail.com` and the password is `admin`.

The app get the commit history of the `meeting-history-api` repo by default however you can fetch another repo you want by editing the `Username` and `Repository name` fields and clicking in search. More over you can sign out to finish testing the entire auth flow.
