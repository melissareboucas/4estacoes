import Platform from "./Platform";
import Players from "./Players";
import Score from "./Score";

export default class Icons extends Phaser.Physics.Arcade.Group {

    private pressedKey: Phaser.Input.Keyboard.Key;

    private precision: number

    private score: Score

    private gravity: number


    constructor(scene: Phaser.Scene, score: Score, pressedKey: Phaser.Input.Keyboard.Key, gravity: number) {
        super(scene.physics.world, scene)

        this.score = score;
        this.pressedKey = pressedKey;
        this.gravity = gravity
    }


    public addImage(x: number, y: number, textureKey: string): Phaser.Physics.Arcade.Sprite {
        const image = this.scene.physics.add.sprite(x, y, textureKey).setScale(0.15) as Phaser.Physics.Arcade.Sprite;
        this.add(image); // Add the image to the group

        return image; // Return the created image for further manipulation if needed
    }



    public handleIconFalling(timeDelay: number, x: number, y: number, textureKey: string, repetitionNumber: number) {
        this.scene.time.addEvent({
            delay: timeDelay,
            callback: () => {
                const image = this.addImage(x, y, textureKey);
            // Apply gravity to the image
            image.setGravityY(this.gravity); // 
            },
            repeat: repetitionNumber
        });
    }

    public handlePlayerOverlap(player: Players) {

        this.scene.physics.add.overlap(this, player, this.playerCallback.bind(this), (player: Players) => this.processPlayerCallback(player));
    }

    public playerCallback() {
        if(this.precision == 100) {           
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
            this.precision = 0
            return false
        }
    }

    public handlePlatformOverlap(platform: Platform) {
        this.scene.physics.add.overlap(this, platform, this.platformCallback.bind(this));

    }

    public platformCallback(){
        this.score.updateGameOverScore(1);
        this.getFirstAlive().destroy(); 
    }





}