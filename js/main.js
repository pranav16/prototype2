var frames = [];
var frameRate = 1000/10;
var context;
var canvas;


var player = {
	x : 100,
	y : 100,
	state : "walking",
	currentAnimationKey : 0,
	idleFrames : [],
	
	changeState :function (state){
		this.state = state;
	
	},
	
	draw : function (){
		
		if( this.state == "walking")
			this.playIdle();
		
	},
	
	playIdle : function(){
		context.clearRect(0, 0, canvas.width, canvas.height);
     	context.drawImage(this.idleFrames[this.currentAnimationKey], this.x, this.y);
		this.currentAnimationKey = (this.currentAnimationKey + 1) % this.idleFrames.length;
	}
	
	
	
	
}

function init()
{
	canvas = document.getElementById("myCanvas");
	var body = document.getElementById("body");
	
	canvas.width = window.innerWidth-100;
	canvas.height = window.innerHeight-100;

    context = canvas.getContext("2d");
	
	body.appendChild(canvas);
	
   	var assests = ['art/marioWalk/1.png',
					'art/marioWalk/2.png',
					'art/marioWalk/3.png',
					'art/marioWalk/4.png',
					'art/marioWalk/5.png',
					'art/marioWalk/6.png',
     				'art/marioWalk/7.png',
					];
	
	for ( var i=0; i<assests.length; i++ )
	{
		player.idleFrames.push(new Image());
		player.idleFrames[i].src = assests[i];
	}
	setInterval(update,frameRate);
}


var update = function()
{
	draw();
	
	player.x = (player.x  + 15) % canvas.width ;
	
}

var draw = function()
{
		player.draw();
}