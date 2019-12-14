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

```sh
DATABASE_URL="postgresql://outrager:rage@localhost:5432/outrage_development" npm run dev
```

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

## [Deploying](DEPLOYING.md)
