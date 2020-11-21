var d = new Date();
var x = d.toString();
var temp = x.split(" ", 5);
d = temp.join(" ");
$(document).ready(function() {
    $("#time").html(d);
});

const dom = {
    celcius: document.querySelector('.temp'),
    fahrenheit: document.querySelector('[data-fahrenheit]')
};

const celciusToFahren = (celcius) => ((celsius * 9) / 5 + 32).toFixed(2);
console.log(celciusToFahren(dom.celcius));