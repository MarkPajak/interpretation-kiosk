function set_color_by_kiosk(KIOSK){

var KColour = '#B60F16';


if (KIOSK.indexOf("LB") != -1) {
    KColour = '#B60F16';
}

if (KIOSK.indexOf("PPL-CB") != -1) {
    KColour = '#FF38A0';
}
if (KIOSK.indexOf("PPL-CH") != -1) {
    KColour = '#E68319';
}

if (KIOSK.indexOf("PPL-DP") != -1) {
    KColour = '#4A0062';
}
if (KIOSK.indexOf("PPL-CN") != -1) {
    KColour = '#167516';
}

if (KIOSK.indexOf("PPL-CR") != -1) {
    KColour = '#4A9C9B';
}

if (KIOSK.indexOf("PPL-TR") != -1) {
    KColour = '#72110D';
}
if (KIOSK.indexOf("PPL-TS") != -1) {
    KColour = '#000000';
}
if (KIOSK.indexOf("PLC-M") != -1) {
    KColour = '#4A9C9B';
}
if (KIOSK.indexOf("PLC-T") != -1) {
    KColour = '#E68319';
}

return KColour
}

//workaround for chrome shortcuts on a touchscreen - to prevent escaping the app
$(document).keydown(function(e){

  if(17 ) { // + key on num keyboard on my keyboard, test your clients to be sure
     e.preventDefault();
 //alert('BONGOP WINGS');
     //trigger tab functionality here
  }
  if(e.keyCode == 27||e.keyCode ==18 ) { // + key on num keyboard on my keyboard, test your clients to be sure
     e.preventDefault();

  }
});

var selected = null, // Object of the element to be moved
    x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
    // Store the object of the element which needs to be moved
    selected = elem;
    x_elem = x_pos - selected.offsetLeft;
    y_elem = y_pos - selected.offsetTop;
}

//workaround for dragging on a pc touchscreen to emulate mobile behaviour
// Will be called when user dragging an element
function _move_elem(e) {
e.preventDefault()

if($('#content-scroller').position().top >0) { 
console.log('reset')
 $('#content-scroller').css('top',0);}

    x_pos = document.all ? window.event.clientX : e.pageX;
    y_pos = document.all ? window.event.clientY : e.pageY;

    if (selected !== null) {
      //  selected.style.left = (x_pos - x_elem) + 'px';
        selected.style.top = (y_pos - y_elem) + 'px';
    }
}

// Destroy the object when we are done
function _destroy() {
    selected = null;
}

function makeTextDraggable(elem){

// Bind the functions...
document.getElementById(elem).onmousedown = function () {
    _drag_init(this);
    return false;
};
}

document.onmousemove = _move_elem;
document.onmouseup = _destroy;
/* App Module */


var locations = window.location.href
var dir = window.location.href.split("/#")[0]


if(window.location.href.indexOf("file")!=-1){
var dir = window.location.href.split("index.html")[0]	
	//console.log('cheese')
} 
else{
var dir = window.location.href.split("/#")[0]	
	
	
}