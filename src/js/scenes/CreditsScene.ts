import WebFontFile from "../inputs/WebfontFile";

export default class CreditsScene extends Phaser.Scene {

  private musicMenu!: Phaser.Sound.BaseSound

  esc: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "CreditsScene" });

  }

  init(data) {
    this.musicMenu = data.musicMenu
  }

  public preload() {
    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)

    //keys
    this.esc = this.input.keyboard.addKey('ESC')
  }

  public create() {
    this.musicMenu.play();

    this.add.image(400, 300, 'bg_menu');

    this.add.image(220, 80, 'titleCredits').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.start('MenuScene')
    }, this);

    const boxWidth = 600;

    const textStyle = {
      color: '#000',
      wordWrap: { width: boxWidth - 20, useAdvancedWrap: true },
      align: 'left',
      fontFamily: '"Press Start 2P"',
      fontSize: '12px',
      lineSpacing: 20
    };

    const creditsText = `- Desenvolvedora: Melissa Viana
    - Linguagem Base: TypeScript 
    - GameEngine: Phaser 3
    - Imagens: pikisuperstar on Freepik
    - Audio: Youtube
    ------------------------------------------------
    Agradecimentos especiais: Sarah, por me ajudar com os designs ;)
    `

    this.add.text(150, 200, creditsText, textStyle).setOrigin(0);


  }

  public update() {
    if (this.esc.isDown){
      this.musicMenu.stop();
      this.scene.start('MenuScene')
    }
  }

}
