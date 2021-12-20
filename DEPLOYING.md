
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

> THIS DOESN'T WORK.




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
