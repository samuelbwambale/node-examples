module.exports = (x,y,callback) => {
    if (x <= 0 || y <= 0)
        setTimeout(() => 
            callback(new Error("Rectangle dimensions should be greater than zero: l = "
                + x + ", and b = " + y), 
            null),  // second parameter of callback function is null since first parameter in an error, 
                    //no need to proceed further
            10000);
    else
        setTimeout(() => 
            callback(null, { // first parameter of callback function is null since no error
                perimeter: () => (2*(x+y)),
                area:() => (x*y)
            }), 
            10000);
}
