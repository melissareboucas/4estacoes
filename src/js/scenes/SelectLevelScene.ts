import WebFontFile from "../inputs/WebfontFile";

export default class SelectLevelScene extends Phaser.Scene {

  private leaderboard: any

  private musicMenu!: Phaser.Sound.BaseSound
  private musicLevel1: Phaser.Sound.BaseSound
  private musicLevel2!: Phaser.Sound.BaseSound
  private musicLevel3!: Phaser.Sound.BaseSound
  private musicLevel4!: Phaser.Sound.BaseSound
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
    this.musicMenu = data.musicMenu
    this.musicLevel1 = data.musicLevel1
    this.musicLevel2 = data.musicLevel2
    this.musicLevel3 = data.musicLevel3
    this.musicLevel4 = data.musicLevel4
  }

  public preload() {
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
    this.blockPosition = 1;

    this.musicMenu.play();

    this.add.image(400, 300, 'bg_menu');

    this.add.image(190, 60, 'titleLevel').setOrigin(0)

    this.add.text(210, 560, "Pressione Enter para selecionar", { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' });

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.stop("SelectLevelScene")
      this.scene.start('SelectCharacterScene')
    }, this);

    this.level1 = this.add.image(230, 260, 'level1')
    this.level2 = this.add.image(520, 260, 'level2')
    this.level3 = this.add.image(230, 440, 'level3')
    this.level4 = this.add.image(520, 440, 'level4')

    this.block = this.add.image(230, 260, 'orangeBlock')

    this.level1.setInteractive();
    this.level1.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.stop("SelectLevelScene")
      this.scene.start("Level1Scene", {
        playerName: this.playerName,
        leaderboard: this.leaderboard,
        musicLevel1: this.musicLevel1,
        musicMenu: this.musicMenu
      });
    }, this);

    this.level2.setInteractive();
    this.level2.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.stop("SelectLevelScene")
      this.scene.start("Level2Scene", {
        playerName: this.playerName,
        leaderboard: this.leaderboard,
        musicLevel2: this.musicLevel2,
        musicMenu: this.musicMenu
      });
    }, this);

    this.level3.setInteractive();
    this.level3.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.stop("SelectLevelScene")
      this.scene.start("Level3Scene", {
        playerName: this.playerName,
        leaderboard: this.leaderboard,
        musicLevel3: this.musicLevel3,
        musicMenu: this.musicMenu
      });
    }, this);

    this.level4.setInteractive();
    this.level4.on('pointerdown', function () {
      this.musicMenu.stop();
      this.scene.stop("SelectLevelScene")
      this.scene.start("Level4Scene", {
        playerName: this.playerName,
        leaderboard: this.leaderboard,
        musicLevel4: this.musicLevel4,
        musicMenu: this.musicMenu
      });
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
        this.musicMenu.stop();
        this.scene.stop("SelectLevelScene")
        this.scene.start("Level1Scene", {
          playerName: this.playerName,
          leaderboard: this.leaderboard,
          musicLevel1: this.musicLevel1,
          musicMenu: this.musicMenu
        });
      }
      else if (this.blockPosition == 2) {
        this.musicMenu.stop();
        this.scene.stop("SelectLevelScene")
        this.scene.start("Level2Scene", {
          playerName: this.playerName,
          leaderboard: this.leaderboard,
          musicLevel2: this.musicLevel2,
          musicMenu: this.musicMenu
        });
      }
      else if (this.blockPosition == 3) {
        this.musicMenu.stop();
        this.scene.stop("SelectLevelScene")
        this.scene.start("Level3Scene", {
          playerName: this.playerName,
          leaderboard: this.leaderboard,
          musicLevel3: this.musicLevel3,
          musicMenu: this.musicMenu
        });
      }
      else if (this.blockPosition == 4) {
        this.musicMenu.stop();
        this.scene.stop("SelectLevelScene")
        this.scene.start("Level4Scene", {
          playerName: this.playerName,
          leaderboard: this.leaderboard,
          musicLevel4: this.musicLevel4,
          musicMenu: this.musicMenu
        });
      }
    }

  }

}