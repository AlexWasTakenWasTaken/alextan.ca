document.addEventListener("DOMContentLoaded", () => {

    const greetingElement = document.getElementById("greeting");
    const greetings = [
      { text: "Hello!", duration: 3000 },  // English - stays longer
      { text: "Bonjour!", duration: 2000 }, // French
      { text: "Guten Tag!", duration: 2000 }, // German
      { text: "你好!", duration: 2000 }, // Chinese
      { text: "こんばんは!", duration: 2000 }, // Japanese
      { text: "안녕하세요!", duration: 2000 }  // Korean
    ];
    let index = 0;
    let isAnimating = false;
  
    // Helper to fade out text
    function fadeOut(element, callback) {
      // Avoid interrupting mid-animation
      if (isAnimating) return;
      isAnimating = true;
      
      // Add fade-out class
      element.classList.remove("slide-in");
      element.classList.add("fade-out");
      
      // Listen for the animation to finish
      element.addEventListener("animationend", function handler() {
        element.removeEventListener("animationend", handler);
        // Animation finished, run callback
        callback();
      });
    }
  
    // Helper to slide in text
    function slideIn(element) {
      element.classList.remove("fade-out");
      element.classList.add("slide-in");
      // When the slide-in finishes, we can mark animations as done
      element.addEventListener("animationend", function handler() {
        element.removeEventListener("animationend", handler);
        isAnimating = false;
      });
    }
  
    // Handles changing to the next greeting
    function changeGreeting() {
      fadeOut(greetingElement, () => {
        // Change the text while hidden
        index = (index + 1) % greetings.length;
        greetingElement.textContent = greetings[index].text;
  
        // Start sliding in
        slideIn(greetingElement);
      });
    }
  
    // Initialize greeting
    greetingElement.textContent = greetings[index].text;
  
    // Start cycle
    setInterval(() => {
      changeGreeting();
    }, greetings[index].duration);
});


//cursor effect
let orbX = 0; // Current orb position
let orbY = 0;
let targetX = 0; // Target position (mouse position)
let targetY = 0;
const speed = 0.1; // Speed of movement
const threshold = 1; // Threshold for stopping

document.addEventListener('mousemove', (event) => {
    // Use `clientX` and `clientY` for viewport-relative coordinates
    targetX = event.clientX;
    targetY = event.clientY;
});

const updateOrb = () => {
    const orb = document.getElementById('magical-orb');

    // Calculate the distance to the target
    const distanceX = targetX - orbX;
    const distanceY = targetY - orbY;

    // If the orb is not yet on the target, move it closer
    if (Math.abs(distanceX) > threshold || Math.abs(distanceY) > threshold) {
        orbX += distanceX * speed; // Move part of the distance
        orbY += distanceY * speed;

        orb.style.left = `${orbX}px`;
        orb.style.top = `${orbY}px`;
    }

    requestAnimationFrame(updateOrb); // Smoothly update position
    sleep(20);
};

requestAnimationFrame(updateOrb);

// parallax effect
let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains_behind = document.getElementById('mountains_behind');
let text = document.getElementById('welcomeText');
let startButton = document.getElementById('startButton');
let mountains_front = document.getElementById('mountains_front');

let stars2 = document.getElementById('stars2');
let moon2 = document.getElementById('moon2');
let mountains = document.getElementById('mountains');
let ground = document.getElementById('ground');

const vH = window.innerHeight;

window.addEventListener('scroll', function(){
    let value = window.scrollY;

    if (value < 2 * vH){
        stars.style.left = value * .25 + 'px';
        moon.style.top = value + 'px';
        mountains_behind.style.top = value * .5 + 'px';
        mountains_front.style.top = value * .15 + 'px';
        text.style.marginRight = value * 1.5 + 'px';
        startButton.style.marginLeft = value * 1.5 + 'px';
    }

    if (value < 3 * vH){
        moon2.style.top = (value - vH) + 'px';
        stars2.style.left = (value) * -.25 + 'px';
        mountains.style.top = (value - 0.5 * vH) * .35 + 'px';
        ground.style.top = (value - 0.5 * vH) * 0 + 'px';
    }

})
