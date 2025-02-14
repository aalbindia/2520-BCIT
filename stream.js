const { createReadStream } = require('fs');
const csv = require("csvtojson");
const zlib= require('node:zlib');
const { Transform } = require('node:stream')

function filterByCountry(country) {
    return new Transform({
        transform: (chunk, enc, callback) => {
            const obj = JSON.parse(chunk.toString());
            if (obj.country.trim().toLowerCase() === country.toLowerCase()) {
                callback(null, chunk);
            } else {
                callback();
            }
            
        }
    });
}

function sumProfit() {
    let totalProfit = 0
    return new Transform({
        transform: (chunk, enc,callback) => {
            const obj = JSON.parse(chunk.toString());//BIGGEST ISSUE, need to parse JSON strings
            const profit = parseFloat(obj.profit);
            totalProfit += profit;
            callback();
        }, //comma separate the different methods of the object
        flush: (callback) => { //flush is invoked at the end after processing all chunks and in our case it outputs the profit
            const formatted =  `$${totalProfit.toLocaleString('en-us')}`;
            callback(null, `Profit Italy: $${formatted}`);
            
        }
    });
}

createReadStream('data.csv.gz') 
  .pipe(zlib.createGunzip())
  .pipe(csv())                       
  .pipe(filterByCountry('Italy'))
  .pipe(sumProfit())                     
  .pipe(process.stdout)