# Christmas Legofy with Pusher and 500px

Searches the 500px API for for christmas pictures, and runs each image through [Legofy](https://github.com/Wildhoney/Legofy). [See it running on Heroku](http://realtime-lego.herokuapp.com/).

## Running Locally

You'll need some environment variables in a `.env` file:

```
FIVE_HUNDRED_PX_KEY=...
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

Finally, update `app/main.js` with your Pusher app key.

Visit `http://localhost:3002` and await pictures!


