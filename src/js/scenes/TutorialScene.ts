import WebFontFile from "../inputs/WebfontFile";

export default class TutorialScene extends Phaser.Scene {

  private musicMenu!: Phaser.Sound.BaseSound

  private downTriangle!: Phaser.GameObjects.Image
  private upTriangle!: Phaser.GameObjects.Image

  private description!: Phaser.GameObjects.Text
  private textTutorialpart1!: string
  private textTutorialpart2!: string

  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  esc: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "TutorialScene" });
  }

  init(data) {
    this.musicMenu = data.musicMenu
  }

  public preload() {
    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)

    //keys
    this.up = this.input.keyboard.addKey('UP')
    this.down = this.input.keyboard.addKey('DOWN')
    this.esc = this.input.keyboard.addKey('ESC')
  }

  public create() {
    this.musicMenu.play();

    this.add.image(400, 300, 'bg_menu');

    this.add.image(220, 80, 'titleTutorial').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.handleBack();
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

    this.textTutorialpart1 = `Olá! O grupo Sandy&Junior está em uma nova turnê '4Estações' tocando seus maiores sucessos! Ajude-os a tocar cada música de cada estação!
    
    Objetivo do Jogo: Tocar as músicas em sincronia com o ritmo enquanto se movimenta pelo cenário. Acerte a batida da música sempre que apertar o comando certo no tempo exato.

    Controles:
    
    Setas do Teclado: Movimentam a personagem para esquerda e direita.
    Barra de espaço: Aceleram o movimento da personagem.
    Tecla A: Aperte para acertar o ícone da Primavera.
    Tecla S: Aperte para acertar o ícone do Verão.
    Tecla D: Aperte para acertar o ícone do Outono.
    Tecla F: Aperte para acertar o ícone do Inverno.`

    this.textTutorialpart2 = `Instruções: No Menu, clique em "Iniciar". Na tela de personagem escolha com quem deseja jogar (Sandy ou Junior) e, em seguida, selecione a estação do ano.

   À medida que você se movimenta pelo cenário, diferentes ícones das estações aparecerão. Quando os ícones estiverem perto da sua personagem, pressione a tecla correspondente.
    
    Você receberá pontos com base na precisão e no ritmo de suas notas musicais. 
    - Maior que 90%: 10 pts
    - Entre 50% e 89%: 5 pts
    - Abaixo de 50%: 0 pts
    Tente obter a maior pontuação possível tocando as notas corretas.

    Fim do Jogo: O jogo termina quando você completa a fase ou erra muitas notas.`

    this.description = this.add.text(400, 200, this.textTutorialpart1, textStyle).setOrigin(0.5, 0);

    this.downTriangle.setInteractive();
    this.downTriangle.on('pointerdown', function () {
      this.handleDownArrow();
    }, this);

    this.upTriangle.setInteractive();
    this.upTriangle.on('pointerdown', function () {
      this.handleUpArrow();
    }, this);

  }

  public update() {
    this.checkGamepads();

    if (this.esc.isDown) {
      this.handleBack();
    }

    if (this.up.isDown) {
      this.handleUpArrow();
    }

    if (this.down.isDown) {
      this.handleDownArrow();
    }
  }

  public checkGamepads() {
    const gamepads = navigator.getGamepads();

    for (const gamepad of gamepads) {
      if (gamepad) {
        if (gamepad.buttons[13].pressed) {
          this.handleDownArrow();
        } else if (gamepad.buttons[12].pressed) {
          this.handleUpArrow()
        } else if (gamepad.buttons[1].pressed) {
          this.handleBack();
        }
      }
    }
  }

  public handleBack(){
    this.musicMenu.stop();
    this.scene.start('MenuScene')
  }

  public handleDownArrow(){
    this.upTriangle.setVisible(true)
    this.downTriangle.setVisible(false)
    this.description.setText(this.textTutorialpart2)
  }

  public handleUpArrow(){
    this.upTriangle.setVisible(false)
    this.downTriangle.setVisible(true)
    this.description.setText(this.textTutorialpart1)
  }

}