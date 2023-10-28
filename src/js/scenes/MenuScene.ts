import WebFontFile from "../inputs/WebfontFile";
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components'

export default class MenuScene extends Phaser.Scene {

    private leaderboard: any

    private musicMenu!: Phaser.Sound.BaseSound
    private musicLevel1: Phaser.Sound.BaseSound
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
        loop: true,
    };

    constructor() {
        super({ key: "MenuScene" });
    }

    init(data) {
        this.musicMenu = data.musicMenu
        this.musicLevel1 = data.musicLevel1
        this.musicLevel2 = data.musicLevel2
        this.musicLevel3 = data.musicLevel3
        this.musicLevel4 = data.musicLevel4
    }

    public preload() {
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts)
    }

    public create() {

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
                musicLevel4: this.musicLevel4
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
            this.scene.start('CreditsScene',{
                musicMenu: this.musicMenu
            })
        }, this);

        this.add.text(580, 570, `Developed by Melissa`, { fontFamily: '"Press Start 2P"', fontSize: '10px', color: '#000000' });

    }

}
