
import WebFontFile from "../inputs/WebfontFile";

export default class ScoreBoardScene extends Phaser.Scene {

  private leaderboard: any

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

  constructor() {
    super({ key: "ScoreBoardScene" });

  }

  init(data) {
    this.leaderboard = data.leaderboard
    this.musicMenu = data.musicMenu
  }

  public preload() {


    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)
  }

  public async create() {
    this.musicMenu.play();

    this.add.image(400, 300, 'bg_menu');
    this.add.image(400, 150, 'logo')

    this.add.image(260, 200, 'titleScore').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.start('MenuScene')
    }, this);

    this.add.text(100, 280, 'NOME', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })
    this.add.text(330, 280, 'SCORE', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })
    this.add.text(560, 280, 'FASE', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })

    const scores = await this.leaderboard.loadFirstPage()
    if (scores.length > 0) {
      scores.sort((a, b) => b.score - a.score);

      let y = 350
  
      //top 5 score
      for (let i = 0; i < 5; ++i) {
  
        if (i < scores.length) {
          const scoreItem = scores[i]
  
          this.add.text(100, y, (i + 1) + '. ' + scoreItem.userName, { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
          this.add.text(330, y, scoreItem.score.toString(), { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
          this.add.text(560, y, scoreItem.level, { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
        }
  
        y = y + 50
  
      }
    } else {
      this.add.text(200, 400, "Seja o primeiro a jogar!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
    }

  }

  public update() {

  }

}