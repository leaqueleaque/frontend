const moreBtn = document.querySelector('.menuProfile__menu-more')
const moreMenu = document.querySelector('.menuProfile__more')
const moreBg = document.querySelector('.menuProfile__more-bg')

moreBtn.addEventListener('click', () => {
    moreMenu.classList.toggle('menuProfile__more-active')
    moreBg.classList.toggle('menuProfile__more-bg-active')
    document.body.classList.toggle('lock-scroll')
})

moreBg.addEventListener('click', () => {
    moreMenu.classList.remove('menuProfile__more-active')
    moreBg.classList.remove('menuProfile__more-bg-active')
    document.body.classList.remove('lock-scroll')
})