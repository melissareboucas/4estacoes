import WebFontFile from "../inputs/WebfontFile";

export default class SelectCharacterScene extends Phaser.Scene {

    private leaderboard: any

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

    right: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;

    private selectedPlayerName: string

    private block!: Phaser.GameObjects.Image
    private blockPosition: number

    private sandy!: Phaser.GameObjects.Image
    private junior!: Phaser.GameObjects.Image

    private whiteBox!: Phaser.GameObjects.Image
    private xVector!: Phaser.GameObjects.Image
    private bottleText!: Phaser.GameObjects.Text

    private sandyDescription!: Phaser.GameObjects.Text
    private juniorDescription!: Phaser.GameObjects.Text

    constructor() {
        super({ key: "SelectCharacterScene" });
        this.blockPosition = 0;
        this.selectedPlayerName=null;

    }

    init(data) {
        this.leaderboard = data.leaderboard
      }

    public preload() {
        this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
        this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.png');
        this.load.image('sandySolo', '../../assets/images/sandySolo.png')
        this.load.image('juniorSolo', '../../assets/images/juniorSolo.png')
        this.load.image('block', '../../assets/images/block.png')
        this.load.image('back', '../../assets/images/back.png')
        this.load.image('titleCharacter', '../../assets/images/PERSONAGEM.png')
        this.load.image('whiteBox', '../../assets/images/whiteBox.png')
        this.load.image('xVector', '../../assets/images/xVector.png')

        //font
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts)


        //keys
        this.right = this.input.keyboard.addKey('RIGHT')
        this.left = this.input.keyboard.addKey('LEFT')
        this.enter = this.input.keyboard.addKey('ENTER')
    }

    public create() {
        this.blockPosition = 0;
        this.selectedPlayerName=null; 

        this.menuMusic = this.sound.add('menuMusic', this.config);
        this.menuMusic.play();

        this.add.image(400, 300, 'bgMenu');

        
        this.add.image(172, 79, 'titleCharacter').setOrigin(0)

        this.sandy = this.add.image(180, 340, 'sandySolo').setVisible(true)
        this.junior = this.add.image(620, 340, 'juniorSolo').setVisible(true)


        this.whiteBox = this.add.image(620, 340, 'whiteBox').setVisible(false)
        this.xVector = this.add.image(590, 450, 'xVector').setVisible(false)
        this.bottleText = this.add.text(610, 445, "SAIR", { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' }).setVisible(false);

        const boxWidth = 240; 
    
        const textStyle = {
            color: '#000', 
            wordWrap: { width: boxWidth - 20, useAdvancedWrap: true },
            align: 'center',
            fontFamily: '"Press Start 2P"' ,
            fontSize: '12px'
        };
    
        const textSandy = "Olá! Sou a Sandy! Sou uma cantora talentosa e estou pronta para encantar com minha voz incrível e habilidades musicais. Estou aqui para ajudar a equipe com minhas músicas cativantes, com muita motivação!";
        this.sandyDescription = this.add.text(520, 250, textSandy, textStyle).setVisible(false);
        
        const textJunior = "Olá! Sou o Junior! Sou um baterista apaixonado pela percussão e trago meu amor pela bateria e ritmos contagiantes para fazer parte da aventura. Estou aqui para estabelecer um ritmo constante para a equipe!"
        this.juniorDescription = this.add.text(80, 250, textJunior, textStyle).setVisible(false);
        
        this.sandy.setInteractive();
        this.sandy.on('pointerdown', function() {
            this.block.setX(180);
            this.blockPosition = 0;
            this.junior.setVisible(false);
            this.whiteBox.setVisible(true);
            this.whiteBox.setX(620)
            this.xVector.setVisible(true);
            this.xVector.setX(590)
            this.bottleText.setVisible(true);
            this.bottleText.setX(610)
            this.sandyDescription.setVisible(true)
            this.juniorDescription.setVisible(false)
        }, this);

        this.junior.setInteractive();
        this.junior.on('pointerdown', function() {
            this.block.setX(620);
            this.blockPosition = 1;
            this.sandy.setVisible(false);
            this.whiteBox.setVisible(true);
            this.whiteBox.setX(180)
            this.xVector.setVisible(true);
            this.xVector.setX(150)
            this.bottleText.setVisible(true);
            this.bottleText.setX(170)
            this.sandyDescription.setVisible(false)
            this.juniorDescription.setVisible(true)
        }, this);

        this.xVector.setInteractive();
        this.xVector.on('pointerdown', function() {
            this.sandy.setVisible(true);
            this.junior.setVisible(true);
            this.whiteBox.setVisible(false);
            this.xVector.setVisible(false);
            this.bottleText.setVisible(false);
            this.sandyDescription.setVisible(false);
            this.juniorDescription.setVisible(false);
        }, this);
        
        
        
        this.add.text(240, 520, "Clique para ver a descrição", { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' });
        this.add.text(220, 540, "Pressione Enter para selecionar", { fontFamily: '"Press Start 2P"' ,fontSize: '12px', color: '#000000' });

        this.block = this.add.image(180, 340, 'block')

         
        var backButton = this.add.image(50, 50, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function() {
            this.menuMusic.stop();
            this.scene.stop("SelectCharacterScene")
            this.scene.start('MenuScene')
        }, this);
       

    }

    public update() {
        
        if (this.right.isDown && this.blockPosition == 0)
        {
            this.block.setX(620);
            this.blockPosition = 1;
        }
        else if (this.left.isDown && this.blockPosition == 1) {
            this.block.setX(180);
            this.blockPosition = 0;

        }

        if (this.enter.isDown) {
            if (this.blockPosition == 0) {
                this.selectedPlayerName = 'sandy'
            } else {
                this.selectedPlayerName = 'junior'
            }
            this.menuMusic.stop();
            this.scene.stop("SelectCharacterScene")
            this.scene.start("SelectLevelScene", {playerName: this.selectedPlayerName, leaderboard: this.leaderboard});
        }
        
    }

}
