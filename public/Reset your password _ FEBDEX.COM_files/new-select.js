let selectSpanOne = document.getElementById('select__span-one')
let selectSpanTwo = document.getElementById('select__span-two')
let selectSpanThree = document.getElementById('select__span-Three')
let selectSpanFour = document.getElementById('select__span-Four')
let select = document.querySelector('.select')
let selectColOne = document.querySelector('.selectColOne')
let selectColTwo = document.querySelector('.selectColTwo')
let selectColThree = document.querySelector('.selectColThree')
let selectColFour = document.querySelector('.selectColFour')
let selectItem = document.querySelector('.select__item')
let btc = document.querySelector('.btc')
let ltc = document.querySelector('.ltc')
let eth = document.querySelector('.eth')

selectSpanOne.classList.add('btc')
selectSpanTwo.classList.add('ltc')
selectSpanThree.classList.add('eth')
selectSpanFour.classList.add('btc')


selectSpanOne.addEventListener('click', ()=>{
    // selectRemove()
    selectColOne.classList.toggle('select__activ')
});

selectSpanTwo.addEventListener('click', ()=>{
    // selectRemove()
    selectColTwo.classList.toggle('select__activ')
});

selectSpanThree.addEventListener('click', ()=>{
    // selectRemove()
    selectColThree.classList.toggle('select__activ')
});

selectSpanFour.addEventListener('click', ()=>{
    // selectRemove()
    selectColFour.classList.toggle('select__activ')
});


document.getElementById('select__list-one').addEventListener('click', (event)=>{
    let selectSpan = document.getElementById('select__span-one')
    renderSelect(selectSpan,event)
});



document.getElementById('select__list-two').addEventListener('click', (event)=>{
    let selectSpan = document.getElementById('select__span-two')
    renderSelect(selectSpan,event)
});

document.getElementById('select__list-Three').addEventListener('click', (event)=>{
    let selectSpan = document.getElementById('select__span-Three')
    renderSelect(selectSpan,event)
});


document.getElementById('select__list-Four').addEventListener('click', (event)=>{
    let selectSpan = document.getElementById('select__span-Four')
    renderSelect(selectSpan,event)
});


function renderSelect(selectSpan,event) {
    let itemChild = event.currentTarget.childNodes;
    let itemCopy = event.target;
    let ltcName = itemCopy.classList[1];
    let itemText = itemCopy.textContent;
    selectSpan.innerHTML = itemText;
    selectListRemove(selectSpan)
    selectSpan.classList.add(`${ltcName}`)
    selectColorRemove(itemChild)
    itemCopy.classList.add('select__coin-activ')
    selectRemove()
}

function selectListRemove(selectSpan){
    selectSpan.classList.remove('btc')
    selectSpan.classList.remove('ltc')
    selectSpan.classList.remove('eth')
}

function selectColorRemove(itemChild){
    for (let node of itemChild){
        let n = node.className;

        if (n === undefined){

        }
        else if(node.classList[2] === 'select__coin-activ' ){
            let itemClass = node;
            itemClass.classList.remove('select__coin-activ')
        }  else {

        }
    }

}

function selectRemove(){
    selectColOne.classList.remove('select__activ')
    selectColTwo.classList.remove('select__activ')
    selectColThree.classList.remove('select__activ')
    selectColFour.classList.remove('select__activ')
}

