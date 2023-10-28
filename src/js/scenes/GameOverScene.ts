import Score from "../gameObjects/Score";

import WebFontFile from "../inputs/WebfontFile";

export default class GameOverScene extends Phaser.Scene {

  private _score: Score

  private musicMenu!: Phaser.Sound.BaseSound
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

  //keys
  enter: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "GameOverScene" });

  }

  init(data) {
    this.musicMenu = data.musicMenu;
    this._score = data.score;
  }

  public preload() {
    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)

    //keys
    this.enter = this.input.keyboard.addKey('ENTER')
  }

  public create() {
    this.musicMenu.play();

    this.add.image(400, 300, 'bg_menu');

    this.add.image(200, 60, 'titleGameOver').setOrigin(0)

    this.add.image(70, 200, 'scoreBlock').setOrigin(0)

    this.add.text(375, 260, this._score.getScore().toString(), { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' });

    this.add.text(190, 540, "Pressione Enter para seguir", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });
    this.add.text(290, 220, "Sua pontuação:", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });

    this.add.text(220, 350, "Não foi dessa vez :(", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
    this.add.text(260, 390, "Tente novamente!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })

  }

  public update() {
    if (this.enter.isDown) {
      this.musicMenu.stop();
      this.scene.start("MenuScene");
    }

  }

}