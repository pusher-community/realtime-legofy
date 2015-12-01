# Twitter Christmas Legofy

Searches Twitter for christmas terms, and runs each image through [Legofy](https://github.com/Wildhoney/Legofy).

## Running Locally

You'll need some environment variables in a `.env` file:

```
TWITTER_API_KEY=...
TWITTER_API_SECRET=...
TWITTER_ACCESS_TOKEN=...
TWITTER_ACCESS_SECRET=...
PUSHER_APP_ID=...
PUSHER_APP_KEY=...
PUSHER_APP_SECRET=...
```

You can create a new Pusher app on [your Pusher dashboard](https://dashboard.pusher.com).

Then install the node dependencies and the jspm ones:

```
npm install
./node_modules/.bin/jspm install
npm start
```

Visit `http://localhost:3002` and await tweets!


