var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    // Split the full text into base text and last word
    var lastSpaceIndex = fullTxt.lastIndexOf(' ');
    var baseText = fullTxt.substring(0, lastSpaceIndex + 1); // Text before the last word
    var lastWord = fullTxt.substring(lastSpaceIndex + 1); // The last word

    if (this.isDeleting) {
        if (this.txt.length > baseText.length) {
            // Deleting characters only from the last word
            this.txt = this.txt.substring(0, this.txt.length - 1);
        } else {
            // When only the base text remains, transition to the next phase
            this.isDeleting = false;
            this.loopNum++;
        }
    } else {
        if (this.txt !== fullTxt) {
            // Typing forward
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    // Determine the delay before the next tick
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
        delta /= 2; // Faster deletion
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period; // Pause when the full text is typed
        this.isDeleting = true; // Start deleting phase
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};