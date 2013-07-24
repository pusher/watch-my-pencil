var inDrag = false;
var coordinates = new Array();
var pusher = null;
var chDrawUpdates = null;

$(function() {
  $('#drawArea').mousedown(function (event) {
	  inDrag = true;
	  var ctx = $('#drawArea').get(0).getContext('2d');
	  ctx.moveTo(event.offsetX, event.offsetY);
	  coordinates.push([event.offsetX, event.offsetY]);
	  event.preventDefault();
	  return false;
  });

	$('#drawArea').mouseup(function (event) {
	  inDrag = false;
	  console.log("Pushing coordinates: " + coordinates);
	  chDrawUpdates.trigger('client-new-coordinates', { coordinates: coordinates });
	  coordinates = new Array();
	  return false;
	});

	$('#drawArea').bind('mousemove', function (event) {
		if(inDrag)
		{
		  var ctx = $('#drawArea').get(0).getContext("2d");
		  ctx.lineTo(event.offsetX, event.offsetY);
		  ctx.stroke();
		  coordinates.push([event.offsetX, event.offsetY]);
		  event.preventDefault();
		}
	  	return false;
	});

	resizeCanvas();
	initPusher();
	

});

function initPusher()
{
	// Set up Pusher logging to console
    Pusher.log = function (message) {
      if (window.console && window.console.log) {
          window.console.log(message);
      }
    };

	pusher = new Pusher('95443593a5ff3695d1f1', { authEndpoint: "/game/auth" });
	chDrawUpdates = pusher.subscribe('private-draw-updates');
}


function getCanvasDimensions()
{
	var isFirstPass = false,
        isIPhone = (/iphone/gi).test(navigator.appVersion),
		 width = $(window).width(),
		 height = $(window).height() + (isIPhone ?  60 : 0),
		 hHeight = $('header').outerHeight() || 0,
		 fHeight = $('footer').outerHeight() || 0;
    return {
      width: width,
      height: height - hHeight - fHeight
    };
}

function resizeCanvas() 
{
  var dims = getCanvasDimensions();
  $('#drawArea').attr({
    width: dims.width - 4,
    height: dims.height - 4
  });
}


