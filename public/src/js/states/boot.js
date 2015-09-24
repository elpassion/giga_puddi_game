var boot = function(game){}

boot.prototype = {
	preload: function(){
		game.load.image('loading', '/src/assets/gfx/other/loading.png');
	},
  	create: function(){
  		game.stage.backgroundColor = '#FFFFFF';
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.pageAlignHorizontally = true;
		this.scale.updateLayout();
		this.game.state.start('Preload');
	}
}