const defSixeX = 1024;
const defSixeY = 512;

var game = new Phaser.Game(defSixeX, defSixeY, Phaser.AUTO, 'game');
game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('GameTitle', gameTitle);
game.state.add('TheGame', theGame);
game.state.start('Boot');