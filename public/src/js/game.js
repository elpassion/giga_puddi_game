const defSixeX = 1024;
const defSixeY = 512;

var game = new Phaser.Game(defSixeX, defSixeY, Phaser.AUTO, 'game');
game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('GameTitle', gameTitle);
game.state.start('Boot');

// function setLogoStage(){
// 	game.stage.backgroundColor = '#FFFFFF';
// 	var puddiLogoSprite = game.add.sprite(game.world.centerX, game.world.centerY, 'puddiLogo');
// 	puddiLogoSprite.anchor.set(0.5);
// 	game.add.tween(puddiLogoSprite).to({ y: puddiLogoSprite.height * 0.6 }, 700, Phaser.Easing.Back.InOut, true);
// }