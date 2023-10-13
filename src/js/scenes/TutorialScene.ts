import WebFontFile from "../inputs/WebfontFile";

export default class TutorialScene extends Phaser.Scene {

  private menuMusic!: Phaser.Sound.BaseSound
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



  private downTriangle!: Phaser.GameObjects.Image
  private upTriangle!: Phaser.GameObjects.Image

  private description!: Phaser.GameObjects.Text



  constructor() {
    super({ key: "TutorialScene" });


  }

  public preload() {
    this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
    this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.png');
    this.load.image('back', '../../assets/images/back.png')
    this.load.image('titleTutorial', '../../assets/images/TUTORIAL.png')
    this.load.image('largeWhiteBox', '../../assets/images/largeWhiteBox.png')
    this.load.image('downTriangle', '../../assets/images/downTriangle.png')
    this.load.image('upTriangle', '../../assets/images/upTriangle.png')

    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)


  }

  public create() {
    this.menuMusic = this.sound.add('menuMusic', this.config);
    this.menuMusic.play();

    this.add.image(400, 300, 'bgMenu');


    this.add.image(220, 80, 'titleTutorial').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start('MenuScene')
    }, this);

    this.add.image(400, 350, 'largeWhiteBox')
    this.downTriangle = this.add.image(670, 500, 'downTriangle').setVisible(true);
    this.upTriangle = this.add.image(670, 200, 'upTriangle').setVisible(false);

    const boxWidth = 600;

    const textStyle = {
      color: '#000',
      wordWrap: { width: boxWidth - 20, useAdvancedWrap: true },
      align: 'left',
      fontFamily: '"Press Start 2P"',
      fontSize: '10px',
      lineSpacing: 5
    };

    const textTutorialpart1 = `Olá! O grupo Sandy&Junior está em uma nova turnê '4Estações' tocando seus maiores sucessos! Ajude-os a tocar cada música de cada estação!
    
    Objetivo do Jogo: Tocar as músicas em sincronia com o ritmo enquanto se movimenta pelo cenário. Acerte a batida da música sempre que apertar o comando certo no tempo exato.

    Controles:
    
    Setas do Teclado: Movimentam o personagem para esquerda e direita.
    Tecla A: Aperte para acertar o ícone da Primavera.
    Tecla S: Aperte para acertar o ícone do Verão.
    Tecla D: Aperte para acertar o ícone do Outono.
    Tecla F: Aperte para acertar o ícone do Inverno.`

    const textTutorialpart2 = `Instruções: No Menu, clique em "Iniciar". Na tela de personagem escolha com quem deseja jogar (Sandy ou Junior) e, em seguida, selecione a estação do ano.

   À medida que você se movimenta pelo cenário, diferentes ícones das estações aparecerão. Quando os ícones estiverem perto do seu personagem, pressione a tecla correspondente.
    
    Você receberá pontos com base na precisão e no ritmo de suas notas musicais. 
    - Maior que 90%: 10 pts
    - Entre 50% e 89%: 5 pts
    - Abaixo de 50%: 0 pts
    Tente obter a maior pontuação possível tocando as notas corretas.

    Fim do Jogo: O jogo termina quando você completa a fase ou erra muitas notas.`

    this.description = this.add.text(400, 200, textTutorialpart1, textStyle).setOrigin(0.5, 0);



    this.downTriangle.setInteractive();
    this.downTriangle.on('pointerdown', function () {
      this.upTriangle.setVisible(true)
      this.downTriangle.setVisible(false)
      this.description.setText(textTutorialpart2)
    }, this);

    this.upTriangle.setInteractive();
    this.upTriangle.on('pointerdown', function () {
      this.upTriangle.setVisible(false)
      this.downTriangle.setVisible(true)
      this.description.setText(textTutorialpart1)
    }, this);




  }

  public update() {

  }

}