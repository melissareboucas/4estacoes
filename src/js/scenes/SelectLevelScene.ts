export default class SelectLevelScene extends Phaser.Scene {

  private playerName: string

  enter: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "SelectLevelScene" });

  }

  init(data) {
    this.playerName = data.playerName;
  }

  public preload() {
    this.enter = this.input.keyboard.addKey('ENTER')
  }

  public create() {



  }

  public update() {

    if (this.enter.isDown) {
      this.scene.start("Level1Scene", {playerName: this.playerName});
  }

  }

}