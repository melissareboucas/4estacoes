import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";


export default class Level4Scene extends Phaser.Scene {

    private leaderboard: any

    private musicLevel4!: Phaser.Sound.BaseSound
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
        super({ key: "Level4Scene" });

    }

    init(data) {
        this.playerName = data.playerName;
        this.leaderboard = data.leaderboard;
        this.musicLevel4 = data.musicLevel4;
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
        this.musicLevel4.play();

        this.add.image(400, 300, 'backgroundLevel4').setScale(0.7);

        this._score = new Score(this, 16, 16).setDepth(1);
        this._score.setColor('#fff')

        this._player = new Players(this, 100, 580, this.playerName).setDepth(1);
        this._player.setTexture(this.playerName)

        this._platform = new Platform(this.physics.world, this);

        var backButton = this.add.image(750, 40, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function () {
            this.musicLevel4.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }, this);

        this.springTimeArray =  [12, 22, 32, 33, 69, 71, 82, 91, 93, 95, 140, 143,185, 180,184, 187, 189]
        this._springIconGroup = new Icons(this, this._score, this.A, 40, 200, -30, 'springIcon')
        this._springIconGroup.handleIconFalling(this.springTimeArray)
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)

        this.summerTimeArray = [15, 24, 42, 52, 56, 64, 66, 73, 75, 77, 79, 84, 88, 106, 108, 110, 112, 114, 117, 119, 123, 125, 128, 130,  145, 147, 149, 152, 154, 158, 160, 162, 164, 166, 168, 170, 172, 182,  182]
        this._summerIconGroup = new Icons(this, this._score, this.S, 40, 340, -30, 'summerIcon')
        this._summerIconGroup.handleIconFalling(this.summerTimeArray)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this.fallTimeArray = [17, 27, 28, 36, 39, 44, 49, 65, 69, 72, 76, 80, 85, 89, 94, 102, 107, 111, 115, 120, 124, 129, 137, 141, 146, 150, 155, 159, 163, 172, 176, 181, 185, 190]
        this._fallIconGroup = new Icons(this, this._score, this.D, 40, 470, -30, 'fallIcon')
        this._fallIconGroup.handleIconFalling(this.fallTimeArray)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this.winterTimeArray = [10, 19, 29, 38, 41, 43, 46, 48, 50, 58, 63, 67, 70, 74, 78, 83, 87, 90, 98, 100, 104, 109, 113, 118, 121, 127, 133, 135, 139, 144, 148, 153, 157, 161, 168, 170, 174, 179, 183, 188, 192, 197, 202]
        this._winterIconGroup = new Icons(this, this._score, this.F, 40, 600, -30, 'winterIcon')
        this._winterIconGroup.handleIconFalling(this.winterTimeArray)
        this._winterIconGroup.handlePlayerOverlap(this._player)
        this._winterIconGroup.handlePlatformOverlap(this._platform)

        this.physics.add.collider(this._player, this._platform);

        this.time.addEvent({
            delay: this.musicLevel4.duration * 1000,
            loop: false,
            callback: () => {
                this.musicLevel4.stop();
                this.scene.start("YourScoreScene", {
                    score: this._score, level: "INVERNO",
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
            this.musicLevel4.stop();
            this.scene.start('GameOverScene', {
                score: this._score,
                musicMenu: this.musicMenu
            });
        }

        if (this.esc.isDown) {
            this.musicLevel4.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }
    }

}
