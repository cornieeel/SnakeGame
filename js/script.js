var exampleLine = document.getElementById("exampleLineId");
exampleLine.innerHTML = "This is just an <u>example line</u> of how innerHTML works.";
var first = document.getElementById("firstFieldId");
first.innerHTML = "15";
var second = document.getElementById("firstLineId");
second.innerHTML = second.innerHTML + "18";
var animalArray = [ Cat, Dog, Parrot];
var thired = document.getElementById("secondLineId")
thired.innerHTML = animalArray;

//this is an example of how to write a function
var exampleFunction = document.getElementById("exampleFunction");
exampleFunction.innerHTML = exampleFunction.innerHTML + " " + add_two_numbers(5, 7);

//Write your function declarations below this line
function add_two_numbers(n1, n2) {
    return n1 + n2;
}