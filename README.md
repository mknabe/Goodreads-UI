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
  "sessionSecret": "[SOME SECRET]"
}
```

## TO DO

[ ] Setup mongo db
[ ] Sync goodreads shelves and reviews
[ ] View shelves
[ ] View book
[ ] View review

[ ] Use mongo session store [here](https://www.npmjs.com/package/connect-mongodb-session)
[ ] Allow user to read book multiple times

[ ] Sync status updates with goodreads (right now there's no way to read a user's updates without the specific id?)

## Sources

- [StackOverflow Node OAuth](http://stackoverflow.com/questions/12873463/how-to-send-the-oauth-request-in-node)