const process = require("node:process")

function sayHiToFruit(fruitName) {
    console.log("I am eating an " + fruitName);
}

for (const fruit of process.argv.slice(2)) {
    sayHiToFruit(fruit);
}

//Week 2
function add(num1, num2) {
    return num1 + num2;
}

function addTwo(num1, addReference) { //considered a higher-ordered function (a fn that takes one of its param a fn.)
    return addReference(num1, 2)//then we call the add function to add 2 to our num
}
console.log(addTwo(7,add)); //addReference is pointing to the function add


console.log(add(5,4));

const refOne = add;
refOne(5,2);
const refTwo = add;
refTwo(6,3);
//indirectly invoke the add function



const color = ["blue", "red"]
function callback(value) {
    console.log(value, index);

}
colors.forEach(callback); //blue red output and its indices

const colors = ["red", "blue"];
function callback (value, index) {
    console.log(value, index);
    //callback is where you actually print the index
}
function forEach(list, cb) {
    //do not print here, loop in hre
    for (let i = 0; i < list.length; i++) {
        const value = list[i];
        cb(value, i); //callsback to the function callback! because cb is referencing the callback fn, and so whenever we call cb is prints the value

    }

}

forEach(colors,callback );

//How do we make it so that we can only use the callback within the one function (prevent smo else from calling it)

//Making this fn anonymous and dropping it inside of the argument
//You can simply drop in its value in this case the function and it will work
// function (value, index) {
//     console.log(value, index);
//     //callback is where you actually print the index
// }


function forEach(list, cb) {
    //do not print here, loop in hre
    for (let i = 0; i < list.length; i++) {
        const value = list[i];
        cb(value, i); //callsback to the function callback! because cb is referencing the callback fn, and so whenever we call cb is prints the value
    }
}
forEach(["red", "blue"],function (value, index) {
    console.log(value, index);
    //callback is where you actually print the index
} );


//Make this more simply using arrow functions

//Function Declaration
//Has a feature: Hoisting, meaning you can call a function before it was declared. HOISTING ✅
function addTwo(n) {
    return n + 2;
}
//Function expression: No Hoisting, cannot call function before you declare it. HOISTING ❌
const addTwo = function (n) {
    return n + 2;
}

//Arrow  Function Expression: Dont support hoisting, dont need return and brackets if only one line. HOISTING ❌
const addTwo = (n) => {
    return n+ 2;
}

["red", "blue"].forEach(function (value, index) {
    console.log(value, index);
    //callback is where you actually print the index
}) ;


//Easier way to do it 
["red", "blue"].forEach( (value, index) => { 
    console.log(value, index);
    //callback is where you actually print the index
}) ;


 /*
 Create a function called multiplier
 - num 1
 - num 2
 - callback
    - err (if inputs are not numbers)
    - result
 */

function callback (err, result) {
    for (let i in err) {
        if (typeof(i) != 'number') {
            Number(i)
        }
        console.log(num1 * num2);
    }

};
function multiplier(num1, num2, callback) {
    Inputs = [num1, num2];
    result = Math.round(num1 * num2);
    callback(Inputs, result)
    


}

console.log(multiplier(1,2, callback))





function multiplier(num1,num2,callback) {
    if (typeof num1 != "number" || typeof num2 != "number") {
        callback(new Error("Invalid Inputs")); //err in callback fn is this message
    } else {
        callback(null, parseInt(num1) * parseInt(num2)); //have to input null for first argument
    }
}

multiplier(2.1,2,(err,result) => {
    if (err){
    console.log(err);
    }else{
        console.log(result)
    }
   
   
});


const fs = require("node:fs")
//Considered an Asynchronous fn (RUNS IN THE BACKGROUND)
const data = fs.readFile("bigFile.txt", "utf8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }

});//reads file, utf8 a special encoding which represents any language
console.log("Sending email");

//Once node recognizes your using a special function (Asynchronous) it well tell your OS to perform the task (read the big file) but it will move on to the next available line
//Thats why sending email outputs first, then once the file is read, it will output

