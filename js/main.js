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
var correctFeedbackImages = [];
var wrongFeedBackImages = [];
var highlightCell = [];
var converyorImages = [];
var bg;
var isBgReady;
var EnemyCount = [];
var StartTime;
var gameDuration = 2;
var numberOfEnemiesToSpawn = 1;
var numberOfWaves = 15;
var waveCounter = 1;
var spawnDelay = 15;
var spawnTimer = 0;
var priorityHighlightBoxs = [];
var refreshIntervalId;

var priorityTask =
{
	priority : Math.floor((Math.random() * 4)),
	count : 0,
	maxValue : Math.floor((Math.random() * 3)+3),	
}


function collides(a, b)
{
	var isCollides = false;
	var temp = b.getPostionY();
	if(b.getPostionX() > (canvas.width - mailBoxes[a].width) && b.getPostionX() < canvas.width && b.getPostionY() == (a * laneSize))
	{
		isCollides = true;
	}
	
  return isCollides;
}

var player = 
{
	x : 100,
	y : 100,
	state : "walking",
	currentAnimationKey : 0,
	currentLane : 0,
	idleFrames : [],
	
	changeState :function (state)
	{
		this.state = state;
	},
	
	draw : function ()
	{	
		if( this.state == "walking" || this.state == "Pickup")
			this.playIdle();	
	},
	
	playIdle : function()
	{	
     	context.drawImage(this.idleFrames[this.currentAnimationKey], this.x, this.y);
		this.currentAnimationKey = (this.currentAnimationKey + 1) % this.idleFrames.length;
	}
}

function init()
{
	canvas = document.getElementById("myCanvas");
	var body = document.getElementById("body");
	
	canvas.width = 1900;
	canvas.height = 900;

    context = canvas.getContext("2d");
	body.appendChild(canvas);
	
   	var assests = ['art/mailMan/normal.png',
					'art/mailMan/holding.png',
					'art/mailMan/left.png',
					'art/mailMan/right.png',
					];
    
					
	maxImageSize = assests.length;
	
	for ( var i = 0; i < assests.length; i++ )
	{
		player.idleFrames.push(new Image());
		player.idleFrames[i].src = assests[i];
		player.idleFrames[i].onload = function ()
		{
			imageLoadCount++;
		}
	}
	
	var enemyAssets = ['art/trucks/bluetruck.png','art/trucks/greentruck.png','art/trucks/redtruck.png','art/trucks/pinktruck.png'];
	var wrongFeeback = ['art/trucks/noblue.png','art/trucks/nogreen.png','art/trucks/nored.png','art/trucks/nopink.png'];
	var correctFeedback =['art/trucks/yesblue.png','art/trucks/yesgreen.png','art/trucks/yesred.png','art/trucks/yespink.png'];
	var hightlightPath =['art/trucks/bluehighlight.png','art/trucks/greenhighlight.png','art/trucks/redhighlight.png','art/trucks/pinkhighlight.png'];
	
	for (var p = 0; p < 4 ; p++)
	{
		mailBoxes[p] = new Image();
		mailBoxes[p].src = enemyAssets[p];
		correctFeedbackImages[p] = new Image();
		correctFeedbackImages[p].src = correctFeedback[p];
		wrongFeedBackImages[p] = new Image();
		wrongFeedBackImages[p].src = wrongFeeback[p];
		priorityHighlightBoxs[p] = new Image();
		priorityHighlightBoxs[p].src = hightlightPath[p];
		mailBoxType[p] = p;
	}
	
	for(var j = 0;j < 4 ; j++)
	{
		laneEnemyCount[j] = 0;
	}
	
	bg = new Image();
	bg.src = 'art/bg.png';
	
	bg.onload = function()
	{
		isBgReady = true;
	}
	
	for (var i = 0 ; i < 4;i++)
	{
		EnemyCount[i] = 0;
	}
	
	for (var i = 0; i <  4 ; i++)
	{
		highlightCell[i] = 0;
	}
	
	refreshIntervalId = setInterval(update,frameRate);
}

$(document).bind("keydown.up", function()
{ 
	if(player.currentLane == 0)
	{
		return;
	}	
	else 
	{
		player.currentLane--;
		player.y -= laneSize;
	}
});

$(document).bind("keydown.space", function()
{ 
    if(player.state == "walking")
	{
		var index = laneEnemyCount[player.currentLane];
		if(laneOne[index].getPostionX() >= (canvas.width * 0.5) && laneOne[index].getPostionX() < 40000 && player.currentLane == 0 )
		{
			laneOne[index].setpostionX(player.x);
			laneOne[index].setState("PickedUp");
			
			laneEnemyCount[player.currentLane]++;
			pickedElement = laneOne[index];
			player.state = "Pickup";
		}
	
		else if(laneTwo[index].getPostionX() >= (canvas.width * 0.5) && laneTwo[index].getPostionX() < 40000 && player.currentLane == 1)
		{
			laneTwo[index].setpostionX(player.x);
			laneTwo[index].setState("PickedUp");
			
			laneEnemyCount[player.currentLane]++;
			pickedElement = laneTwo[index];
			player.state = "Pickup";
		}
	
		else if(laneThree [index].getPostionX() >= (canvas.width * 0.5) && laneThree[index].getPostionX() < 40000 && player.currentLane == 2)
		{
			laneThree[index].setpostionX(player.x);
			laneThree[index].setState("PickedUp");
			
			laneEnemyCount[player.currentLane]++;
			pickedElement = laneThree[index];
			player.state = "Pickup";
		}
		
		else if(laneFour[index].getPostionX() >= (canvas.width * 0.5) && laneFour[index].getPostionX() < 40000 && player.currentLane == 3)
		{
			laneFour[index].setpostionX(player.x);
			laneFour[index].setState("PickedUp");
			
			laneEnemyCount[player.currentLane]++;
			pickedElement = laneFour[index];
			player.state = "Pickup";
		}
	}
	else if(player.state = "Pickup")
	{
		pickedElement.setState("dropped");
		//pickedElement.setState("powerDropped");
		player.state = "walking";
	}
});

$(document).bind("keydown.down", function()
{ 
	if(player.currentLane == (numberOflanes - 1))
	{
		return;
	}
	else 
	{
		player.currentLane++;
		player.y += laneSize;
	}
});


var spawnEnemies = function()
{
	waveCounter++;
	if(waveCounter % numberOfWaves == 0 && numberOfEnemiesToSpawn < 6)
	{
		numberOfEnemiesToSpawn++;
	}
	
	for(var i  = 0; i < numberOfEnemiesToSpawn ; i++)
	{
		var index =  Math.floor((Math.random() * 4));
		EnemyCount[index]++;
	}
}

var updateLanes = function ()
{
	for(var i = 0;i < 100;i++)
	{	
	    var state =  laneOne[i].getState();
		if(i > 0 && laneOne[i].getPostionX() <= (laneOne[i-1].getPostionX() - 80) && EnemyCount[0] >= i )
		 	laneOne[i].update();
		else if(i == 0)
			laneOne[i].update();


		if(i > 0 && laneTwo[i].getPostionX() <= (laneTwo[i-1].getPostionX() - 80) && EnemyCount[1] >= i )
		 	laneTwo[i].update();
		else if(i == 0)
			laneTwo[i].update();
	
			if(i > 0 && laneThree[i].getPostionX() <= (laneThree[i-1].getPostionX() - 80)&& EnemyCount[2] >= i)
		 	laneThree[i].update();
		else if(i == 0)
			laneThree[i].update();
	
		if(i > 0 && laneFour[i].getPostionX() <= (laneFour[i-1].getPostionX() - 80) && EnemyCount[3] >= i)
		 	laneFour[i].update();
		else if(i == 0)
			laneFour[i].update();
	}	
	
	if(player.state == "Pickup" && pickedElement != null)
	{
		pickedElement.setpostionY(player.currentLane * laneSize +92);
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
				highlightCell[i] = 1;
				
				if(typeOfMailBox == priorityTask.priority)
				{	
					priorityTask.count++;
				}
				
				if(priorityTask.count >= priorityTask.maxValue)
				{
					
					score += 10;
					priorityTask.count = 0;
					priorityTask.priority = Math.floor((Math.random() * 4));
					priorityTask.maxValue = Math.floor((Math.random() * 3)+3)
				}
				pickedElement = null;
			}
			else if(collides(i,pickedElement))
			{
				score--;
				highlightCell[i] = -1;
				pickedElement = null;
			}
		}
	}
}

var initLanes = function()
{
	var positionY = player.y-16;
	for(var i = 0; i< 100 ;i++)
	{
		var xPosition = 400 * i * -1;
		var maxDisplacement = canvas.width * 0.5;
		var state = false;
		var type = Math.floor((Math.random() * 4));
		var maxWidth = canvas.width;
		 
		laneOne[i] = new Mail(type,xPosition,positionY,maxDisplacement,state,maxWidth);
		laneOne[i].init();
	}
	
	positionY += laneSize;
	for(var i = 0; i< 100 ;i++)
	{
		var xPosition = 400 * i * -1;
		var maxDisplacement = canvas.width * 0.5;
		var state = false;
		var type = Math.floor((Math.random() * 4));
		var maxWidth = canvas.width;
		 
		laneTwo[i] = new Mail(type,xPosition,positionY ,maxDisplacement,state,maxWidth);
		laneTwo[i].init();
	}
	
	positionY += laneSize;
	for(var i = 0; i< 100 ;i++)
	{
		var xPosition = 400 * i * -1;
		var maxDisplacement = canvas.width * 0.5;
		var state = false;
		var type = Math.floor((Math.random() * 4));
		var maxWidth = canvas.width;
		
		laneThree[i] = new Mail(type,xPosition,positionY,maxDisplacement,state,maxWidth);
		laneThree[i].init();
	}
	
	positionY += laneSize;
    for(var i = 0; i< 100 ;i++)
	{
		var xPosition = 400 * i * -1;
		var maxDisplacement = canvas.width * 0.5;
		var state = false;
		var type = Math.floor((Math.random() * 4));
		 var maxWidth = canvas.width;
		
		laneFour[i] = new Mail(type,xPosition,positionY,maxDisplacement,state,maxWidth);
		laneFour[i].init();
	}
	   
	for(var i = 0; i < 4;i++)
	{
	   converyorImages[i] = new Image();
	   converyorImages[i].src = "art/Conveyor.png";
	}  
} 

var getTimeDiffrence = function ()
{
	var date = new Date();
	var currentTime = (date.getTime()/1000) /60;
	var timeDiff = currentTime - StartTime;
	return timeDiff;
}

var checkForTime = function()
{
	var timeDiff = getTimeDiffrence();
	if(timeDiff >= gameDuration)
		return true;
	else
		return false;
}

var update = function()
{
	if(gameState == "init" && maxImageSize == imageLoadCount )
	 {
		 player.x = canvas.width * 0.55;
		 player.y = 2 * player.idleFrames[0].width+10;
		 laneSize = (canvas.height - 2* player.idleFrames[0].width)/numberOflanes;
		 initLanes();
		 var date = new Date();
		 StartTime = (date.getTime()/1000)/60;
		 gameState = "playing";
	 }
	
	spawnTimer++;
	checkForEnemyCollision();
	
    if(spawnTimer >= spawnDelay )	
	{
		spawnEnemies();
		spawnTimer = 0;
	}

	updateLanes();
	draw();
	if(checkForTime())
	{
		clearInterval(refreshIntervalId);
		gameState = "gameover";
	}		
}

var draw = function()
{ 
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(bg,0,0 ,canvas.width,canvas.height);
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
	
	for(var i = 0 ; i< 4 ; i++)
	{
	    if(highlightCell[i] == 0 )	
			context.drawImage(mailBoxes[i], canvas.width - mailBoxes[i].width, laneSize*i+80);
		else if(highlightCell[i] == 1)
			context.drawImage(correctFeedbackImages[i], canvas.width - mailBoxes[i].width, laneSize*i+80);
		else
			context.drawImage(wrongFeedBackImages[i], canvas.width - mailBoxes[i].width, laneSize*i+80);
	
        highlightCell[i] = 0;	
	}
	
	var offset = 67;
	if ( priorityTask.priority == 1 )
	{
		offset = 53;
	}
	else if ( priorityTask.priority == 2 )
	{
		offset = 53;
	}
	else if ( priorityTask.priority == 3 )
	{
		offset = 57;
	}
	
	context.drawImage(priorityHighlightBoxs[priorityTask.priority],canvas.width - priorityHighlightBoxs[priorityTask.priority].width + 22,laneSize * priorityTask.priority+offset);
	for(var i = 0 ; i< 4 ; i++)
	{
		var y = (laneSize * (i+1)) - (converyorImages[i].height * 0.50);
		context.drawImage(converyorImages[i],0, y, canvas.width*0.55, converyorImages[i].height);	
	}
		
	context.font = "30px Verdana"
	context.fillText(" Score:" + score,50, 35);
	var timeDiff = getTimeDiffrence();
	var timeLeft = gameDuration - timeDiff;
	
	if(timeLeft < 0)
		timeDiff = 0;
	
	context.fillText("Time:" + timeLeft.toFixed(2), canvas.width/2-120, 35);
	context.font = "15px Verdana"
	context.fillText(priorityTask.maxValue-priorityTask.count + " left", canvas.width-100, priorityTask.priority*laneSize + 200);	
}