import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";

export default class Level1Scene extends Phaser.Scene {

    private leaderboard: any

    private musicLevel1: Phaser.Sound.BaseSound
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
        super({ key: "Level1Scene" });

    }

    init(data) {
        this.playerName = data.playerName;
        this.leaderboard = data.leaderboard;
        this.musicLevel1 = data.musicLevel1;
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
        this.musicLevel1.play();

        this.add.image(400, 300, 'backgroundLevel1').setScale(0.3);

        this._score = new Score(this, 16, 16).setDepth(1);

        this._player = new Players(this, 100, 580, this.playerName).setDepth(1);
        this._player.setTexture(this.playerName)

        this._platform = new Platform(this.physics.world, this);

        var backButton = this.add.image(750, 40, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function () {
            this.musicLevel1.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }, this);

        this.springTimeArray = [14, 26, 36, 48, 54, 66, 72, 125, 137, 143, 155, 160]
        this._springIconGroup = new Icons(this, this._score, this.A, 10, 200, -30, 'springIcon')
        this._springIconGroup.handleIconFalling(this.springTimeArray)
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)

        this.summerTimeArray = [6, 10, 18, 22, 30, 34, 42, 46, 78, 90, 102, 106, 108, 119, 122, 131, 134, 166, 178, 190, 196, 202, 214, 225, 231, 239]
        this._summerIconGroup = new Icons(this, this._score, this.S, 10, 340, -30, 'summerIcon')
        this._summerIconGroup.handleIconFalling(this.summerTimeArray)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this.fallTimeArray = [41, 53, 60, 75, 87, 98, 105, 128, 140, 149, 164, 175, 187, 192, 198, 211, 222, 227, 233]
        this._fallIconGroup = new Icons(this, this._score, this.D, 10, 470, -30, 'fallIcon')
        this._fallIconGroup.handleIconFalling(this.fallTimeArray)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this.winterTimeArray =  [65, 96, 100, 105, 112, 115, 153, 172, 184, 189, 194, 201, 208, 213, 220, 224, 229, 235]
        this._winterIconGroup = new Icons(this, this._score, this.F, 10, 600, -30, 'winterIcon')
        this._winterIconGroup.handleIconFalling(this.winterTimeArray)
        this._winterIconGroup.handlePlayerOverlap(this._player)
        this._winterIconGroup.handlePlatformOverlap(this._platform)

        this.physics.add.collider(this._player, this._platform);

        this.time.addEvent({
            delay: this.musicLevel1.duration * 1000,
            loop: false,
            callback: () => {
                this.musicLevel1.stop();
                this.scene.start("YourScoreScene", {
                    score: this._score, level: "PRIMAVERA",
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
            this.musicLevel1.stop();
            this.scene.start('GameOverScene', {
                score: this._score,
                musicMenu: this.musicMenu
            });
        }

        if (this.esc.isDown) {
            this.musicLevel1.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }

    }

}
