const title = document.querySelector('h1');

console.log(title);

title.textContent = 'Web Page Components'

let topics = document.querySelector('#topics');

document.getElementById("topics").style.color = 'purple'


let list = document.querySelector('.list');

list.style.border = '3px solid black';

let para = document.querySelector('p');

//para.style.backgroundColor = 'lightblue';

para.classList.add('background');

const image = document.querySelector('img');



let selectElem = document.getElementById('webdevlist');
selectElem.addEventListener('change', function(){
    let codeValue = selectElem.value;
    console.log(codeValue);
})
                