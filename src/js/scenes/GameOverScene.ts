export default class GameOverScene extends Phaser.Scene {


    constructor() {
        super({ key: "GameOverScene"});

      }

    public preload() {
    }
  
    public create() {

      this.scene.start('MenuScene')
        
    }

    public update(){

    }

  }