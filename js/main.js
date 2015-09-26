var frames = [];
var frameRate = 1000/10;
var context;
var canvas;
var numberOflanes = 4;
var laneSize = 0;
var gameState = "init";
var imageLoadCount = 0;
var maxImageSize = 7;
var mail;
var laneOne = [];
var laneTwo = [];
var laneThree = [];
var laneFour = [];
var laneEnemyCount = [];
var pickedElement;

var player = {
	x : 100,
	y : 100,
	state : "walking",
	currentAnimationKey : 0,
	currentLane : 0,
	idleFrames : [],
	
	changeState :function (state){
		this.state = state;
	
	},
	
	draw : function (){
		
		if( this.state == "walking" || this.state == "Pickup")
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
    
					
	maxImageSize = assests.length;
	for ( var i = 0; i < assests.length; i++ )
	{
		player.idleFrames.push(new Image());
		player.idleFrames[i].src = assests[i];
		player.idleFrames[i].onload = function () {
			imageLoadCount++;
		}
	}
	
	
	for(var j = 0;j < 4 ; j++)
	{
		laneEnemyCount[j] = 0;
	}
	
	setInterval(update,frameRate);
}

$(document).bind("keydown.up", function() { 

if(player.currentLane == 0)
	return;
else 
{
	player.currentLane--;
	player.y -= laneSize;
}


});
$(document).bind("keydown.space", function() { 

    if(player.state == "walking")
	{
	var postionX = 40000;
	var index = laneEnemyCount[player.currentLane];
	if(laneOne[index].getPostionX() >= (canvas.width * 0.5) && laneOne[index].getPostionX() < 40000 && player.currentLane == 0 )
	{
	laneOne[index].setpostionY(player.y - 100);
	laneOne[index].setpostion(player.x);
	laneOne[index].setState("PickedUp");
	laneEnemyCount[player.currentLane]++;
	pickedElement = laneOne[index];
	player.state = "Pickup"
	}
	if(laneTwo[index].getPostionX() >= (canvas.width * 0.5) && laneTwo[index].getPostionX() < 40000 && player.currentLane == 1)
	{
	laneTwo[index].setpostionY(player.y - 100);
	laneTwo[index].setpostion(player.x);
	laneTwo[index].setpostion(postionX);
	laneEnemyCount[player.currentLane]++;
	laneTwo[index].setState("PickedUp");
	pickedElement = laneTwo[index];
	player.state = "Pickup"
	}
	if(laneThree [index].getPostionX() >= (canvas.width * 0.5) && laneThree[index].getPostionX() < 40000 && player.currentLane == 2)
	{
	laneThree[index].setpostionY(player.y - 100);
	laneThree[index].setpostion(player.x);
	laneThree[index].setpostion(postionX);
	laneEnemyCount[player.currentLane]++;
	laneThree[index].setState("PickedUp");
	pickedElement = laneThree[index];
	player.state = "Pickup"
	}
	if(laneFour[index].getPostionX() >= (canvas.width * 0.5) && laneFour[index].getPostionX() < 40000 && player.currentLane == 3)
	{
	laneFour[index].setpostionY(player.y - 100);
	laneFour[index].setpostion(player.x);
	laneFour[index].setpostion(postionX);
	laneEnemyCount[player.currentLane]++;
	laneFour[index].setState("PickedUp");
	pickedElement = laneFour[index];
	player.state = "Pickup"
	}
	
	}
	else if(player.state = "Pickup")
	{
		pickedElement.setState("dropped");
		//player.state = "waitingForBlock"
		player.state = "walking";
		
	}
	
});

$(document).bind("keydown.down", function() { 

if(player.currentLane == (numberOflanes - 1))
	return;
else 
{
	player.currentLane++;
	player.y += laneSize;
}


});
var updateLanes = function (){

for(var i = 0;i < 100;i++)
{	
	
	
		if(i > 0 && laneOne[i].getPostionX() <= (laneOne[i-1].getPostionX() - 80))
		 	laneOne[i].update();
		else if(i == 0)
			laneOne[i].update();


		if(i > 0 && laneTwo[i].getPostionX() <= (laneTwo[i-1].getPostionX() - 80))
		 	laneTwo[i].update();
		else if(i == 0)
			laneTwo[i].update();
	
			if(i > 0 && laneThree[i].getPostionX() <= (laneThree[i-1].getPostionX() - 80))
		 	laneThree[i].update();
		else if(i == 0)
			laneThree[i].update();
	
		if(i > 0 && laneFour[i].getPostionX() <= (laneFour[i-1].getPostionX() - 80))
		 	laneFour[i].update();
		else if(i == 0)
			laneFour[i].update();
		
	}	
	
	if(player.state == "Pickup")
	{
		pickedElement.setpostionY(player.y - 100);
	}
}


var initLanes = function(){
	var positionY = player.y;
	 for(var i = 0; i< 100 ;i++)
	   {
		 var xPosition = 400 * i * -1;
		 console.log(xPosition);
		 var maxDisplacement = canvas.width * 0.5;
		 var state = false;
		 var type = Math.floor((Math.random() * 3));
		 
		laneOne[i] = new Mail(type,xPosition,positionY,maxDisplacement,state);
		laneOne[i].init();
	   }
	   positionY += laneSize;
	    for(var i = 0; i< 100 ;i++)
	   {
		 var xPosition = 400 * i * -1;
		 console.log(xPosition);
		 var maxDisplacement = canvas.width * 0.5;
		 var state = false;
		 var type = Math.floor((Math.random() * 3));
		 
		 
		laneTwo[i] = new Mail(type,xPosition,positionY ,maxDisplacement,state);
		laneTwo[i].init();
	   }
	   positionY += laneSize;
	    for(var i = 0; i< 100 ;i++)
	   {
		 var xPosition = 400 * i * -1;
		 console.log(xPosition);
		 var maxDisplacement = canvas.width * 0.5;
		 var state = false;
		 var type = Math.floor((Math.random() * 3));
		
		laneThree[i] = new Mail(type,xPosition,positionY,maxDisplacement,state);
		laneThree[i].init();
	   }
	   positionY += laneSize;
	    for(var i = 0; i< 100 ;i++)
	   {
		 var xPosition = 400 * i * -1;
		 console.log(xPosition);
		 var maxDisplacement = canvas.width * 0.5;
		 var state = false;
		 var type = Math.floor((Math.random() * 3));
		
		laneFour[i] = new Mail(type,xPosition,positionY,maxDisplacement,state);
		laneFour[i].init();
	   }
	   
} 


var update = function()
{
	 
	 if(gameState == "init" && maxImageSize == imageLoadCount )
	 {
		 player.x = canvas.width * 0.7;
		 player.y = 2 * player.idleFrames[0].width;
		 laneSize = (canvas.height - 2* player.idleFrames[0].width)/numberOflanes;
		 console.log(laneSize);
		initLanes();
		 
		 gameState = "playing";
	 }
	
	
	if(gameState != "playing")
	{
		return;
	}
	
	updateLanes();
    console.log(player.currentLane);
	draw();
	
		
}




var draw = function()
{
		player.draw();
		for(var i = 0;i < 100;i++)
		{
			
		 	laneOne[i].draw(context);
		}
		for(var i = 0;i < 100;i++)
		{
			
		 	laneTwo[i].draw(context);
		}
		for(var i = 0;i < 100;i++)
		{
			
		 	laneThree[i].draw(context);
		}
		for(var i = 0;i < 100;i++)
		{
			
		 	laneFour[i].draw(context);
		}
		
}