var WMP = WMP || {};

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

	resizeCanvas: function(id, bottomMargin, padding)
	{
	  var dims = this.getCanvasDimensions();
	  $(id).attr({
	    width: dims.width - padding * 2,
	    height: dims.height - bottomMargin
	  });
	},

	setupDrawEvents: function()
	{
		$('#drawArea').bind('mousedown touchstart', function (event) {
			  inDrag = true;
			  var ctx = $('#drawArea').get(0).getContext('2d');
			  var pos = WMP.Drawing.extractXY(event);
			  ctx.moveTo(pos.x, pos.y);
			  coordinates.push([pos.x, pos.y]);
			  event.preventDefault();
			  return false;
		});

		$('#drawArea').bind('mouseup touchend', function (event) {
		  inDrag = false;
		  console.log("Pushing coordinates: " + coordinates);
		  WMP.Pusher.drawUpdatesChannel.trigger('client-new-coordinates', { coordinates: coordinates });
		  coordinates = new Array();
		  return false;
		});

		$('#drawArea').bind('mousemove touchmove', function (event) {
			if(inDrag)
			{
			  var ctx = $('#drawArea').get(0).getContext("2d");
			  var pos = WMP.Drawing.extractXY(event);

			  ctx.lineTo(pos.x, pos.y);
			  ctx.stroke();
			  coordinates.push([pos.x, pos.y]);
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
	  
	},

	extractXY: function(event) 
	{
		if(event.originalEvent.touches)
		{
		  	return {
		  		x: (event.originalEvent.touches[0].pageX - event.originalEvent.touches[0].target.offsetLeft),
		  		y: (event.originalEvent.touches[0].pageY - event.originalEvent.touches[0].target.offsetTop)
			};
		}
		else
		{
		  	return {
			  	x: event.offsetX,
			  	y: event.offsetY
			};
		}
	}
};