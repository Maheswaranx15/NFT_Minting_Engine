const express = require('express');
const cors = require('cors');
const Queue = require('bull');
const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());

const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const serverAdapter = new ExpressAdapter();
const someQueue = new Queue('minting');
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [
    new BullAdapter(someQueue),
  ],
  serverAdapter:serverAdapter
});

serverAdapter.setBasePath('/admin/queues')
app.use('/admin/queues', serverAdapter.getRouter());

app.get('/', function (req, res) {
        res.send({status: 'OK'})
});
module.exports = app;
