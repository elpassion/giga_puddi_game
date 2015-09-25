var theGame = function(game) {
	paused = false;
	timeTotal = 0;
	score = 0;
	points = 0;
	inAirJumps = 0;
	playerInAir = true;
	timeToAirJump = 0;
	nyanSpawned = false;
	timeToSpawnNyan = 100;
}

theGame.prototype = {
	create: function() {
		this.setEngine();
		this.addGroundTiles();
		this.prepareNyan();
		this.addPlayer();
		cursors = game.input.keyboard.createCursorKeys();
		jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function() {
		if (paused == false) {
			playerInAir = true;
			this.checkCollisions();
			this.checkNyan();
			this.updateMoves();
			this.updateTickers();
		}
	},
	setEngine: function() {
		this.game.stage.backgroundColor = '#2577B9';
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 800;
		game.physics.arcade.setBoundsToWorld();
		
		pudiSong = this.game.add.audio('pudiSong');
		nyanSong = this.game.add.audio('nyanSong');
    	this.game.sound.setDecodedCallback([pudiSong, nyanSong], this.audioDecoded, this);
	},
	audioDecoded: function() {
		pudiSong.play();
		pudiSong.onStop.add(function () {
			pudiSong.play();
		}, this);
	},
	addGroundTiles: function() {
		ground = game.add.sprite(0, this.game.world.height - 32, 'groundTile');
		this.game.physics.enable(ground, Phaser.Physics.ARCADE);
		ground.width = this.game.world.width;
	    ground.body.immovable = true;
	    ground.body.allowGravity = false;
	    houses = game.add.group();
	    for (var i = 0; i < 3; i++) {
		    var house = game.add.sprite(0, this.game.world.height - 32, 'houses');
		    house.scale.setTo(0.4, 0.4);
		    house.anchor.setTo(0, 1);
		    house.x = house.width*i;
	    }
	},
	addPlayer: function() {
    	player = game.add.sprite(this.game.world.centerX, this.game.world.height-33, 'player');
    	player.anchor.setTo(0.5, 1);
    	player.scale.setTo(0.05);
    	this.game.physics.enable(player, Phaser.Physics.ARCADE);
    	player.body.bounce.y = 0.3;
    	player.body.collideWorldBounds = true;
	},
	checkCollisions: function() {
		game.physics.arcade.collide(player, ground, this.playerOnGround, null, this);
		game.physics.arcade.collide(player, nyanCat, this.playerHitNyan, null, this);
	},
	updateMoves: function() {
		player.body.velocity.x = 0;
		if (cursors.left.isDown) {
    		player.body.velocity.x = -150;
    	}
	    else if (cursors.right.isDown) {
	        player.body.velocity.x = 150;
	    }
	    if (jumpButton.isDown) {
	    	this.playerJump();
		}
	},
	updateTickers: function () {
		timeTotal++;
		if (nyanSpawned == false && timeToSpawnNyan == 0 && game.rnd.integerInRange(0, 500) == 10) {
			this.spawnNyan();
		}
		if (timeToAirJump > 0) {
			timeToAirJump--;
		}
		if (timeToSpawnNyan > 0) {
			timeToSpawnNyan--;
		}
	},
	playerOnGround: function(player, ground) {
		playerInAir = false;
		inAirJumps = 0;
		timeToAirJump = 0;
	},
	playerJump: function() {
		if (playerInAir == false) {
	        player.body.velocity.y -= 400;
        	timeToAirJump = 50;
	    }
    	else if (playerInAir == true && inAirJumps < 2 && timeToAirJump == 0) {
	   		player.body.velocity.y = -400;
        	timeToAirJump = 40;
	   		inAirJumps++;
	    }
	},
	prepareNyan: function() {
		nyanCat = game.add.sprite(-100, game.rnd.integerInRange(100, 200), 'nyanCat');
		nyanCat.animations.add('fly');
    	nyanCat.animations.play('fly', 12, true);
		this.game.physics.enable(nyanCat, Phaser.Physics.ARCADE);
	    nyanCat.body.allowGravity = false;
	    nyanCat.scale.setTo(0.4);
	},
	spawnNyan: function() {
		this.game.stage.backgroundColor = '#003366';
		nyanSpawned = true;
		nyanCat.body.velocity.x = 100;
		nyanCat.body.velocity.y = 100;
		pudiSong.volume = 0.1;
		nyanSong.play();
	},
	playerHitNyan: function(player, nyanCat) {
		this.hideNyan();
		console.log('Nyan captured!');
	},
	hideNyan: function() {
		this.game.stage.backgroundColor = '#2577B9';
		nyanSpawned = false;
		timeToSpawnNyan = 400;
		nyanSong.stop();
		pudiSong.volume = 1;
		nyanCat.body.velocity.x = 0;
		nyanCat.x = -100;
		nyanCat.y = game.rnd.integerInRange(100, 200);
		nyanCat.body.velocity.y = 0;
	},
	checkNyan: function () {
		if (timeTotal % 100 == 0) {
            nyanCat.body.velocity.y *= -1;
        }
		if (nyanCat.x > this.game.world.width) {
			this.hideNyan();
		}
	}
}