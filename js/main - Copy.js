function setUp()
{
	var canvas = document.getElementById("myCanvas");
	var body = document.getElementById("body");
	
	canvas.width = window.innerWidth-100;
	canvas.height = window.innerHeight-100;

    var context = canvas.getContext("2d");
	
	body.appendChild(canvas);
	
   	var imageObj = new Image();
	imageObj.onload = function()
	{
        context.drawImage(imageObj, 100, 100);
		console.log("vikram");
    };
	imageObj.src = 'art/mailMan.png';
	
	
}

