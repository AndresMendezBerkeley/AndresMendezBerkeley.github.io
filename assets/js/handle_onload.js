// hide the scroll bar while loading
document.body.style.overflowY = 'hidden';


// once all elements have loaded...
onload = function loaderAnim() {
    // show the scroll bar
    document.querySelector(".loader-container").classList.add("loader-fade-out");
    document.body.style.overflowY = 'visible';

    // load the type animation.
    if (document.querySelector(".hero-title")) {
        new TypeIt(".hero-title", {
            strings: ["Hi, I’m Andres Mendez.", "", "Welcome to my project portfolio!"],
            speed: 75,
            loop: false
        }).go();
    }

    // play the robot animation on the home page.
    // start playing other animations on the webpage
    if (document.querySelector(".robot")) {
        var frames = document.querySelector(".robot").children;
        var frameCount = frames.length;
        var i = 0;
        setInterval(function () { 
            frames[i % frameCount].style.display = "none";
            frames[++i % frameCount].style.display = "block";
        }, 100);
    }

    // add the videos into their place.
    if (document.querySelector("#first_step_vid")) {
        document.querySelector("#first_step_vid").setAttribute('src', 'assets/img/first_step.mp4');
        document.querySelector("#another_sim_vid").setAttribute('src', 'assets/img/second_vid_thin.mp4');   
    }
}