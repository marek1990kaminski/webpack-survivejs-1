import "../css/main.scss";
import component from "./component";

document.body.appendChild(component());

const $el = document.getElementById('randomInt');

$el.addEventListener('click', function(){window.alert("a!")});

console.log('hello form index.js');