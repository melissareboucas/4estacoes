import Platform from "./Platform";
import Players from "./Players";
import Score from "./Score";

export default class Icons extends Phaser.Physics.Arcade.Group {

    private pressedKey: Phaser.Input.Keyboard.Key;

    private precision: number

    private score: Score

    private gravity: number
    private x: number
    private y: number
    private textureKey: string

    private errorSFX!: Phaser.Sound.BaseSound
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


    constructor(scene: Phaser.Scene, score: Score, pressedKey: Phaser.Input.Keyboard.Key, gravity: number, x: number, y: number, textureKey: string) {
        super(scene.physics.world, scene)

        this.score = score;
        this.pressedKey = pressedKey;
        this.gravity = gravity
        this.x = x;
        this.y = y;
        this.textureKey = textureKey
        this.errorSFX = this.scene.sound.add('errorSFX', this.config);

    }


    public addImage(x: number, y: number, textureKey: string): Phaser.Physics.Arcade.Sprite {
        const image = this.scene.physics.add.sprite(x, y, textureKey).setScale(0.15) as Phaser.Physics.Arcade.Sprite;
        this.add(image); // Add the image to the group

        return image; // Return the created image for further manipulation if needed
    }

    public handleIconFalling(times: number[]) {
        times.forEach((time) => {
            this.scene.time.addEvent({
                delay: time * 1000 - 6000,
                callback: this.handleEvent, // Your event handler function
                callbackScope: this,
            });
        });
    }

    public handleEvent() {
        const image = this.addImage(this.x, this.y, this.textureKey);
        // Apply gravity to the image
        image.setGravityY(this.gravity); //
    }

    public handlePlayerOverlap(player: Players) {

        this.scene.physics.add.overlap(this, player, this.playerCallback.bind(this), (player: Players) => this.processPlayerCallback(player));
    }

    public playerCallback() {
        if (this.precision == 100) {
            this.score.updateScore(10);
        } else if (this.precision == 50) {
            this.score.updateScore(5);
        }

    }

    public processPlayerCallback(player: Players) {
        let distanceX = Math.abs(player.x - this.getFirstAlive().x);
        let distanceY = Math.abs(player.y - this.getFirstAlive().y);
        if (this.pressedKey.isDown && distanceX <= 6 && distanceY >= 16 && distanceY <= 34) {
            this.getFirstAlive().destroy();
            this.precision = 100
            return true
        } else if (this.pressedKey.isDown && distanceX <= 24 && distanceY >= 5 && distanceY <= 55) {
            this.getFirstAlive().destroy();
            this.precision = 50
            return true
        } else {
            if(this.checkGamepads(distanceX, distanceY)){
                return true
            } else {
                this.precision = 0
                return false
            }
            
        }
        
    }

    public handlePlatformOverlap(platform: Platform) {
        this.scene.physics.add.overlap(this, platform, this.platformCallback.bind(this));

    }

    public platformCallback() {
        this.errorSFX.play()
        this.score.updateGameOverScore(1);
        this.getFirstAlive().destroy();
    }

    
    public checkGamepads(distanceX: number, distanceY: number) {
        const gamepads = navigator.getGamepads();

        for (const gamepad of gamepads) {
            if (gamepad) {
                if (gamepad.buttons[4].pressed) {
                    //l1
                    if (this.textureKey == 'summerIcon') {
                        if (distanceX <= 6 && distanceY >= 16 && distanceY <= 34) {
                            this.getFirstAlive().destroy();
                            this.precision = 100
                            return true
                        } else if (distanceX <= 24 && distanceY >= 5 && distanceY <= 55) {
                            this.getFirstAlive().destroy();
                            this.precision = 50
                            return true
                        } else {
                            this.precision = 0
                            return false
                        }
                    } else {
                        return false
                    }
                } else if (gamepad.buttons[5].pressed) {
                    //r1
                    if (this.textureKey == 'fallIcon') {
                        if (distanceX <= 6 && distanceY >= 16 && distanceY <= 34) {
                            this.getFirstAlive().destroy();
                            this.precision = 100
                            return true
                        } else if (distanceX <= 24 && distanceY >= 5 && distanceY <= 55) {
                            this.getFirstAlive().destroy();
                            this.precision = 50
                            return true
                        } else {
                            this.precision = 0
                            return false
                        }
                    } else {
                        return false
                    }
                } else if (gamepad.buttons[6].pressed) {
                    //l2
                    if (this.textureKey == 'springIcon') {
                        if (distanceX <= 6 && distanceY >= 16 && distanceY <= 34) {
                            this.getFirstAlive().destroy();
                            this.precision = 100
                            return true
                        } else if (distanceX <= 24 && distanceY >= 5 && distanceY <= 55) {
                            this.getFirstAlive().destroy();
                            this.precision = 50
                            return true
                        } else {
                            this.precision = 0
                            return false
                        }
                    } else {
                        return false
                    }
                } else if (gamepad.buttons[7].pressed) {
                    //r2
                    if (this.textureKey == 'winterIcon') {
                        if (distanceX <= 6 && distanceY >= 16 && distanceY <= 34) {
                            this.getFirstAlive().destroy();
                            this.precision = 100
                            return true
                        } else if (distanceX <= 24 && distanceY >= 5 && distanceY <= 55) {
                            this.getFirstAlive().destroy();
                            this.precision = 50
                            return true
                        } else {
                            this.precision = 0
                            return false
                        }
                    } else {
                        return false
                    }
                }
            }
        }
    }

 




}