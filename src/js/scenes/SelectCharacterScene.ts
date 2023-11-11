import WebFontFile from "../inputs/WebfontFile";

export default class SelectCharacterScene extends Phaser.Scene {

    private leaderboard: any

    private musicMenu!: Phaser.Sound.BaseSound
    private musicLevel1: Phaser.Sound.BaseSound
    private musicLevel2!: Phaser.Sound.BaseSound
    private musicLevel3!: Phaser.Sound.BaseSound
    private musicLevel4!: Phaser.Sound.BaseSound
    private previewLevel1!: Phaser.Sound.BaseSound
    private previewLevel2!: Phaser.Sound.BaseSound
    private previewLevel3!: Phaser.Sound.BaseSound
    private previewLevel4!: Phaser.Sound.BaseSound
    private errorSFX!: Phaser.Sound.BaseSound

    right: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;
    esc: Phaser.Input.Keyboard.Key;


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
        this.selectedPlayerName = null;
    }

    init(data) {
        this.leaderboard = data.leaderboard
        this.musicMenu = data.musicMenu
        this.musicLevel1 = data.musicLevel1
        this.musicLevel2 = data.musicLevel2
        this.musicLevel3 = data.musicLevel3
        this.musicLevel4 = data.musicLevel4
        this.previewLevel1 = data.previewLevel1
        this.previewLevel2 = data.previewLevel2
        this.previewLevel3 = data.previewLevel3
        this.previewLevel4 = data.previewLevel4
        this.errorSFX = data.errorSFX
    }

    public preload() {
        //font
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts)

        //keys
        this.right = this.input.keyboard.addKey('RIGHT')
        this.left = this.input.keyboard.addKey('LEFT')
        this.down = this.input.keyboard.addKey('DOWN')
        this.up = this.input.keyboard.addKey('UP')
        this.enter = this.input.keyboard.addKey('ENTER')
        this.esc = this.input.keyboard.addKey('ESC')
    }

    public create() {
        this.blockPosition = 0;
        this.selectedPlayerName = null;

        this.musicMenu.play();

        this.add.image(400, 300, 'bg_menu');

        this.add.image(172, 79, 'titleCharacter').setOrigin(0)

        this.sandy = this.add.image(180, 340, 'sandySolo').setVisible(true)
        this.junior = this.add.image(620, 340, 'juniorSolo').setVisible(true)

        this.whiteBox = this.add.image(620, 340, 'whiteBox').setVisible(false)
        this.xVector = this.add.image(590, 450, 'xVector').setVisible(false)
        this.bottleText = this.add.text(610, 445, "SAIR", { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setVisible(false);

        const boxWidth = 240;

        const textStyle = {
            color: '#000',
            wordWrap: { width: boxWidth - 20, useAdvancedWrap: true },
            align: 'center',
            fontFamily: '"Press Start 2P"',
            fontSize: '12px'
        };

        const textSandy = "Olá! Sou a Sandy! Sou uma cantora talentosa e estou pronta para encantar com minha voz incrível e habilidades musicais. Estou aqui para ajudar a equipe com minhas músicas cativantes, com muita motivação!";
        this.sandyDescription = this.add.text(520, 250, textSandy, textStyle).setVisible(false);

        const textJunior = "Olá! Sou o Junior! Sou um baterista apaixonado pela percussão e trago meu amor pela bateria e ritmos contagiantes para fazer parte da aventura. Estou aqui para estabelecer um ritmo constante para a equipe!"
        this.juniorDescription = this.add.text(80, 250, textJunior, textStyle).setVisible(false);

        this.sandy.setInteractive();
        this.sandy.on('pointerdown', function () {
            this.handleSandyDescription();
        }, this);

        this.junior.setInteractive();
        this.junior.on('pointerdown', function () {
            this.handleJuniorDescription();
        }, this);

        this.xVector.setInteractive();
        this.xVector.on('pointerdown', function () {
            this.handleUpArrow();
        }, this);

        this.add.text(110, 520, "Clique (ou pressione down/up) para ver a descrição", { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' });
        this.add.text(220, 540, "Pressione Enter para selecionar", { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' });

        this.block = this.add.image(180, 340, 'block')

        var backButton = this.add.image(50, 50, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function () {
            this.handleBack();
        }, this);

    }

    public update() {
        this.checkGamepads();

        if (this.right.isDown && this.blockPosition == 0) {
            this.handleBlockPosition1();
        }
        else if (this.left.isDown && this.blockPosition == 1) {
            this.handleBlockPosition0();
        }

        if (this.down.isDown && this.blockPosition == 0) {
            this.handleSandyDescription();
        }
        else if (this.down.isDown && this.blockPosition == 1) {
            this.handleJuniorDescription();
        }

        if (this.up.isDown) {
            this.handleUpArrow();
        }

        if (this.enter.isDown) {
            this.handleEnter();
        }

        if (this.esc.isDown) {
            this.handleBack();
        }

    }

    public checkGamepads() {
        const gamepads = navigator.getGamepads();

        for (const gamepad of gamepads) {
            if (gamepad) {
                if (gamepad.buttons[1].pressed) {
                    this.handleBack();
                } else if (gamepad.buttons[14].pressed) {
                    //left
                    if (this.blockPosition == 1) {
                        this.handleBlockPosition0();
                    }
                } else if (gamepad.buttons[15].pressed) {
                    //right
                    if (this.blockPosition == 0) {
                        this.handleBlockPosition1();
                    }
                } else if (gamepad.buttons[13].pressed) {
                    //down
                    if (this.blockPosition == 0) {
                        this.handleSandyDescription();
                    }
                    else if (this.blockPosition == 1) {
                        this.handleJuniorDescription();
                    }
                } else if (gamepad.buttons[12].pressed) {
                    //up
                    this.handleUpArrow();
                } else if (gamepad.buttons[0].pressed) {
                    //x (enter)
                    this.time.addEvent({ delay: 200, callback: this.handleEnter, callbackScope: this, loop: false });
                }
            }
        }
    }

    public handleEnter() {
        if (this.blockPosition == 0) {
            this.selectedPlayerName = 'sandy'
        } else {
            this.selectedPlayerName = 'junior'
        }
        this.musicMenu.stop();
        this.scene.stop("SelectCharacterScene")
        this.scene.start("SelectLevelScene", {
            playerName: this.selectedPlayerName,
            leaderboard: this.leaderboard,
            musicMenu: this.musicMenu,
            musicLevel1: this.musicLevel1,
            musicLevel2: this.musicLevel2,
            musicLevel3: this.musicLevel3,
            musicLevel4: this.musicLevel4,
            previewLevel1: this.previewLevel1,
            previewLevel2: this.previewLevel2,
            previewLevel3: this.previewLevel3,
            previewLevel4: this.previewLevel4,
            errorSFX: this.errorSFX
        });
    }

    public handleBack(){
        this.musicMenu.stop();
        this.scene.stop("SelectCharacterScene")
        this.scene.start('MenuScene')
    }

    public handleSandyDescription(){
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
    }

    public handleJuniorDescription(){
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
    }

    public handleUpArrow(){
        this.sandy.setVisible(true);
        this.junior.setVisible(true);
        this.whiteBox.setVisible(false);
        this.xVector.setVisible(false);
        this.bottleText.setVisible(false);
        this.sandyDescription.setVisible(false);
        this.juniorDescription.setVisible(false);
    }

    public handleBlockPosition0(){
        this.block.setX(180);
        this.blockPosition = 0;
    }

    public handleBlockPosition1(){
        this.block.setX(620);
        this.blockPosition = 1;
    }

}
