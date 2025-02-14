function squareRoot(value) {
    return Math.sqrt(value);
    
    

}

function square (value ) {
    return value * value;
    


}

function distance (x_2, x_1, y_2, y_1) {
    let x = x_2 - x_1
    let y = y_2 - y_1
    return squareRoot(square(x) + square(y));


}


module.exports = { square, squareRoot, distance };