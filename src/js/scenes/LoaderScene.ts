import WebFontFile from "../inputs/WebfontFile";
export default class LoaderScene extends Phaser.Scene {
  private musicMenu!: Phaser.Sound.BaseSound
  private musicLevel1!: Phaser.Sound.BaseSound
  private musicLevel2!: Phaser.Sound.BaseSound
  private musicLevel3!: Phaser.Sound.BaseSound
  private musicLevel4!: Phaser.Sound.BaseSound
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

  public preload() {
    //fonts
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)

    //platform
    this.load.image("ground", "../../assets/images/platform.png");

    //backgrounds
    this.load.image('backgroundLevel1', '../../assets/backgrounds/level1Background.jpg');
    this.load.image('backgroundLevel2', '../../assets/backgrounds/level2Background.jpg');
    this.load.image('backgroundLevel3', '../../assets/backgrounds/level3Background.jpg');
    this.load.image('backgroundLevel4', '../../assets/backgrounds/level4Background.jpeg');
    this.load.image('bg_menu', '../../assets/backgrounds/menuBackground.png');
    this.load.image('level1', '../../assets/images/level1.png')
    this.load.image('level2', '../../assets/images/level2.png')
    this.load.image('level3', '../../assets/images/level3.png')
    this.load.image('level4', '../../assets/images/level4.png')

    //characters
    this.load.spritesheet('junior', '../../assets/images/junior.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('sandy', '../../assets/images/sandy.png', { frameWidth: 32, frameHeight: 48 });
    this.load.image('sandySolo', '../../assets/images/sandySolo.png')
    this.load.image('juniorSolo', '../../assets/images/juniorSolo.png')

    //icons
    this.load.image('springIcon', '../../assets/images/springIcon.png');
    this.load.image('summerIcon', '../../assets/images/summerIcon.png');
    this.load.image('fallIcon', '../../assets/images/fallIcon.png');
    this.load.image('winterIcon', '../../assets/images/winterIcon.png');

    //buttons
    this.load.image('back', '../../assets/images/back.png')
    this.load.image('tutorialButton', '../../assets/images/button.png');
    this.load.image('startButton', '../../assets/images/button.png');
    this.load.image('scoreButton', '../../assets/images/button.png');
    this.load.image('creditsButton', '../../assets/images/button.png');

    //objects
    this.load.image('largeWhiteBox', '../../assets/images/largeWhiteBox.png')
    this.load.image('downTriangle', '../../assets/images/downTriangle.png')
    this.load.image('upTriangle', '../../assets/images/upTriangle.png')
    this.load.image('block', '../../assets/images/block.png')
    this.load.image('whiteBox', '../../assets/images/whiteBox.png')
    this.load.image('xVector', '../../assets/images/xVector.png')
    this.load.image('orangeBlock', '../../assets/images/orangeBlock.png')
    this.load.image('scoreBlock', '../../assets/images/scoreBlock.png');

    //logo
    this.load.image('logo', '../../assets/images/logo.png');

    //Titles
    this.load.image('titleTutorial', '../../assets/images/TUTORIAL.png')
    this.load.image('titleCharacter', '../../assets/images/PERSONAGEM.png')
    this.load.image('titleLevel', '../../assets/images/ESCOLHA A ESTAÇÃO.png')
    this.load.image('titleScore', '../../assets/images/PLACAR.png')
    this.load.image('titleCredits', '../../assets/images/CREDITOS.png')
    this.load.image('titleGameOver', '../../assets/images/GAME OVER.png')
    this.load.image('titleYourScore', '../../assets/images/SCORE.png')

    //musics
    this.load.audio('musicMenu', '../../assets/audio/musicMenu.mp3'); 
    this.load.audio('musicLevel1', '../../assets/audio/musicLevel1.mp3');
    this.load.audio('musicLevel2', '../../assets/audio/musicLevel2.mp3');
    this.load.audio('musicLevel3', '../../assets/audio/musicLevel3.mp3');
    this.load.audio('musicLevel4', '../../assets/audio/musicLevel4.mp3');

  }

  public create() {
    this.musicMenu = this.sound.add('musicMenu', this.config);
    this.musicLevel1 = this.sound.add('musicLevel1', this.config);
    this.musicLevel2 = this.sound.add('musicLevel2', this.config);
    this.musicLevel3 = this.sound.add('musicLevel3', this.config);
    this.musicLevel4 = this.sound.add('musicLevel4', this.config);

    this.add.image(400, 300, 'bg_menu');
    this.add.text(400, 320, `CARREGANDO...`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);


    this.time.addEvent({delay:2000, callback: this.startGame, callbackScope: this, loop: false});
  }

  startGame(){
    this.scene.start("MenuScene", {
      musicMenu: this.musicMenu,
      musicLevel1: this.musicLevel1,
      musicLevel2: this.musicLevel2,
      musicLevel3: this.musicLevel3,
      musicLevel4: this.musicLevel4
    });
  }
}
