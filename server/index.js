import express from 'express'
import path from 'path';

const app = express();


app.use('/', express.static(path.join(__dirname, 'public')));


let addr;
require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
    addr = add
  })

const port = 8080;
///Open Server
app.listen(port, () => {
    console.log('Express is listening on', addr, ":", port);
});

