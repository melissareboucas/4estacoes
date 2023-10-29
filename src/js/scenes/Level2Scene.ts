import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";


export default class Level2Scene extends Phaser.Scene {

    private leaderboard: any

    private musicLevel2!: Phaser.Sound.BaseSound
    private musicMenu: Phaser.Sound.BaseSound
    private errorSFX: Phaser.Sound.BaseSound

    private _player: Players
    private playerName: string

    //keys
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    F: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;
    esc: Phaser.Input.Keyboard.Key;

    private _score: Score

    private _platform: Platform

    private _springIconGroup: Icons
    private _summerIconGroup: Icons
    private _fallIconGroup: Icons
    private _winterIconGroup: Icons

    private springTimeArray: number[]
    private summerTimeArray: number[]
    private fallTimeArray: number[]
    private winterTimeArray: number[]


    constructor() {
        super({ key: "Level2Scene" });

    }

    init(data) {
        this.playerName = data.playerName;
        this.leaderboard = data.leaderboard;
        this.musicLevel2 = data.musicLevel2;
        this.musicMenu = data.musicMenu;
        this.errorSFX = data.errorSFX
    }

    public preload() {
        //keys
        this.A = this.input.keyboard.addKey('A')
        this.S = this.input.keyboard.addKey('S')
        this.D = this.input.keyboard.addKey('D')
        this.F = this.input.keyboard.addKey('F')
        this.left = this.input.keyboard.addKey('LEFT')
        this.right = this.input.keyboard.addKey('RIGHT')
        this.space = this.input.keyboard.addKey('SPACE')
        this.enter = this.input.keyboard.addKey('ENTER')
        this.esc = this.input.keyboard.addKey('ESC')
    }

    public create() {
        this.musicLevel2.play();

        this.add.image(400, 300, 'backgroundLevel2').setScale(0.3);

        this._score = new Score(this, 16, 16).setDepth(1);

        this._player = new Players(this, 100, 580, this.playerName).setDepth(1);
        this._player.setTexture(this.playerName)

        this._platform = new Platform(this.physics.world, this);

        var backButton = this.add.image(750, 40, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function () {
            this.musicLevel2.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }, this);

        this.springTimeArray = [8, 29, 30, 39, 59, 79, 96, 97, 114, 123, 145, 150, 152, 173, 174, 192, 193, 211, 224]
        this._springIconGroup = new Icons(this, this._score, this.A, 20, 200, -30, 'springIcon')
        this._springIconGroup.handleIconFalling(this.springTimeArray)
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)

        this.summerTimeArray = [3, 12, 17, 22, 31, 35, 45, 50, 54, 64, 69, 73, 85, 89, 94, 99, 102, 113, 116, 121, 131, 136, 140, 162, 166, 171, 180, 185, 190, 194, 199, 204, 208, 213, 218]
        this._summerIconGroup = new Icons(this, this._score, this.S, 20, 340, -30, 'summerIcon')
        this._summerIconGroup.handleIconFalling(this.summerTimeArray)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this.fallTimeArray = [15, 19, 25, 34, 47, 52, 66, 71, 75, 87, 92, 101, 115, 120, 134, 138, 164, 169, 183, 187, 201, 206, 216, 220]
        this._fallIconGroup = new Icons(this, this._score, this.D, 20, 470, -30, 'fallIcon')
        this._fallIconGroup.handleIconFalling(this.fallTimeArray)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this.winterTimeArray = [10, 26, 38, 43, 57, 60, 78, 82, 103, 111, 122, 129, 143, 159, 178, 197, 222, 226]
        this._winterIconGroup = new Icons(this, this._score, this.F, 20, 600, -30, 'winterIcon')
        this._winterIconGroup.handleIconFalling(this.winterTimeArray)
        this._winterIconGroup.handlePlayerOverlap(this._player)
        this._winterIconGroup.handlePlatformOverlap(this._platform)
        
        this.physics.add.collider(this._player, this._platform);

        //simulate score scene - voltar tempo para 1000
        this.time.addEvent({
            delay: this.musicLevel2.duration * 10,
            loop: false,
            callback: () => {
                this.musicLevel2.stop();
                this.scene.start("YourScoreScene", {
                    score: this._score, level: "VERÃO",
                    leaderboard: this.leaderboard,
                    musicMenu: this.musicMenu
                });
            }
        })

    }

    public update() {

        if (this.left.isDown && this.space.isDown) {
            this._player.setState("runningleft")
        }
        else if (this.left.isDown) {
            this._player.setState("walkingleft")
        }
        else if (this.right.isDown && this.space.isDown) {
            this._player.setState("runningright")
        }
        else if (this.right.isDown) {
            this._player.setState("walkingright")
        }
        else {
            this._player.setState("turn")
        }

        if (this._score.getGameOverScore() >= 25) {
            this.musicLevel2.stop();
            this.scene.start('GameOverScene', {
                score: this._score,
                musicMenu: this.musicMenu
            });
        }

        if (this.esc.isDown) {
            this.musicLevel2.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }

    }

}
