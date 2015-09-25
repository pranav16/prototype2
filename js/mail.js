
	function Mail(typeOfMail,posX,posY,maxDisplacement,isready)
	{
		this.type = typeOfMail;
		this.x = posX;
		this.y = posY;
		this.maxDisplacement = maxDisplacement;
		this.image ;
		this.enemyAssets = ['art/Enemies/blue.png','art/Enemies/green.png','art/Enemies/red.png'];
        this.isActive = isready;	
		this.isReady = isready;
		
		this.getType = function(){
			return this.type;
		} 
		this.getPostionX = function()
		{
			return this.x;
		}
		this.getPostionY = function()
		{
			return this.y;
		}
	    
		this.setpostion = function(xcordinate)
		{
			this.x = xcordinate;
		}
		
		this.setIsActive= function(value)
		{
			this.isActive = value;
		}
		this.getisActive = function()
		{
			return this.isActive;
		}
		
		this.getImage = function()
		{
			return this.image;
		}
		
	this.init = function()
	{
		     this.image = new Image();
			 this.image.src = this.enemyAssets[this.type];
			 this.ready = false;
			 this.isActive = false;
			 this.image.onload = function(){
			 this.isReady = true;
	}
	}
	this.getImageSize = function()
	{
		return this.image.width;
	}
	
	this.draw = function(context)
	{
			//if(this.isReady)
			context.drawImage(this.image,this.x,this.y);
	}
	
	this.update = function()
	{
		
        if(this.x >= this.maxDisplacement)
		{
			this.x = this.maxDisplacement;
			this.isActive = true;
			
		}
		else
		{
			 this.x += 20;	
		}
     	
		
	}
	
	}

	
	