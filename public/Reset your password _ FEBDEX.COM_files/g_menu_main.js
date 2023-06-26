const toolsBtn = document.querySelector(".header__link-tools-span")
const toolsBox = document.querySelector(".header__tools-box")

const profileBtn = document.querySelector(".header__profile-toggle")
const profileBox = document.querySelector(".header__profile-box")
const profileBtnMobile = document.querySelector(".header__toggle-btn")

const toolsBtnMobile = document.querySelector(".header__profile-tools")
const toolsBoxMobile = document.querySelector(".header__profile-tools-box")

const toolsBoxMobileHeight = toolsBoxMobile.scrollHeight

toolsBtn.addEventListener("click", () => {
    toolsBox.classList.toggle("header__tools-box-active")
})

if (window.screen.width > 1000) {
    profileBtn.addEventListener("click", () => {
        profileBox.classList.toggle("header__profile-box-active")
    })
} else {
    profileBtnMobile.addEventListener("click", () => {
        profileBox.classList.toggle("header__profile-box-active")
        profileBtnMobile.classList.toggle('header__nav-opened')
    })
}

toolsBtnMobile.addEventListener("click", () => {
    if (toolsBoxMobile.classList.contains("header__profile-tools-box-active")) {
        toolsBoxMobile.classList.remove("header__profile-tools-box-active")
        toolsBoxMobile.style.height = `0px`
    } else {
        toolsBoxMobile.classList.add("header__profile-tools-box-active")
        toolsBoxMobile.style.height = `${toolsBoxMobileHeight}px`
    }
})

document.body.addEventListener("click", (event) => {
    if (!event.target.classList.contains("header__tools-box")
        && !event.target.classList.contains("header__link-tools-span")) {
        toolsBox.classList.remove("header__tools-box-active")
    }

    if (!event.target.classList.contains("header__profile-toggle")
        && !event.target.classList.contains("header__profile-box")
        && !event.target.classList.contains("header__profile-link")
        && !event.target.classList.contains("header__toggle-btn")) {
        profileBox.classList.remove("header__profile-box-active")
        profileBtnMobile.classList.remove('header__nav-opened')
    }
})