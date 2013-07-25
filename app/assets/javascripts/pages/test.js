var inDrag = false;
var coordinates = new Array();

$(function() {
	$('#drawArea').bind('mousedown touchstart', function (event) {
	  inDrag = true;
	  
	  var ctx = $('#drawArea').get(0).getContext('2d');
	  var pos = extractXY(event);

	  ctx.moveTo(pos.x, pos.y);
	  coordinates.push([pos.x, pos.y]);
	  event.preventDefault();
	  return false;
	});

	$('#drawArea').bind('mouseup touchend', function (event) {
		//alert('Touch end');
	  inDrag = false;
	  //WMP.Pusher.drawUpdatesChannel.trigger('client-new-coordinates', { coordinates: coordinates });
	  coordinates = new Array();
	  return false;
	});

	$('#drawArea').bind('mousemove touchmove', function (event) {
		
		if(inDrag)
		{
		  var ctx = $('#drawArea').get(0).getContext("2d");
		  var pos = extractXY(event);

		  ctx.lineTo(pos.x, pos.y);
		  ctx.stroke();
		  coordinates.push([pos.x, pos.y]);
		  event.preventDefault();
		}
	  	return false;
	});
});

function extractXY(event) {
	if(event.originalEvent.touches)
	{
	  	return {
			x: event.originalEvent.pageX,
			y: event.originalEvent.pageY
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
