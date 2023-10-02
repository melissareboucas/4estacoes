export default class Players extends Phaser.Physics.Arcade.Sprite {

    public scene: Phaser.Scene;
    public body: Phaser.Physics.Arcade.Body;
    private playerName: string
    constructor(scene: Phaser.Scene, x: number, y: number, playerName: string) {
        super(scene, x, y, playerName)
        this.playerName = playerName;
        
        this.scene.physics.world.enable(this);
        this.scene.add
            .existing(this)
            .setCollideWorldBounds(true)
            .setX(this.x)
            .setY(this.y)

        this.scene.anims.create({
            key: 'left',
            frames: this.scene.anims.generateFrameNumbers(this.playerName, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'turn',
            frames: [{ key: this.playerName, frame: 4 }],
            frameRate: 20
        });

        this.scene.anims.create({
            key: 'right',
            frames: this.scene.anims.generateFrameNumbers(this.playerName, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    }

    public setState(value: string) {
        switch (value) {
            case "walkingleft":
                this.setVelocityX(-160)
                this.anims.play("left", true);
                break;
            case "walkingright":
                this.setVelocityX(160)
                this.anims.play("right", true);
                break;
            case "turn":
                this.setVelocityX(0)
                this.anims.play("turn", true);
                break;
            case "runningleft":
                this.setVelocityX(-460)
                this.anims.play("left", true);
                break;
            case "runningright":
                this.setVelocityX(460)
                this.anims.play("right", true);
                break;
        }

        return super.setState(value);
    }

}