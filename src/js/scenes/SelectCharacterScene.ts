export default class SelectCharacterScene extends Phaser.Scene {

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

    private selectedPlayerName: string

    private block!: Phaser.GameObjects.Image
    private blockPosition: number

    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;

    private textBallonUp!: Phaser.GameObjects.Image
    private textBallonDown!: Phaser.GameObjects.Image

    private sandyDescription!: Phaser.GameObjects.Text
    private juniorDescription!: Phaser.GameObjects.Text

    constructor() {
        super({ key: "SelectCharacterScene"});
        this.blockPosition = 0;

      }

    public preload() {
        this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
        this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.jpg');
        this.load.spritesheet('junior', '../../assets/images/junior.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('sandy', '../../assets/images/sandy.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('block', '../../assets/images/block.png')
        this.load.image('textBallonUp', '../../assets/images/textBallonUp.png')
        this.load.image('textBallonDown', '../../assets/images/textBallonDown.png')
        this.load.image('orangeBox', "../../assets/images/orangeBox.jpg")
        this.load.image('backButton', '../../assets/images/red_sliderLeft.png');

        this.load.bitmapFont('arcade', '../../assets/fonts/arcade.png', '../../assets/fonts/arcade.xml');

        //keys
        this.down = this.input.keyboard.addKey('DOWN')
        this.up = this.input.keyboard.addKey('UP')
        this.enter = this.input.keyboard.addKey('ENTER')
    }
  
    public create() {
        this.menuMusic = this.sound.add('menuMusic', this.config);
        this.menuMusic.play();

        this.add.image(400, 300, 'bgMenu').setScale(0.3);
        
        this.add.image(250, 250, 'sandy').setScale(2)
        this.add.image(250, 450, 'junior').setScale(2)
        this.block = this.add.image(250, 250, 'block').setScale(3)

        this.textBallonUp = this.add.image(475, 300, 'textBallonUp').setVisible(true)
        this.textBallonDown = this.add.image(475, 330, 'textBallonDown').setVisible(false)

        const boxWidth = 195; 
    
        const textStyle = {
            color: '#000', // black text color
            wordWrap: { width: boxWidth - 20, useAdvancedWrap: true }
        };
    
        const textSandy = "Olá! Sou a Sandy! Sou uma cantora talentosa e estou pronta para encantar com minha voz incrível e habilidades musicais. Estou aqui para ajudar a equipe com minhas músicas cativantes, com muita motivação!";
        this.sandyDescription = this.add.text(410, 200, textSandy, textStyle);
        this.sandyDescription.setVisible(true);

        const textJunior = "Olá! Sou o Junior! Sou um baterista apaixonado pela percussão e trago meu amor pela bateria e ritmos contagiantes para fazer parte da aventura. Estou aqui para estabelecer um ritmo constante para a equipe!"
        this.juniorDescription = this.add.text(400, 180, textJunior, textStyle);
        this.juniorDescription.setVisible(false);

        this.add.image(-10, 40, 'orangeBox').setOrigin(0).setScale(0.25, 0.15)
        this.add.bitmapText(30, 50, 'arcade', 'Selecione seu personagem', 30).setTint(0x000000).setOrigin(0)

        var backButton = this.add.image(20, 130, 'backButton').setScale(0.9);
        backButton.setInteractive();
        backButton.on('pointerdown', function() {
            this.menuMusic.stop();
            this.scene.start('MenuScene')
        }, this);
       
        
    }

    public update(){
        if (this.down.isDown && this.blockPosition == 0)
        {
            this.block.setY(450);
            this.blockPosition = 1;
            this.textBallonUp.setVisible(false);
            this.textBallonDown.setVisible(true);
            this.sandyDescription.setVisible(false);
            this.juniorDescription.setVisible(true);
        }
        else if (this.up.isDown && this.blockPosition == 1) {
            this.block.setY(250);
            this.blockPosition = 0;
            this.textBallonUp.setVisible(true);
            this.textBallonDown.setVisible(false);
            this.sandyDescription.setVisible(true);
            this.juniorDescription.setVisible(false);
        }
//
        if (this.enter.isDown) {
            if (this.blockPosition == 0) {
                this.selectedPlayerName = 'sandy'
            } else {
                this.selectedPlayerName = 'junior'
            }
            this.menuMusic.stop();
            this.scene.start("SelectLevelScene", {playerName: this.selectedPlayerName});
        }
    }

  }
  