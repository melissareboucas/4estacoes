import WebFontFile from "../inputs/WebfontFile";

export default class MenuScene extends Phaser.Scene {


    private musicMenu!: Phaser.Sound.BaseSound 
    
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
        loop: true,
    };

    constructor() {
        super({ key: "MenuScene"});
      }

    public preload() {
        this.load.audio('musicMenu', '../../assets/audio/musicMenu.mp3');
        this.load.image('bg_menu', '../../assets/backgrounds/menuBackground.png');
        this.load.image('tutorialButton', '../../assets/images/button.png');
        this.load.image('startButton', '../../assets/images/button.png');
        this.load.image('scoreButton', '../../assets/images/button.png');
        this.load.image('creditsButton', '../../assets/images/button.png');
        this.load.image('logo', '../../assets/images/logo.png');

        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts)
    }
  
    public create() {

        this.musicMenu =  this.sound.add('musicMenu', this.config);
        this.musicMenu.play();

        this.add.image(400, 300, 'bg_menu');
        this.add.image(400,220, 'logo')

        var tutorialButton = this.add.image(400, 320, 'tutorialButton');
        this.add.text(400, 320, `TUTORIAL`, { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        tutorialButton.setInteractive();
        tutorialButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('TutorialScene')
        }, this);

        var startButton = this.add.image(400, 385, 'startButton');
        this.add.text(400, 385, `INICIAR`, { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('SelectCharacterScene')
        }, this);

        var scoreButton = this.add.image(400, 450, 'scoreButton');
        this.add.text(400, 450, `PLACAR`, { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        scoreButton.setInteractive();
        scoreButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('ScoreBoardScene')
        }, this);
    
        var creditsButton = this.add.image(400, 515, 'creditsButton');
        this.add.text(400, 515, `CREDITOS`, { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('CreditsScene')
        }, this);
        
        this.add.text(580, 570, `Developed by Melissa`, { fontFamily: '"Press Start 2P"' ,fontSize: '10px', color: '#000000' });

    }

  }
  