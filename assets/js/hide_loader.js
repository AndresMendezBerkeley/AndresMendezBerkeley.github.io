// hide the scroll bar while loading
document.body.style.overflowY = 'hidden';

// once all elements load, hide the loader animation and show the scrollbar
onload = function loaderAnim() {
    document.querySelector(".loader-container").classList.add("loader-fade-out");
    document.body.style.overflowY = 'visible';
}