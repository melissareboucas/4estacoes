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
        this.load.image('bg_menu', '../../assets/backgrounds/menuBackground.jpg');
        this.load.image('startButton', '../../assets/images/startButton.png');
        this.load.image('levelButton', '../../assets/images/levelButton.png');
        this.load.image('characterButton', '../../assets/images/characterButton.png');
        this.load.image('scoreCardButton', '../../assets/images/scoreCardButton.png');
        this.load.image('creditsButton', '../../assets/images/creditsButton.png');
        this.load.image('logo', '../../assets/images/logo.png');
    }
  
    public create() {

        this.musicMenu =  this.sound.add('musicMenu', this.config);
        this.musicMenu.play();

        this.add.image(400, 300, 'bg_menu').setScale(0.3);
        this.add.image(400,250, 'logo').setScale(0.3)

        var tutorialButton = this.add.image(400, 375, 'levelButton').setScale(0.9);
        this.add.text(400, 375, `Tutorial`, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
        tutorialButton.setInteractive();
        tutorialButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('TutorialScene')
        }, this);

        var startButton = this.add.image(400, 420, 'startButton').setScale(0.9);
        this.add.text(400, 420, `Iniciar`, { fontSize: '32px', color: '#fff' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('SelectCharacterScene')
        }, this);
    
        var scoreBoardButton = this.add.image(400, 465, 'scoreCardButton').setScale(0.9);
        this.add.text(400, 465, `Placar Geral`, { fontSize: '24px', color: '#fff' }).setOrigin(0.5);
        scoreBoardButton.setInteractive();
        scoreBoardButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('ScoreBoardScene')
        }, this);

        var creditsButton = this.add.image(400, 510, 'creditsButton').setScale(0.9);
        this.add.text(400, 510, `Créditos`, { fontSize: '22px', color: '#fff' }).setOrigin(0.5);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', function() {
            this.musicMenu.stop();
            this.scene.start('CreditsScene')
        }, this);


    }

  }
  