const swiper = document.getElementById('swiper-reviews');
function reviewsSwipeLeft() {   
    +swiper.style.marginLeft === 0 ? swiper.style.marginLeft = "-200%" : {}
    swiper.style.marginLeft === "0px" ? swiper.style.marginLeft = "-200%" : {}
    swiper.style.marginLeft === "-100%" ? swiper.style.marginLeft = "0px" : {}
    swiper.style.marginLeft === "-200%" ? swiper.style.marginLeft = "-100%" : {}
}
function reviewsSwipeRight() {
    +swiper.style.marginLeft === 0 ? swiper.style.marginLeft = "-200%" : {}
    swiper.style.marginLeft === "0px" ? swiper.style.marginLeft = "-200%" : {}
    swiper.style.marginLeft === "-100%" ? swiper.style.marginLeft = "0px" : {}
    swiper.style.marginLeft === "-200%" ? swiper.style.marginLeft = "-100%" : {}
}







// Новый код
function formGO() {
    const body = document.getElementById('body')
    const modal = document.getElementById('modal')
    const bodyGo = document.getElementById('go-back')
    modal.style.display = "none"
    body.style.display = "none"
    bodyGo.style.display = "block"
}
function goBack() {
    const body = document.getElementById('body')
    const bodyGo = document.getElementById('go-back')
    body.style.display = "block"
    bodyGo.style.display = "none"
}
function showModal() {
    const modal = document.getElementById('modal')
    modal.style.display = "block"
}