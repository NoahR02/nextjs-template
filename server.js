require('dotenv').config({});
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express()
  server.get("/example", (req, res) => res.send("This is from express :)"));
  
  // server.get("*") must be after all other routing
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready On Port ${process.env.PORT}`);
  })
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});