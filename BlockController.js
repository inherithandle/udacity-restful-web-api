const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        let self = this;
        this.app.get("/api/block/:index", (req, res) => {
            let data = {};
            if (req.params.index < 0 || req.params.index >= self.blocks.length) {
                console.log('error');
                data['error'] = 'index out of bound';
            } else {
                data = self.blocks[req.params.index];
            }
            res.status(200).send(data);

        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        // curl -d '{"hash":"49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3","height":0,"body":"First block in the chain - Genesis block","time":"1530311457","previousBlockHash":""}'  -H "Content-Type: application/json" -X POST http://localhost:8000/api/block
        let self = this;
        this.app.post("/api/block", (req, res) => {
            let newBlock = new BlockClass.Block(req.body.body);
            newBlock.hash = req.body.hash;
            newBlock.height = self.blocks.length;
            newBlock.previousBlockHash = this.blocks[this.blocks.length - 1].hash;
            newBlock.time = new Date().getTime().toString().slice(0,-3);
            self.blocks.push(newBlock);

            res.status(200).send(newBlock);
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                blockAux.time = new Date().getTime().toString().slice(0,-3);
                if (index != 0) {
                    blockAux.previousBlockHash = this.blocks[index -1].hash;
                }
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}