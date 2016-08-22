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

- Get user info (user.show)
- Get a user's shelves (shelves.list)
- Get the books on a members shelf (reviews.list)

## Sources

- [StackOverflow Node OAuth](http://stackoverflow.com/questions/12873463/how-to-send-the-oauth-request-in-node)