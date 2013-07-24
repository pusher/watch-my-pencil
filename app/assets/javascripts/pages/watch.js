var pusher = null;
var chDrawUpdates = null;

$(function() {
 
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

	chDrawUpdates.bind('client-new-coordinates', function(data) {
		drawPath(data);
	});
}

function drawPath(data)
{
	var ctx = $('#drawArea').get(0).getContext('2d');
	
	ctx.moveTo(data.coordinates[0][0], data.coordinates[0][1]);

	for(p = 1; p < data.coordinates.length; p++)
	{
		ctx.lineTo(data.coordinates[p][0], data.coordinates[p][1]);
		ctx.stroke();
	}
	  
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

