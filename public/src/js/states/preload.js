var preload = function (game){}

preload.prototype = {
	preload: function(){ 
		var loadingBar = this.add.sprite(game.world.centerX, game.world.centerY, 'loading');
		loadingBar.anchor.setTo(0.5);
		this.load.setPreloadSprite(loadingBar);
		this.game.load.image('puddingLogo', '/src/assets/gfx/other/puddi_logo.png');
		this.game.load.image('playBtn', '/src/assets/gfx/other/play_btn.png');
		this.game.load.image('groundTile', '/src/assets/gfx/tiles/ground.png');
		this.game.load.image('houses', '/src/assets/gfx/tiles/houses.png');
		this.game.load.image('player', '/src/assets/gfx/sprites/player.png');
		this.game.load.spritesheet('nyanCat', '/src/assets/gfx/sprites/nyan_cat.png', 100, 70);

		this.game.load.audio('nyanSong', '/src/assets/audio/nyan_cat_song.mp3');
		this.game.load.audio('pudiSong', '/src/assets/audio/pudi_puddi_song.mp3');
	},
	create: function(){
		this.game.state.start('GameTitle');
	}
}