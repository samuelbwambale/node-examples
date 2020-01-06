const rect = (x,y,callback) => {
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

function solveRect(l,b) {
    console.log("Solving for rectangle with l = "
                + l + " and b = " + b);
    rect(l,b, (err,rectangle) => {
        if (err) {
	        console.log("ERROR: ", err.message);
	    }
        else {
            console.log("The area of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.area());
            console.log("The perimeter of the rectangle of dimensions l = "
                + l + " and b = " + b + " is " + rectangle.perimeter());
        }
    });
    // this will be executed without waiting for rect() function
    console.log("This statement after the call to rect()");
};

solveRect(2,4);
solveRect(3,5);
solveRect(0,5);
solveRect(-3,5);
