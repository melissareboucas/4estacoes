import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";


export default class Level3Scene extends Phaser.Scene {

    private leaderboard: any

    private musicLevel3!: Phaser.Sound.BaseSound
    private musicMenu: Phaser.Sound.BaseSound

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
        super({ key: "Level3Scene" });

    }

    init(data) {
        this.playerName = data.playerName;
        this.leaderboard = data.leaderboard;
        this.musicLevel3 = data.musicLevel3;
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
        this.musicLevel3.play();

        this.add.image(400, 300, 'backgroundLevel3').setScale(0.3);

        this._score = new Score(this, 16, 16).setDepth(1);

        this._player = new Players(this, 100, 580, this.playerName).setDepth(1);
        this._player.setTexture(this.playerName)

        this._platform = new Platform(this.physics.world, this);

        var backButton = this.add.image(750, 40, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function () {
            this.musicLevel3.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }, this);

        this._springIconGroup = new Icons(this, this._score, this.A, 30)
        this._springIconGroup.handleIconFalling(25463, 200, -30, 'springIcon', 7);
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)

        this._summerIconGroup = new Icons(this, this._score, this.S, 30)
        this._summerIconGroup.handleIconFalling(32106, 340, -30, 'summerIcon', 6)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this._fallIconGroup = new Icons(this, this._score, this.D, 30)
        this._fallIconGroup.create(470, -30, 'fallIcon').setScale(0.15).setGravityY(30)
        this._fallIconGroup.handleIconFalling(5534, 470, -30, 'fallIcon', 40)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this._winterIconGroup = new Icons(this, this._score, this.F, 30)
        this._winterIconGroup.handleIconFalling(18821, 600, -30, 'winterIcon', 9)
        this._winterIconGroup.handlePlayerOverlap(this._player)
        this._winterIconGroup.handlePlatformOverlap(this._platform)

        this.physics.add.collider(this._player, this._platform);

        this.time.addEvent({
            delay: this.musicLevel3.duration * 1000,
            loop: false,
            callback: () => {
                this.musicLevel3.stop();
                this.scene.start("YourScoreScene", {
                    score: this._score, level: "OUTONO",
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
            this.musicLevel3.stop();
            this.scene.start('GameOverScene', {
                score: this._score,
                musicMenu: this.musicMenu
            });
        }

        if (this.esc.isDown) {
            this.musicLevel3.stop();
            this.scene.restart();
            this.scene.start('MenuScene')
        }

    }

}
