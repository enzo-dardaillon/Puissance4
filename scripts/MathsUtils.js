//MATHS FUNCTIONS
function round(number, increment, offset) {
    return Math.ceil((number - offset) / increment ) * increment + offset;
}