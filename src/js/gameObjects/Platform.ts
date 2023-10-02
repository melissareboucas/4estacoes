export default class Platform extends Phaser.Physics.Arcade.StaticGroup {

    constructor(world: Phaser.Physics.Arcade.World, scene: Phaser.Scene, children?: Phaser.GameObjects.GameObject[]) {
        super(world, scene, children)
        
        this.scene.add
        .existing(this)


        this.create(400, 632, 'ground').setScale(2).refreshBody();


    }

}