// Missing "use strict"

// Undeclared variable
function badFunction() {
    x = 10;  // Should be var/let/const x = 10
    return x;
}

// Assignment in condition
function checkUser() {
    if (user = getUser()) {  // Should be === or ==
        console.log("User found");
    }
}

// Unused variable
var unusedVar = 42;

// Function with duplicate parameters (in non-strict mode)
function duplicate(a, b, a) {
    return a + b;
}

// Using == instead of ===
function comparison(value) {
    if (value == "5") {  // Should be ===
        return true;
    }
    return false;
}

// Unreachable code
function unreachable() {
    return true;
    console.log("This never runs");  // Unreachable
}

// Variable declared but never used
function wasteMemory() {
    var neverUsed = "I'm lonely";
    console.log("Function runs");
}

// Using eval (dangerous)
function dangerous() {
    var code = "alert('Hello')";
    eval(code);
}

// Missing semicolons
var a = 1
var b = 2

// Old-style function when arrow function preferred
var add = function(x, y) {
    return x + y;
};

// String concatenation instead of template literals
function greet(name) {
    return "Hello " + name + "!";
}

// Console.log left in code (should be removed for production)
console.log("Debug message");
