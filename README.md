# A RESTful server in Node js

A RESTful server that allows us to read and write blocks in a private blockchain

## Steps to deploy a server.

1. package.json is all set. Just run `node app.js`

## How to get a block

```
http://localhost:8000/api/block/${index}
http://localhost:8000/api/block/0
```

## How to write a block to blockchain.
```
curl -d '{"hash":"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3","height":0,"body":"a new block","previousBlockHash":""}'  -H "Content-Type: application/json" -X POST http://localhost:8000/api/block
```
