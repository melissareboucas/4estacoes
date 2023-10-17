import WebFontFile from "../inputs/WebfontFile";

export default class SelectLevelScene extends Phaser.Scene {

  private leaderboard: any

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

  //keys
  right: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  enter: Phaser.Input.Keyboard.Key;

  private playerName: string

  private block!: Phaser.GameObjects.Image
  private blockPosition: number

  private level1!: Phaser.GameObjects.Image
  private level2!: Phaser.GameObjects.Image
  private level3!: Phaser.GameObjects.Image
  private level4!: Phaser.GameObjects.Image

  constructor() {
    super({ key: "SelectLevelScene" });
    this.blockPosition = 1;

  }

  init(data) {
    this.playerName = data.playerName;
    this.leaderboard = data.leaderboard
  }

  public preload() {
    this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
    this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.png');
    this.load.image('orangeBlock', '../../assets/images/orangeBlock.png')
    this.load.image('back', '../../assets/images/back.png')
    this.load.image('titleLevel', '../../assets/images/ESCOLHA A ESTAÇÃO.png')
    this.load.image('level1', '../../assets/images/level1.png')
    this.load.image('level2', '../../assets/images/level2.png')
    this.load.image('level3', '../../assets/images/level3.png')
    this.load.image('level4', '../../assets/images/level4.png')


    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)

    //keys
    this.right = this.input.keyboard.addKey('RIGHT')
    this.left = this.input.keyboard.addKey('LEFT')
    this.up = this.input.keyboard.addKey('UP')
    this.down = this.input.keyboard.addKey('DOWN')
    this.enter = this.input.keyboard.addKey('ENTER')
  }

  public create() {
    this.menuMusic = this.sound.add('menuMusic', this.config);
    this.menuMusic.play();

    this.add.image(400, 300, 'bgMenu');


    this.add.image(190, 60, 'titleLevel').setOrigin(0)

    this.add.text(210, 560, "Pressione Enter para selecionar", { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' });


    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start('SelectCharacterScene')
    }, this);

    this.level1 = this.add.image(230, 260, 'level1')
    this.level2 = this.add.image(520, 260, 'level2')
    this.level3 = this.add.image(230, 440, 'level3')
    this.level4 = this.add.image(520, 440, 'level4')



    this.block = this.add.image(230, 260, 'orangeBlock')

    this.level1.setInteractive();
    this.level1.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start("Level1Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
    }, this);

    this.level2.setInteractive();
    this.level2.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start("Level2Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
    }, this);

    this.level3.setInteractive();
    this.level3.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start("Level3Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
    }, this);

    this.level4.setInteractive();
    this.level4.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.stop("SelectLevelScene")
      this.scene.start("Level4Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
    }, this);


  }

  public update() {

    if (this.right.isDown && this.blockPosition == 1) {
      this.block.setX(520);
      this.blockPosition = 2;
    }
    else if (this.right.isDown && this.blockPosition == 3) {
      this.block.setX(520);
      this.blockPosition = 4;
    }
    else if (this.left.isDown && this.blockPosition == 2) {
      this.block.setX(230);
      this.blockPosition = 1;
    }
    else if (this.left.isDown && this.blockPosition == 4) {
      this.block.setX(230);
      this.blockPosition = 3;
    }
    else if (this.up.isDown && this.blockPosition == 3) {
      this.block.setY(260);
      this.blockPosition = 1;
    }
    else if (this.up.isDown && this.blockPosition == 4) {
      this.block.setY(260);
      this.blockPosition = 2;
    }
    else if (this.down.isDown && this.blockPosition == 1) {
      this.block.setY(440);
      this.blockPosition = 3;
    }
    else if (this.down.isDown && this.blockPosition == 2) {
      this.block.setY(440);
      this.blockPosition = 4;
    }


    if (this.enter.isDown) {
      if (this.blockPosition == 1) {
        this.menuMusic.stop();
        this.scene.start("Level1Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
      } 
      else if (this.blockPosition == 2) {
        this.menuMusic.stop();
        this.scene.start("Level2Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
      } 
      else if (this.blockPosition == 3) {
        this.menuMusic.stop();
        this.scene.start("Level3Scene", { playerName: this.playerName, leaderboard: this.leaderboard});
      }
      else if (this.blockPosition == 4) {
        this.menuMusic.stop();
        this.scene.start("Level4Scene", { playerName: this.playerName, leaderboard: this.leaderboard });
      }
    }

  }

}