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

Make sure you have MongoDB installed and running.

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

- [ ] Get rid of DAOs and move things to models
- [ ] Lock down pages to logged in users, use Passport
- [ ] Fix books with missing images and numPages (possible to do this programatically?)
- [ ] Edit book
- [ ] View author and series
- [ ] Pie chart of books ratings on book detail
- [ ] Sorting on reviews page
- [ ] Figure out how to pull in user updates possibly using user's rss feed 
- [ ] Sync status updates with goodreads (read statuses)
- [ ] Figure out how to proxy images


- [ ] Use mongo session store [here](https://www.npmjs.com/package/connect-mongodb-session)


- [ ] Allow user to read book multiple times
- [ ] Allow user to have different to-read lists based on what is reserved at the library or downloaded or not released


- [ ] Integrate with [Overdrive API](https://developer.overdrive.com/docs/getting-started) to find what's available at library

## Sources

- [StackOverflow Node OAuth](http://stackoverflow.com/questions/12873463/how-to-send-the-oauth-request-in-node)