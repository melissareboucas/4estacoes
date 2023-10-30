import WebFontFile from "../inputs/WebfontFile";
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components'


declare const firebase: any
var firebaseConfig = {
  apiKey: process.env.API_KEY as string,
  authDomain: process.env.AUTH_DOMAIN as string,
  projectId: process.env.PROJECT_ID as string,
  storageBucket: process.env.STORAGE_BUCKET as string,
  messagingSenderId: process.env.MESSAGING_SENDER_ID as string,
  appId: process.env.APP_ID as string
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
export {firebase}

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
        console.log("projectId: ",process.env.PROJECT_ID)

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
            this.musicMenu.stop();
            this.scene.start('TutorialScene', {
                musicMenu: this.musicMenu
            })
        }, this);

        var startButton = this.add.image(400, 385, 'startButton');
        this.add.text(400, 385, `INICIAR`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', function () {
            this.musicMenu.stop();
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
        }, this);

        var scoreButton = this.add.image(400, 450, 'scoreButton');
        this.add.text(400, 450, `PLACAR`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        scoreButton.setInteractive();
        scoreButton.on('pointerdown', function () {
            this.musicMenu.stop();
            this.scene.start('ScoreBoardScene', {
                leaderboard: this.leaderboard,
                musicMenu: this.musicMenu
            })
        }, this);

        var creditsButton = this.add.image(400, 515, 'creditsButton');
        this.add.text(400, 515, `CREDITOS`, { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' }).setOrigin(0.5);
        creditsButton.setInteractive();
        creditsButton.on('pointerdown', function () {
            this.musicMenu.stop();
            this.scene.start('CreditsScene', {
                musicMenu: this.musicMenu
            })
        }, this);

        this.add.text(580, 570, `Developed by Melissa`, { fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#000000' });

    }

    public update() {
        
        
        if (this.down.isDown && this.blockPosition == 4) {
            this.selectionBox.setY(320);
            this.time.addEvent({delay:500, callback: this.setBlockPosition1, callbackScope: this, loop: false});
            this.blockPosition = 1;
        }
        else if (this.down.isDown && this.blockPosition == 3) {
            this.selectionBox.setY(515);
            this.time.addEvent({delay:500, callback: this.setBlockPosition4, callbackScope: this, loop: false});
            this.blockPosition = 4;
        }
        else if (this.down.isDown && this.blockPosition == 2) {
            this.selectionBox.setY(450);
            this.time.addEvent({delay:500, callback: this.setBlockPosition3, callbackScope: this, loop: false});

        }
        else if (this.down.isDown && this.blockPosition == 1) {
            this.selectionBox.setY(385);
            this.time.addEvent({delay:500, callback: this.setBlockPosition2, callbackScope: this, loop: false});

        } 
        else if (this.up.isDown && this.blockPosition == 1) {
            this.selectionBox.setY(515);
            this.time.addEvent({delay:500, callback: this.setBlockPosition4, callbackScope: this, loop: false});

        }
        else if (this.up.isDown && this.blockPosition == 2) {
            this.selectionBox.setY(320);
            this.time.addEvent({delay:500, callback: this.setBlockPosition1, callbackScope: this, loop: false});

        }
        else if (this.up.isDown && this.blockPosition == 3) {
            this.selectionBox.setY(385);
            this.time.addEvent({delay:500, callback: this.setBlockPosition2, callbackScope: this, loop: false});

        }
        else if (this.up.isDown && this.blockPosition == 4) {
            this.selectionBox.setY(450);
            this.time.addEvent({delay:500, callback: this.setBlockPosition3, callbackScope: this, loop: false});

        }
        

        if (this.enter.isDown) {
            if (this.blockPosition == 1) {
                this.musicMenu.stop();
                this.blockPosition = 1
                this.scene.start('TutorialScene', {
                    musicMenu: this.musicMenu
                })
            }
            else if (this.blockPosition == 2) {
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
            else if (this.blockPosition == 3) {
                this.musicMenu.stop();
                this.blockPosition = 1
                this.scene.start('ScoreBoardScene', {
                    leaderboard: this.leaderboard,
                    musicMenu: this.musicMenu
                })
            }
            else if (this.blockPosition == 4) {
                this.musicMenu.stop();
                this.blockPosition = 1
                this.scene.start('CreditsScene', {
                    musicMenu: this.musicMenu
                })
            }
        }
    }
    public setBlockPosition1(){
        this.blockPosition = 1;
    }

    public setBlockPosition2(){
        this.blockPosition = 2;
    }

    public setBlockPosition3(){
        this.blockPosition = 3;
    }

    public setBlockPosition4(){
        this.blockPosition = 4;
    }

}
