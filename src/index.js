const app = require('./app');
let server;
server = app.listen(3000, () => {
    console.log(`Listening to port 3000`);
});
