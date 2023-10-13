import WebFontFile from "../inputs/WebfontFile";


export default class CreditsScene extends Phaser.Scene {

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
    super({ key: "CreditsScene" });

  }

  public preload() {
    this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
    this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.png');
    this.load.image('back', '../../assets/images/back.png')
    this.load.image('titleCredits', '../../assets/images/CREDITOS.png')

    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)
  }

  public create() {
    this.menuMusic = this.sound.add('menuMusic', this.config);
    this.menuMusic.play();

    this.add.image(400, 300, 'bgMenu');


    this.add.image(220, 80, 'titleCredits').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start('MenuScene')
    }, this);

  }

  public update() {

  }

}
