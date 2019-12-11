# Digital Outrage Project

## developing

### back-end

1. set up local postgres db with user: `test`, password: `test`, and database: `test`
2. run once: `npm i`
3. run once: `npm run migration:run`
4. run once: `npm run seed:run`
5. `npm run dev` will start the server at `http://localhost:3001`
6. any changes to server code will cause an automatic server restart
7. when developing locally, there is no need to build the front-end and navigate to `http://localhost:3001` in the browser - the front-end dev server will proxy api requests there

#### database schema edits

#### tweets data

### front-end

1. navigate to `src/client` on the command line
2. run once: `npm i`
3. `npm run start` will start the front-end dev server at `http://localhost:3000`
4. any changes to client code will cause hot reloading
5. start the server (see above) to make sure api requests are successful

To reiterate: the intended development flow is to get the server running, then to start the front-end dev server in `src/client` and to navigate to `http://localhost:3000` - then all changes in the client folder will automatically update the browser, and all changes to the server
will restart the server. Happy hacking!










<hr>

## deploying

### deploying the back-end

Create a new heroku server for the backend API (i.e. "twitter-outrage-classification"). Provision a new postgresql database on that server, and note its `DATABASE_URL`.

Configure a remote address corresponding to the API server:

```sh
git remote add heroku-api https://git.heroku.com/twitter-outrage-classification.git
```

Check that the database has been configured properly:

```sh
heroku config -a twitter-outrage-classification
```

Push / deploy the codebase to the API server, as necessary:

```sh
git push heroku-api master
```

> NOTE, this will also run the "build" script, including database migrations and seeding the database with tweets (see the "package.json" file)

Start a worker process (a.k.a. "dyno") to run the api server. See the "Procfile".

Checking logs:

```sh
heroku logs --tail -a twitter-outrage-classification
```

### deploying the front-end

Create a new heroku server for the front-end client app (i.e. "moral-outrage").

Configure a remote address corresponding to the API server:

```sh
git remote add heroku-app https://git.heroku.com/moral-outrage.git
```

Configure the production app to use the production API server:

```sh
heroku config:set HOST="https://twitter-outrage-classification.herokuapp.com" -a moral-outrage
```

We want to deploy only what's in the "src/client" directory to that server, so we need to [use "subtree" in our deployment command](https://stackoverflow.com/questions/7539382/how-can-i-deploy-push-only-a-subdirectory-of-my-git-repo-to-heroku). Push / deploy the client app codebase to the app server, as necessary:

```sh
git subtree push --prefix src/client heroku-app master
```

> NOTE, this will also run the "build" script (see the "src/client/package.json" file)

Start a worker process (a.k.a. "dyno") to run the app server. See the "Procfile".

Checking logs:

```sh
heroku logs --tail -a moral-outrage
```

## api
