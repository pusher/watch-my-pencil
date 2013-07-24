var WMP = WMP || {};
//WMP.Drawing = WMP.Drawing || {};

WMP.Drawing = {

	getCanvasDimensions: function()
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
	},

	resizeCanvas: function(id, bottomMargin)
	{
	  var dims = this.getCanvasDimensions();
	  $(id).attr({
	    width: dims.width,
	    height: dims.height - bottomMargin
	  });
	},

	setupDrawEvents: function()
	{
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
		  WMP.Pusher.drawUpdatesChannel.trigger('client-new-coordinates', { coordinates: coordinates });
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

	},

	drawPath: function(data)
	{
		var ctx = $('#watchArea').get(0).getContext('2d');
		ctx.moveTo(data.coordinates[0][0], data.coordinates[0][1]);

		for(p = 1; p < data.coordinates.length; p++)
		{
			ctx.lineTo(data.coordinates[p][0], data.coordinates[p][1]);
			ctx.stroke();
		}
	  
	}
};