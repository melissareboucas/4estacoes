export default class LoaderScene extends Phaser.Scene {
  public preload() {

    this.load.image("ground", "../../assets/images/platform.png");
    /*
    this.load.audio("jump", "./assets/audio/jump.mp3");
    this.load.spritesheet("player", "./assets/images/player.png", { frameWidth: 16, frameHeight: 32 });
    */
  }

  public create() {
    this.scene.start("MenuScene");
  }
}
