
	
	function Mail(typeOfMail,posX,posY,maxDisplacement,isready,maxWidth)
	{
		this.type = typeOfMail;
		this.x = posX;
		this.y = posY;
		this.maxDisplacement = maxDisplacement;
		this.image ;
		this.enemyAssets = ['art/Enemies/blue.png','art/Enemies/green.png','art/Enemies/red.png','art/Enemies/pink.png'];
        this.isActive = isready;
		this.maxWidth = maxWidth;
		
		
		
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
		this.setpostionY = function(ycordinate)
		{
			this.y = ycordinate;
		}
		
		this.setIsActive= function(value)
		{
			this.isActive = value;
		}
		this.getisActive = function()
		{
			return this.isActive;
		}
		this.setState = function(state)
		{
			this.state = state;
		}
		this.getState = function()
		{
			return this.state;
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
			 this.state = "Ready";
			 
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
		if(this.state == "PickedUp" )
			return;
		
		if(this.state == "dead")
		{
			this.x += 50;
			return;
		}
		
		if(this.state == "dropped" && this.x <= (this.maxWidth + 100))
		{
			this.x += 180;
			return;
		}
		else if(this.state == "dropped")
		{
			this.state = "dead";
			
			return;
		}
		
		
        if(this.x >= this.maxDisplacement && this.x < 40000  )
		{
			this.x = this.maxDisplacement;
			this.isActive = true;
			this.state = "atmax";
		}
		else 
		{
			 this.x += 50;	
		}
     	
		
	}
	
	}

	
	