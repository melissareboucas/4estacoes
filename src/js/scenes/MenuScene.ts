import WebFontFile from "../inputs/WebfontFile";
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components'


export default class MenuScene extends Phaser.Scene {

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

    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;

    private selectionBox!: Phaser.GameObjects.Image

    private blockPosition: number


    constructor() {
        super({ key: "MenuScene" });
        this.blockPosition = 1;
    }

    init(data) {
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
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts)

        //keys
        this.up = this.input.keyboard.addKey('UP')
        this.down = this.input.keyboard.addKey('DOWN')
        this.enter = this.input.keyboard.addKey('ENTER')
    }

    public create() {

        this.blockPosition = 1;

        this.musicLevel1.stop();
        this.musicLevel2.stop();
        this.musicLevel3.stop();
        this.musicLevel4.stop();

        this.leaderboard = new LeaderBoard({
            root: 'leaderboard'
        })

        this.musicMenu.play();

        this.add.image(400, 300, 'bg_menu');
        this.add.image(400, 220, 'logo')

        this.selectionBox = this.add.image(400, 320, 'selectionBox').setDepth(1)

        var tutorialButton = this.add.image(400, 320, 'tutorialButton');
        this.add.text(400, 320, `TUTORIAL`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        tutorialButton.setInteractive();
        tutorialButton.on('pointerdown', function () {
            this.handleTutorial();
        }, this);

        var startButton = this.add.image(400, 385, 'startButton');
        this.add.text(400, 385, `INICIAR`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', function () {
            this.handleStart();
        }, this);

        var scoreButton = this.add.image(400, 450, 'scoreButton');
        this.add.text(400, 450, `PLACAR`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        scoreButton.setInteractive();
        scoreButton.on('pointerdown', function () {
            this.handleScoreBoard();
        }, this);

        //acento agudo
        this.add.text(383, 510, `´`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5).setDepth(1)
        var creditsButton = this.add.image(400, 515, 'creditsButton');
        this.add.text(400, 515, `CREDITOS`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', function () {
            this.handleCredits();
        }, this);

        this.add.text(580, 570, `Developed by Melissa`, { fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#000000' });

    }

    public update() {
        this.checkGamepads();

        if (this.down.isDown && this.blockPosition == 4) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition1, callbackScope: this, loop: false });
        }
        else if (this.down.isDown && this.blockPosition == 3) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition4, callbackScope: this, loop: false });
        }
        else if (this.down.isDown && this.blockPosition == 2) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition3, callbackScope: this, loop: false });
        }
        else if (this.down.isDown && this.blockPosition == 1) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition2, callbackScope: this, loop: false });
        }
        else if (this.up.isDown && this.blockPosition == 1) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition4, callbackScope: this, loop: false });
        }
        else if (this.up.isDown && this.blockPosition == 2) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition1, callbackScope: this, loop: false });
        }
        else if (this.up.isDown && this.blockPosition == 3) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition2, callbackScope: this, loop: false });
        }
        else if (this.up.isDown && this.blockPosition == 4) {
            this.time.addEvent({ delay: 200, callback: this.setBlockPosition3, callbackScope: this, loop: false });
        }


        if (this.enter.isDown) {
            this.handleEnter();
        }

    }

    public setBlockPosition1() {
        this.selectionBox.setY(320);
        this.blockPosition = 1;
    }

    public setBlockPosition2() {
        this.selectionBox.setY(385);
        this.blockPosition = 2;
    }

    public setBlockPosition3() {
        this.selectionBox.setY(450);
        this.blockPosition = 3;
    }

    public setBlockPosition4() {
        this.selectionBox.setY(515);
        this.blockPosition = 4;
    }

    public checkGamepads() {
        const gamepads = navigator.getGamepads();

        for (const gamepad of gamepads) {
            if (gamepad) {
                if (gamepad.buttons[0].pressed) {
                    this.time.addEvent({ delay: 200, callback: this.handleEnter, callbackScope: this, loop: false });
                } else if (gamepad.buttons[13].pressed) {
                    if (this.blockPosition == 4) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition1, callbackScope: this, loop: false });
                    }
                    else if (this.blockPosition == 3) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition4, callbackScope: this, loop: false });
                    }
                    else if (this.blockPosition == 2) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition3, callbackScope: this, loop: false });
                    }
                    else if (this.blockPosition == 1) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition2, callbackScope: this, loop: false });
                    }
                } else if (gamepad.buttons[12].pressed) {
                    if (this.blockPosition == 1) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition4, callbackScope: this, loop: false });
                    }
                    else if (this.blockPosition == 2) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition1, callbackScope: this, loop: false });
                    }
                    else if (this.blockPosition == 3) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition2, callbackScope: this, loop: false });
                    }
                    else if (this.blockPosition == 4) {
                        this.time.addEvent({ delay: 200, callback: this.setBlockPosition3, callbackScope: this, loop: false });
                    }
                }
            }
        }
    }

    public handleEnter() {
        if (this.blockPosition == 1) {
            this.handleTutorial();
        }
        else if (this.blockPosition == 2) {
            this.handleStart();
        }
        else if (this.blockPosition == 3) {
            this.handleScoreBoard();
        }
        else if (this.blockPosition == 4) {
            this.handleCredits();
        }
    }

    public handleTutorial(){
        this.musicMenu.stop();
        this.blockPosition = 1
        this.scene.start('TutorialScene', {
            musicMenu: this.musicMenu
        })
    }

    public handleStart(){
        this.musicMenu.stop();
        this.blockPosition = 1
        this.scene.stop("MenuScene")
        this.scene.start('SelectCharacterScene', {
            musicMenu: this.musicMenu,
            leaderboard: this.leaderboard,
            musicLevel1: this.musicLevel1,
            musicLevel2: this.musicLevel2,
            musicLevel3: this.musicLevel3,
            musicLevel4: this.musicLevel4,
            previewLevel1: this.previewLevel1,
            previewLevel2: this.previewLevel2,
            previewLevel3: this.previewLevel3,
            previewLevel4: this.previewLevel4,
            errorSFX: this.errorSFX
        })
    }

    public handleScoreBoard(){
        this.musicMenu.stop();
        this.blockPosition = 1
        this.scene.start('ScoreBoardScene', {
            leaderboard: this.leaderboard,
            musicMenu: this.musicMenu
        })
    }

    public handleCredits(){
        this.musicMenu.stop();
        this.blockPosition = 1
        this.scene.start('CreditsScene', {
            musicMenu: this.musicMenu
        })
    }
}
