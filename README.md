# Goodreads UI

Self-hosted UI replacement for [Goodreads](https://www.goodreads.com).

## Goodreads API

You will need to get a Goodreads API Key [here](https://www.goodreads.com/api/keys).

## Config

Create a `config.json` file at the root of the project.

```
{
  "goodreads": {
    "key": "[APP KEY]",
    "secret": "[APP SECRET]"
  },
  "sessionSecret": "[SOME SECRET]",
  "mongo": {
    "development": "mongodb://localhost/goodreads-ui",
    "test": "mongodb://localhost/goodreads-ui-test"
  }
}
```

## Start up 

```
$ npm install
$ npm start
```

## Tests

```
$ npm test
$ npm run coverage
```

## TO DO

- [ ] Sync goodreads shelves and reviews
- [ ] View shelves
- [ ] View book
- [ ] View review

- [ ] Use mongo session store [here](https://www.npmjs.com/package/connect-mongodb-session)
- [ ] Sync status updates with goodreads (right now there's no way to read a user's updates without the specific id?)

- [ ] Allow user to read book multiple times
- [ ] Allow user to have different to-read lists based on what is reserved at the library or downloaded

- [ ] Integrate with [Overdrive API](https://developer.overdrive.com/docs/getting-started) to find what's available at library

## Sources

- [StackOverflow Node OAuth](http://stackoverflow.com/questions/12873463/how-to-send-the-oauth-request-in-node)