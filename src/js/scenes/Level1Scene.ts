import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";

export default class Level1Scene extends Phaser.Scene {

    private leaderboard: any

    private musicLevel1: Phaser.Sound.BaseSound
    private musicMenu: Phaser.Sound.BaseSound

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




    constructor() {
        super({ key: "Level1Scene" });

    }

    init(data) {
        this.playerName = data.playerName;
        this.leaderboard = data.leaderboard;
        this.musicLevel1 = data.musicLevel1
        this.musicMenu = data.musicMenu
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

        this._springIconGroup = new Icons(this, this._score, this.A, 10)
        this._springIconGroup.create(200, -30, 'springIcon').setScale(0.15).setGravityY(10);
        this._springIconGroup.handleIconFalling(5000, 200, -30, 'springIcon', 45);
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)

        this._summerIconGroup = new Icons(this, this._score, this.S, 10)
        this._summerIconGroup.handleIconFalling(17000, 340, -30, 'summerIcon', 10)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this._fallIconGroup = new Icons(this, this._score, this.D, 10)
        this._fallIconGroup.handleIconFalling(23000, 470, -30, 'fallIcon', 8)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this._winterIconGroup = new Icons(this, this._score, this.F, 10)
        this._winterIconGroup.handleIconFalling(29000, 600, -30, 'winterIcon', 6)
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

        if (this._score.getGameOverScore() >= 32) {
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
