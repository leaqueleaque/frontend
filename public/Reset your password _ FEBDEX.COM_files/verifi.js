let listOne = document.querySelector('.popap-verifi-list-one')
    listTwo = document.querySelector('.popap-verifi-list-two')
    listThree = document.querySelector('.popap-verifi-list-three')
    listFour = document.querySelector('.popap-verifi-list-four')
    body = document.querySelector('.body')
    popapVerifi = document.querySelector('.popap-verifi')
    buttonListOne = document.querySelector('.popap-verifi-list-one-button')
    buttonListTwo = document.querySelector('.popap-verifi-list-two-button')
    buttonListThree = document.querySelector('.popap-verifi-list-three-button')
    popapLoader = document.querySelectorAll('.popap-verifi-loader')
    buttonCancelOne = document.querySelector('.popap-verifi-btn-cancel-list-one')
    buttonCancelTwo = document.querySelector('.popap-verifi-btn-cancel-two')
    buttonCancelThree = document.querySelector('.popap-verifi-btn-cancel-three')
    buttonCancelFour = document.querySelector('.popap-verifi-btn-cancel-four')
    coimItemAll = document.querySelectorAll('.popap-verifi-item-select-button')
    listItems = document.querySelectorAll('.popap-verifi-container-item')
    coinBox = document.getElementById('popap-btn-coin')

buttonListOne.addEventListener('click', ()=>{
    popapLoader[0].classList.add('popap-verifi-activ')
    setTimeout(()=>{
        listActivRemove()
        listTwo.classList.add('popap-verifi-activ')
    }, 1200)
});

// buttonListThree.addEventListener('click', ()=>{
//     popapLoader[2].classList.add('popap-verifi-activ')
//     setTimeout(()=>{
//         listActivRemove()
//         listFour.classList.add('popap-verifi-activ')
//     }, 1200)
// });

buttonListTwo.addEventListener('click', ()=>{
    popapLoader[1].classList.add('popap-verifi-activ')
    setTimeout(()=>{
        listActivRemove()
        listThree.classList.add('popap-verifi-activ')
    }, 1200)
});

coinBox.addEventListener('click', (event)=>{
    let btn = event.target;
    borderActive(btn)
});

buttonCancelOne.addEventListener('click', ()=>{
    popapVerifi.classList.remove('popap-verifi-block-active')
    body.classList.remove('scroll-stop')
});

buttonCancelTwo.addEventListener('click', ()=>{
    popapVerifi.classList.remove('popap-verifi-block-active')
    body.classList.remove('scroll-stop')
});

buttonCancelThree.addEventListener('click', ()=>{
    popapVerifi.classList.remove('popap-verifi-block-active')
    body.classList.remove('scroll-stop')
});

buttonCancelFour.addEventListener('click', ()=>{
    popapVerifi.classList.remove('popap-verifi-block-active')
    body.classList.remove('scroll-stop')
});

let listActivRemove = ()=> {
    for (i = 0; i < listItems.length; i++){
        listItems[i].classList.remove('popap-verifi-activ')
    }

}

let borderActive = (btn)=> {
    for (i = 0; i < coimItemAll.length; i++){
        coimItemAll[i].classList.remove('popap-verifi-item-select-button-active')
    }
    btn.classList.add('popap-verifi-item-select-button-active')
}