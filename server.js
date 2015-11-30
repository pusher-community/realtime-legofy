import chokidarEventEmitter from 'chokidar-socket-emitter';
import express from 'express';
import http from 'http';

const app = express();

app.use(express.static('.'));

const server = http.createServer(app);

const port = process.env.PORT || '3002';

server.listen(port);

// for jspm-hot-reloader
if (process.env.NODE_ENV !== 'production') {
  chokidarEventEmitter({ app: server });
}

server.on('listening', () => {
  console.log('Server listening', port);
});
