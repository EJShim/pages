import express from 'express'
import path from 'path'

const app = express();

app.use('/', express.static( path.join(__dirname, '../..', 'client/build')  ));

const port = 8080;

app.listen(port, ()=>{
    console.log("open server on port", port);
})