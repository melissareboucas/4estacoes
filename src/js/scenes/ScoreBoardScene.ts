import WebFontFile from "../inputs/WebfontFile";

export default class ScoreBoardScene extends Phaser.Scene {

  private menuMusic!: Phaser.Sound.BaseSound
  /**
  * A config object used to store default sound settings' values.
  * Default values will be set by properties' setters.
  *
  * @name Phaser.Sound.BaseSound#config
  * @type {Phaser.Types.Sound.SoundConfig}
  * @private
  * @since 3.0.0
  */
  config = {
    loop: false,
  };

  constructor() {
    super({ key: "ScoreBoardScene" });

  }

  public preload() {
    this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
    this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.png');
    this.load.image('back', '../../assets/images/back.png')
    this.load.image('titleScore', '../../assets/images/PLACAR.png')
    this.load.image('logo', '../../assets/images/logo.png');

    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)
  }

  public create() {
    this.menuMusic = this.sound.add('menuMusic', this.config);
    this.menuMusic.play();

    this.add.image(400, 300, 'bgMenu');
    this.add.image(400,150, 'logo')


    this.add.image(260, 200, 'titleScore').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start('MenuScene')
    }, this);

    this.add.text(100, 280, 'NOME',  { fontFamily: '"Press Start 2P"' ,fontSize: '24px', color: '#000000' })
    this.add.text(330, 280, 'SCORE',  { fontFamily: '"Press Start 2P"' ,fontSize: '24px', color: '#000000' })
    this.add.text(560, 280, 'FASE',  { fontFamily: '"Press Start 2P"' ,fontSize: '24px', color: '#000000' })

    //Valores mocados
    this.add.text(100, 350, '1. ABC',  { fontFamily: '"Press Start 2P"' ,fontSize: '16px', color: '#000000' })
    this.add.text(330, 350, '1330',  { fontFamily: '"Press Start 2P"' ,fontSize: '16px', color: '#000000' })
    this.add.text(560, 350, 'PRIMAVERA',  { fontFamily: '"Press Start 2P"' ,fontSize: '16px', color: '#000000' })



  }

  public update() {

  }

}