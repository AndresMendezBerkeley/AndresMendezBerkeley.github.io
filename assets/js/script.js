// colors for project1 and project2 rgba format.
var color1 = '38, 29, 135, .5';
var color2 = '98, 0, 238, 0.3';

function animate_light_on() {
  var speed = 1000;
  var dimmed = '.5';

  document.querySelector(".light").animate([{opacity: '0' }, {opacity: '1' }], {duration: speed, fill: 'forwards'});
  document.querySelector(".robot").animate([{opacity: dimmed }, {opacity: '1' }], {duration: speed, fill: 'forwards'});
}

function animate_light_off() {
  var speed = 1000;
  var dimmed = '.5';

  document.querySelector(".light").animate([{opacity: '1' }, {opacity: '0' }], {duration: speed, fill: 'forwards'});
  document.querySelector(".robot").animate([{opacity: '1' }, {opacity: dimmed }], {duration: speed, fill: 'forwards'});
}


var flash_anim_button1;
function flash_button1() { 
  let duration = 1900; // milliseconds
  let button1_time = Date.now();
  var button = document.querySelector("#button1");
  var i = 0;
  flash_anim_button1 = setInterval(function () {
    let curr_time = Date.now();
    if (curr_time - button1_time > duration) {
      clearInterval(flash_anim_button1);
    }
    console.log(curr_time - button1_time);
    if (i%2 == 0) {
      //button.style.boxShadow = '0 0 0 3pt #ffffff';
      button.style.transform = "scale(1.1, 1.1)";
    }
    else {
      //button.style.boxShadow = '0 0 0 3pt #a25ef5';
      button.style.transform = "scale(1.0, 1.0)";
    }
    i++;
  }, 500);
  
}

/**
 * Handles the shrinking of main project on main page.
 */
let time = Date.now();
let lock = 250; // delay in milliseconds.
let first_time = true; // have no delay on the first load.
function slide(name) {
  let curr_time = Date.now();
  if (first_time || curr_time - time > lock) { // only call these functions after a delay interval so they cannot happen almost simultaneuously.
    first_time = false;
    time = Date.now();
    if (name == '.project1') {
      document.querySelector(".project1").classList.remove("clickable");
      ungrow('.project2');
      ungrow('.project3');
      document.querySelector(name).style.backgroundImage="url(././assets/img/20200918_184435.jpg)";
      grow1 = true;
    }
    if (name == '.project2') {
      document.querySelector(".project3").classList.remove("clickable");
      ungrow('.project1');
      ungrow('.project3');
      document.querySelector(name).style.backgroundImage="url(././assets/img/self_driving_car_cropped.png)";
      grow1 = false;
  
    }
    if (name != '.project3') { // can remove this if statement once you add a project3.
      document.querySelector(name).classList.add("slideright");
      setTimeout(function() { grow(name); }, 250);
    }
  }
}
function grow(name) {
  if (name == '.project1') {
    document.querySelector(name).classList.add("grow");
    document.getElementById("button1").style.opacity = "1";
    document.getElementById("button1").style.display = "inherit";
    flash_button1();
  } else if (name == '.project2') {
    document.querySelector(name).classList.add("grow");
    document.getElementById("button2").style.opacity = ".7";
  }
    
}

function ungrow(name) {
  if (document.querySelector(name).classList.contains("grow")) {
    if (name == '.project1') {
      clearInterval(flash_anim_button1); // stop the flashing button animation.
      //document.getElementById("button1").style.opacity = "0"; // hide the button.
      document.getElementById("button1").style.display = "none";
      document.querySelector(name).style.backgroundImage="linear-gradient( rgba("+ color1 +"), rgba(" + color1 + ") ), url(././assets/img/20200918_184435.jpg)";
      document.querySelector(name).classList.add("ungrow");
    }
    setTimeout(function() { unslide(name); }, 150);
  }
  if (document.querySelector(name).classList.contains("grow")) {
    if(name == '.project2') {
      document.getElementById("button2").style.opacity = "0"; // hide the button.
      document.querySelector(name).style.backgroundImage="linear-gradient( rgba("+ color2 +"), rgba("+ color2 +") ), url(././assets/img/self-driving-car-lighter.png)";
      document.querySelector(name).classList.add("ungrow");
    }
    setTimeout(function() { unslide(name); }, 150);
  }
}
function unslide(name) {
  document.querySelector(name).classList.add("unslide");
  setTimeout(function() { clear_list(name); }, 150);
}

function clear_list(name) {
  document.querySelector(name).classList.remove("grow");
  document.querySelector(name).classList.remove("grow");
  document.querySelector(name).classList.remove("slideright");
  document.querySelector(name).classList.remove("ungrow");
  document.querySelector(name).classList.remove("ungrow");
  document.querySelector(name).classList.remove("unslide");
}


/**
 * Handles when we scroll to the bottom of the main page and turns the light on.
 * If we scroll back up, it will turn light off.
 */
var waypoint = new Waypoint({
  element: document.querySelector(".animation"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'down') {
      animate_light_on();
    }
    else {
      animate_light_off();
    }
  },
  offset: '65%'
});

var mouseclick = "";
window.onclick=function(e) {
  mouseclick = e.target.className;
  console.log(mouseclick);
  var proj1 = document.querySelector(".project1");
  var proj2 = document.querySelector(".project2");
  
  document.body.style.cursor = 'default';
  if (mouseclick[7] == '1') {
    slide(".project1");
  }
  if (mouseclick[7] == '2') {
    slide(".project2");
  }
  if (mouseclick[7] == '3') {
    slide(".project3");
  }
};

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

/**  BEGIN OF SECTION THAT HANDLES HOVER AND CLICK OF MOUSE:
 *    This section uses two methods of to complete these two tasks. One method is having on event listeners for the mouse
 *    on hover and on click. There are some edge cases that we must deal with, for these we use a MutationObserver to listen when
 *    any objects classlist attributes change, then we check our specific items to see if we must update them.
 */
var mousehover = "";
var which_project = "neither"; // this is default to neither, but this will update to either project, or neither depending on what we are hovering over.
var show_outline = false;
var clickable = false;
window.onmouseover=function(e) {
  mousehover = e.target.className;
  console.log(mousehover);
  mousehover = mousehover[7];
  var proj1 = document.querySelector(".project1");
  var proj2 = document.querySelector(".project2");

  if (mousehover == '1' || mousehover == '2') {
    if (mousehover == '1') {
      which_project = ".project1";
      // changing the alpha layer to 0.X where X = 7
      // color1 = color1.replaceAt(14, '7');
      // update_image_shade('1', color1);
      if (!proj1.classList.contains("grow")) {
        document.body.style.cursor = 'pointer';
        proj1.classList.add("hover-border");
      }
    }
    if (mousehover == '2') {
      which_project = ".project2";
      // changing the alpha layer to 0.X where X = 5
      // color2 = color2.replaceAt(14, '5');
      // update_image_shade('2', color2);
      if (!proj2.classList.contains("grow")) {
        document.body.style.cursor = 'pointer';
        proj2.classList.add("hover-border");
      }
    }
  } else {
    which_project = ".neither";
    if (mousehover != '1') {
      // changing the alpha layer to 0.X where X = 8
      // color1 = color1.replaceAt(14, '5');
      // update_image_shade('1', color1);
      proj1.classList.remove("hover-border");
    }
    if (mousehover != '2') {
      // changing the alpha layer to 0.X where X = 8
      // color2 = color2.replaceAt(14, '3');
      // update_image_shade('2', color2);
      proj2.classList.remove("hover-border");
    }
    document.body.style.cursor = 'default';
  }
};


// create a listener to update when a classlist is changed on an object.
// Select the node that will be observed for mutations
const targetNode = document.querySelector('.projects');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    var proj1 = document.querySelector('.project1');
    var proj2 = document.querySelector('.project2');
    for(const mutation of mutationsList) {
      // edge cases: where you move your mouse fast enough from one project to another. In between, the 'grow' tag
      // may still be on project, so we need to double check it. To see for yourself, comment these if statements out
      // and then: 1) click the second project, 2) as soon as you click, move the mouse as fast as you can to the first project,
      // 3) you should see that there is not a hover animation. This is because, there is a slight delay timed delay elsewhere
      // that removes all other classlist items once we are done with a certain animation.
        if ((!proj1.classList.contains('grow') && which_project==".project1") && !proj1.classList.contains("hover-border")) {
          document.body.style.cursor = 'pointer';
          proj1.classList.add("hover-border");
        }
        if ((!proj2.classList.contains('grow') && which_project==".project2") && !proj2.classList.contains("hover-border")) {
          document.body.style.cursor = 'pointer';
          proj2.classList.add("hover-border");
        }

        // also edge case when we click and follow the project animation, we need to remove these hover effects also.
        if ((proj1.classList.contains('grow') && which_project==".project1") && proj1.classList.contains("hover-border")) {
          document.body.style.cursor = 'default';
          proj1.classList.remove("hover-border");
        }
        if ((proj2.classList.contains('grow') && which_project==".project2") && proj2.classList.contains("hover-border")) {
          document.body.style.cursor = 'default';
          proj2.classList.remove("hover-border");
        }
    }
    
};
// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);
// Start observing the target node for configured mutations
observer.observe(targetNode, config);

/**  END OF SECTION THAT HANDLES HOVER AND CLICK OF MOUSE:
 *    This previous section used two methods of to complete these two tasks. One method is having on event listeners for the mouse
 *    on hover and on click. There are some edge cases that we must deal with, for these we use a MutationObserver to listen when
 *    any objects classlist attributes change, then we check our specific items to see if we must update them.
 */




function update_image_shade(which_one, color) {
  if (which_one == '1') {
    document.querySelector('.project1').style.backgroundImage="linear-gradient( rgba("+ color +"), rgba(" + color + ") ), url(././assets/img/20200918_184435.jpg)";
  }
  if (which_one == '2') {
    document.querySelector('.project2').style.backgroundImage="linear-gradient( rgba("+ color +"), rgba("+ color +") ), url(././assets/img/self-driving-car-lighter.png)";
  }
}

var waypoint = new Waypoint({
  element: document.querySelector(".project1"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'up') {
      ungrow('.project1');
    }

  },
  offset: '60%'
});
var waypoint = new Waypoint({
  element: document.querySelector(".project1"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'down') {
      slide('.project1');
    }

  },
  offset: '60%'
});
var waypoint = new Waypoint({
  element: document.querySelector(".project2"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'up') {
      slide('.project1');
    }

  },
  offset: '40%'
});
var waypoint = new Waypoint({
  element: document.querySelector(".project2"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'down') {
      slide('.project2');
    }

  },
  offset: '40%'
});
var waypoint = new Waypoint({
  element: document.querySelector(".project2"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'down') {
      slide('.project2');
    }

  },
  offset: '40%'
});

/*
var waypoint = new Waypoint({
  element: document.querySelector(".project3"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),

      slide('.project3');
  },
  offset: '50%'
});*/

// first transition from top of page down one scroll.
var waypoint = new Waypoint({
  element: document.querySelector(".hero-arrow"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'down') {
      document.querySelector(".hero-arrow").classList.add("fade-half");
      document.querySelector(".hero-arrow").classList.remove("fade-in");
    } else {
      document.querySelector(".hero-arrow").classList.add("fade-in");
      document.querySelector(".hero-arrow").classList.remove("fade-half");
    }

  },
  offset: '80%'
});
// second transition from fade half to fade out.
var waypoint = new Waypoint({
  element: document.querySelector(".hero-arrow"),
  handler: function(direction) {
    //alert('You have scrolled to a thing'),
    if (direction == 'down') {
      document.querySelector(".hero-arrow").classList.add("fade-out");
      document.querySelector(".hero-arrow").classList.remove("fade-half");
    } else {
      document.querySelector(".hero-arrow").classList.add("fade-half");
      document.querySelector(".hero-arrow").classList.remove("fade-out");
    }

  },
  offset: '70%'
});

onload = function startAnimation() {
  // hide the loader.
  //document.querySelector(".loader-container").classList.add("loader-fade-out");

  // start playing other animations on the webpage
  var frames = document.querySelector(".robot").children;
  var frameCount = frames.length;
  var i = 0;
  setInterval(function () { 
      frames[i % frameCount].style.display = "none";
      frames[++i % frameCount].style.display = "block";
  }, 100);
}


//shrink_and_slide();
//document.querySelector(".animation").onmouseenter = lightOn;
//document.querySelector(".animation").onmouseleave = lightOff;

//document.querySelector("#project1-tag").onmouseenter = slide("#project1");


// Set this as default down, so as to show the user what to expect.
//slide(".project1");