//  /*
//  Using 'await'

// // has the performance of promises and readability of async

// // Only use await if its asynchronous
// // If you use async fns inside functions initiate function with async...

// // Only use async if you're using async
// // */

//  const fs = require('node:fs/promises')

//  async function main() {
//      await fs.writeFile('bcit.txt', 'hi');
//      const data = await fs.readFile('bcit.txt', 'utf-8'); //await automatically returns content read into data variable
//      console.log(data);

//  }
//  sendEmail();



//  //Changing lab 4 into async await

//  const { EOL } = require("node:os");


//  const readMenu = (file) => fs.readFile(file,'utf-8');
//  const groupMenu = (csv) => {
//      const groupings ={};
//      csv.split(EOL).forEach((row) => {
//          const [type, name, qty, price] = row.split(',');
//         if (!(type in groupings)) {
//             groupings[type] = [{name,qty,price}]
//         } else {
//             groupings[type].push({name,qty,price})
//         }
//     return groupings
//     });
// }
// const prettyMenu = (groupings) => {
//     let prettyStr = '';
//     for (const key in groupings) {
//         const mealItems = groupings[key];
//         prettyStr += `${key} items`;
//         prettyStr += EOL;
//         mealItems.forEach(meal => {
//             prettyStr += `${meal.price} ${meal.name} ${meal.qty}`;
//         })
//         prettyStr += EOL;
//     }
//     return prettyStr
// };
// const writeMenu = (prettyMenu) => fs.writeFile('menu.txt', prettyMenu)


// // //replaces .then making it readable
// // //use try catch for error handling
// // //function must be a promise in order for await to work 
// async function main () {
//     try {
//         const csv = await readMenu('menu.csv')
//         const groupings = groupMenu(csv);
//         const prettyMenu = prettyMenu(groupings);
//         await writeMenu(prettyMenu);
//         console.log('Program finished')
//     } catch (error) {
//         console.log(error);
//     }
// }

// /*
// New content: Streams
// */

// const process = require('node:process');
const {Transform} = require('node:stream');
// const rs = fs.createReadStream('menu.txt');

// const ts = new Transform({
//     transform: (chunk, enc, callback) => {
//         const uppercased = chunk.toString().toUpperCase();
//         callback(null, uppercased);
//     }
// });
// const ws = process.stdout;
// rs.pipe(ts).pipe(ws);

//LAB Q3
//csvtojson converts csv rows to JSON objects, but in our case for some reason it outputs stringified JSON objects
//But to force it to return JSON objects, we do .pipe(csv({ output: "json" })) // Forces it to output JavaScript objects
// then we can initialize object: true,
const { createReadStream } = require('fs');
const csv = require("csvtojson");
const zlib= require('node:zlib');


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