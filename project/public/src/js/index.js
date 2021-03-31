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