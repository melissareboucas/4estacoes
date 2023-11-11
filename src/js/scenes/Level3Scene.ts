import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";


export default class Level3Scene extends Phaser.Scene {

    private leaderboard: any

    private musicLevel3!: Phaser.Sound.BaseSound
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
        super({ key: "Level3Scene" });

    }

    init(data) {
        this.playerName = data.playerName;
        this.leaderboard = data.leaderboard;
        this.musicLevel3 = data.musicLevel3;
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
        this.musicLevel3.play();

        this.add.image(400, 300, 'backgroundLevel3').setScale(0.3);

        this._score = new Score(this, 16, 16).setDepth(1);
        this._score.setColor('#fff')

        this._player = new Players(this, 100, 580, this.playerName).setDepth(1);
        this._player.setTexture(this.playerName)

        this._platform = new Platform(this.physics.world, this);

        var backButton = this.add.image(750, 40, 'back').setScale(0.05);
        backButton.setInteractive();
        backButton.on('pointerdown', function () {
            this.handleBack();
        }, this);

        this.springTimeArray = [15, 25, 35, 56, 66, 77, 128, 134, 141, 159, 169, 180, 190, 200]
        this._springIconGroup = new Icons(this, this._score, this.A, 30, 200, -30, 'springIcon')
        this._springIconGroup.handleIconFalling(this.springTimeArray)
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)

        this.summerTimeArray = [17, 28, 38, 47, 59, 69, 79, 110, 120, 130, 152, 162, 172, 182, 192, 203]
        this._summerIconGroup = new Icons(this, this._score, this.S, 30, 340, -30, 'summerIcon')
        this._summerIconGroup.handleIconFalling(this.summerTimeArray)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this.fallTimeArray = [5, 10, 20, 30, 40, 46, 51, 61, 71, 82, 87, 92, 97, 102, 113, 108, 118, 123, 136, 146, 149, 154, 164, 175, 185, 195, 206, 211]
        this._fallIconGroup = new Icons(this, this._score, this.D, 30, 470, -30, 'fallIcon')
        this._fallIconGroup.handleIconFalling(this.fallTimeArray)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this.winterTimeArray = [12, 23, 32, 43, 54, 64, 74, 84, 89, 95, 100, 105, 110, 125, 139, 144, 157, 167, 177, 187, 198, 208]
        this._winterIconGroup = new Icons(this, this._score, this.F, 30, 600, -30, 'winterIcon')
        this._winterIconGroup.handleIconFalling(this.winterTimeArray)
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
        if (this.checkGamepadsExists()) {
            this.checkGamepads();
        } else {
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
        }

        if (this._score.getGameOverScore() >= 25) {
            this.musicLevel3.stop();
            this.scene.start('GameOverScene', {
                score: this._score,
                musicMenu: this.musicMenu
            });
        }

        if (this.esc.isDown) {
            this.handleBack();
        }


    }

    public checkGamepadsExists() {
        const gamepads = navigator.getGamepads();

        if (gamepads[0] != null) {
            return true
        } else {
            return false
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
                    if (gamepad.buttons[0].pressed) {
                        this._player.setState("runningleft")
                    }
                    else {
                        this._player.setState("walkingleft")
                    }

                } else if (gamepad.buttons[15].pressed) {
                    //right
                    if (gamepad.buttons[0].pressed) {
                        this._player.setState("runningright")
                    }
                    else {
                        this._player.setState("walkingright")
                    }


                } else {
                    this._player.setState("turn")

                }
            }
        }
    }

    public handleBack(){
        this.musicLevel3.stop();
        this.scene.restart();
        this.scene.start('MenuScene')
    }

}
