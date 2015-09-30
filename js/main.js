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
var score = 0;
var mailBoxes = [];
var mailBoxType = [];
var bg;
var isBgReady;
var time;
function collides(a, b) {
	var isCollides = false;
	var temp = b.getPostionY();
	if(b.getPostionX() > (canvas.width - mailBoxes[a].width) && b.getPostionX() < canvas.width && b.getPostionY() == (a * laneSize))
		isCollides = true;
	
  return isCollides;
}

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
	var enemyAssets = ['art/Enemies/blue.png','art/Enemies/green.png','art/Enemies/red.png','art/Enemies/green.png'];
	
	for (var p = 0; p < 4 ; p++)
	{
		mailBoxes[p] = new Image();
		mailBoxes[p].src = enemyAssets[p];
		if(p < 3)
		mailBoxType[p] = p;
		else
			mailBoxType[p] = 1;
	}
	
	for(var j = 0;j < 4 ; j++)
	{
		laneEnemyCount[j] = 0;
	}
	bg = new Image();
	bg.src = 'art/bg.jpg';
	bg.onload = function() {
		isBgReady = true;
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
	laneOne[index].setpostionY(0);
	laneOne[index].setpostion(player.x);
	laneOne[index].setState("PickedUp");
	laneEnemyCount[player.currentLane]++;
	pickedElement = laneOne[index];
	player.state = "Pickup"
	}
	if(laneTwo[index].getPostionX() >= (canvas.width * 0.5) && laneTwo[index].getPostionX() < 40000 && player.currentLane == 1)
	{
	laneTwo[index].setpostionY(laneSize);
	laneTwo[index].setpostion(player.x);
	
	laneTwo[index].setState("PickedUp");
	laneEnemyCount[player.currentLane]++;
	pickedElement = laneTwo[index];
	player.state = "Pickup"
	}
	if(laneThree [index].getPostionX() >= (canvas.width * 0.5) && laneThree[index].getPostionX() < 40000 && player.currentLane == 2)
	{
	laneThree[index].setpostionY(laneSize* 2);
	laneThree[index].setpostion(player.x);

	laneThree[index].setState("PickedUp");
	laneEnemyCount[player.currentLane]++;
	
	pickedElement = laneThree[index];
	player.state = "Pickup"
	}
	if(laneFour[index].getPostionX() >= (canvas.width * 0.5) && laneFour[index].getPostionX() < 40000 && player.currentLane == 3)
	{
	laneFour[index].setpostionY(laneSize * 3);
	laneFour[index].setpostion(player.x);
	
	laneFour[index].setState("PickedUp");
	laneEnemyCount[player.currentLane]++;

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
	
	    var state =  laneOne[i].getState();
		if(i > 0 && laneOne[i].getPostionX() <= (laneOne[i-1].getPostionX() - 80) )
		 	laneOne[i].update();
		else if(i == 0)
			laneOne[i].update();


		if(i > 0 && laneTwo[i].getPostionX() <= (laneTwo[i-1].getPostionX() - 80) )
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
		
		pickedElement.setpostionY(player.currentLane * laneSize);
	}
}

var checkForEnemyCollision = function()
{
	if(pickedElement != null)
	{
		
		for(var i = 0;i < 4 ;i++)
		{
			var typeOfMailBox = mailBoxType[i];
			var typeOfPickedElement = pickedElement.getType();
			if(collides(i,pickedElement) && typeOfMailBox == typeOfPickedElement )
			{
			score++;
			document.getElementById("score").innerHTML = "Score:" + score;
			pickedElement = null;
			
			}
			else if(collides(i,pickedElement)){
			score--;
			document.getElementById("score").innerHTML = "Score:" + score;
			pickedElement = null;
			
			}
		}
		
		
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
		 var maxWidth = canvas.width;
		 
		laneOne[i] = new Mail(type,xPosition,positionY,maxDisplacement,state,maxWidth);
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
		  var maxWidth = canvas.width;
		 
		laneTwo[i] = new Mail(type,xPosition,positionY ,maxDisplacement,state,maxWidth);
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
		  var maxWidth = canvas.width;
		
		laneThree[i] = new Mail(type,xPosition,positionY,maxDisplacement,state,maxWidth);
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
		  var maxWidth = canvas.width;
		
		laneFour[i] = new Mail(type,xPosition,positionY,maxDisplacement,state,maxWidth);
		laneFour[i].init();
	   }
	   
} 
var checkForTime = function()
{
	var date = new Date();
	var currentTime = (date.getTime()/1000) /60;
	var timeDiff = currentTime - time;
	if(timeDiff >= 2)
		return true;
	else
		return false;
	
}

var update = function()
{
	 
	 if(gameState == "gameover")
		 return;
	 if(gameState == "init" && maxImageSize == imageLoadCount )
	 {
		 player.x = canvas.width * 0.7;
		 player.y = 2 * player.idleFrames[0].width;
		 laneSize = (canvas.height - 2* player.idleFrames[0].width)/numberOflanes;
		 initLanes();
		 var date = new Date();
		 time = (date.getTime()/1000)/60;
		 
		 gameState = "playing";
	 }
	
	
	if(gameState != "playing")
	{
		return;
	}

	
	checkForEnemyCollision();
	updateLanes();
	draw();
	if(checkForTime())
		gameState = "gameover";
		
}




var draw = function()
{
	    
	    context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(bg,0,0 ,canvas.width,canvas.height);
		player.draw();
		for(var i = 0 ; i< 4 ; i++)
		{
			context.drawImage(mailBoxes[i],canvas.width - mailBoxes[i].width,laneSize * i);
			console.log(mailBoxes[i].x);
		}
		
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