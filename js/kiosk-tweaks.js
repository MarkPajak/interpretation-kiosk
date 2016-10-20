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

if (KIOSK.indexOf("SOMALI-KIOSK") != -1) {
    KColour = '#000000';
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
 //e.preventDefault();
  if(e.keyCode == 17 ) { // + key on num keyboard on my keyboard, test your clients to be sure
     e.preventDefault();

     //trigger tab functionality here
  }
  if(e.keyCode == 27||e.keyCode ==18 ) { // + key on num keyboard on my keyboard, test your clients to be sure
     e.preventDefault();

  }
});



var locations = window.location.href
var dir = window.location.href.split("/#")[0]


if(window.location.href.indexOf("file")!=-1){
var dir = window.location.href.split("index.html")[0]	
	//console.log('cheese')
} 
else{
var dir = window.location.href.split("/#")[0]	
	
	
}