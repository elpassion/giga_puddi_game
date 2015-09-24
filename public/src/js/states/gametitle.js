var gameTitle = function (game) {}

gameTitle.prototype = {
  	create: function(){
		var puddingLogo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'puddingLogo');
		puddingLogo.anchor.setTo(0.5);
		logoTween = game.add.tween(puddingLogo).to({ y: puddingLogo.height * 0.6 }, 700, Phaser.Easing.Back.InOut, true);
		logoTween.onComplete.add(this.addPlayBtn, this);
	},
	addPlayBtn: function (){
		var playButton = this.game.add.button(this.game.world.centerX, this.game.world.height - 130, 'playBtn', this.playTheGame, this);
		playButton.anchor.setTo(0.5);
	},
	playTheGame: function(){
		console.log('Start game here');
	}
}