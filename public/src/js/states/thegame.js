var theGame = function (game){
	paused = false;
	timeTotal = 0;
	score = 0;
	points = 0;
	inAirJumps = 0;
	playerInAir = true;
	timeToAirJump = 0;
}

theGame.prototype = {
	create: function()
	{
		this.setEngine();
		this.addGroundTiles();
		this.addPlayer();
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function()
	{
		if (paused == false)
		{
			playerInAir = true;
			this.checkCollisions();
			this.updateMoves();
			timeTotal++;
			if (timeToAirJump > 0)
			{
				timeToAirJump--;
			}
		}
	},
	setEngine: function()
	{
		this.game.stage.backgroundColor = '#2577B9';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 800;
		game.physics.arcade.setBoundsToWorld();
	},
	addGroundTiles: function()
	{
		ground = game.add.sprite(0, this.game.world.height - 32, 'groundTile');
		this.game.physics.enable(ground, Phaser.Physics.ARCADE);
		ground.width = this.game.world.width;
	    ground.body.immovable = true;
	    ground.body.allowGravity = false;
	    houses = game.add.group();
	    for (var i = 0; i < 3; i++)
	    {
		    var house = game.add.sprite(0, this.game.world.height - 32, 'houses');
		    house.scale.setTo(0.4, 0.4);
		    house.anchor.setTo(0, 1);
		    house.x = house.width*i;
	    }
	},
	addPlayer: function()
	{
    	player = game.add.sprite(100, 100, 'player');
    	player.anchor.setTo(0.5, 1);
    	player.scale.setTo(0.05);
    	this.game.physics.enable(player, Phaser.Physics.ARCADE);
    	player.body.bounce.y = 0.3;
    	player.body.collideWorldBounds = true;
	},
	checkCollisions: function()
	{
		game.physics.arcade.collide(player, ground, this.playerOnGround, null, this);
	},
	updateMoves: function()
	{
		player.body.velocity.x = 0;
		if (cursors.left.isDown)
		{
    		player.body.velocity.x = -150;
    	}
	    else if (cursors.right.isDown)
	    {
	        player.body.velocity.x = 150;
	    }
	    if (jumpButton.isDown)
	    {
	    	this.playerJump();
		}
	},
	playerOnGround: function(player, ground)
	{
		playerInAir = false;
		inAirJumps = 0;
		timeToAirJump = 0;
	},
	playerJump: function()
	{
		if(playerInAir == false)
	    {
	        player.body.velocity.y -= 400;
        	timeToAirJump = 50;
	    }
    	else if(playerInAir == true && inAirJumps < 3 && timeToAirJump == 0)
	    {
	   		player.body.velocity.y = -400;
        	timeToAirJump = 50;
	   		inAirJumps++;
	    }
	}
}