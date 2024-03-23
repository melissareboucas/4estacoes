import WebFontFile from "../inputs/WebfontFile";

export default class SelectLevelScene extends Phaser.Scene {

  private leaderboard: any

  private musicMenu!: Phaser.Sound.BaseSound
  private musicLevel1: Phaser.Sound.BaseSound
  private musicLevel2!: Phaser.Sound.BaseSound
  private musicLevel3!: Phaser.Sound.BaseSound
  private musicLevel4!: Phaser.Sound.BaseSound
  private previewLevel1!: Phaser.Sound.BaseSound
  private previewLevel2!: Phaser.Sound.BaseSound
  private previewLevel3!: Phaser.Sound.BaseSound
  private previewLevel4!: Phaser.Sound.BaseSound
  private errorSFX!: Phaser.Sound.BaseSound

  //keys
  right: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  enter: Phaser.Input.Keyboard.Key;
  esc: Phaser.Input.Keyboard.Key;

  private playerName: string

  private block!: Phaser.GameObjects.Image
  private blockPosition: number

  private level1!: Phaser.GameObjects.Image
  private level2!: Phaser.GameObjects.Image
  private level3!: Phaser.GameObjects.Image
  private level4!: Phaser.GameObjects.Image

  private aux: number

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
    this.previewLevel1 = data.previewLevel1
    this.previewLevel2 = data.previewLevel2
    this.previewLevel3 = data.previewLevel3
    this.previewLevel4 = data.previewLevel4
    this.errorSFX = data.errorSFX
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
    this.esc = this.input.keyboard.addKey('ESC')

    this.aux = 0
  }

  public create() {
    this.blockPosition = 1;

    this.add.image(400, 300, 'bg_menu');

    this.add.image(190, 60, 'titleLevel').setOrigin(0)

    this.add.text(210, 560, "Pressione Enter para selecionar", { fontFamily: '"Press Start 2P"', fontSize: '12px', color: '#000000' });

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.handleBack();
    }, this);

    this.level1 = this.add.image(230, 260, 'level1')
    this.level2 = this.add.image(520, 260, 'level2')
    this.level3 = this.add.image(230, 440, 'level3')
    this.level4 = this.add.image(520, 440, 'level4')

    this.block = this.add.image(230, 260, 'orangeBlock')

    this.level1.setInteractive();
    this.level1.on('pointerdown', function () {
      this.handleSelectLevel1();
    }, this);

    this.level2.setInteractive();
    this.level2.on('pointerdown', function () {
      this.handleSelectLevel2();
    }, this);

    this.level3.setInteractive();
    this.level3.on('pointerdown', function () {
      this.handleSelectLevel3();
    }, this);

    this.level4.setInteractive();
    this.level4.on('pointerdown', function () {
      this.handleSelectLevel4();
    }, this);


  }

  public update() {
    this.checkGamepads();

    if (this.right.isDown && this.blockPosition == 1) {
      this.handleBlockPosition2();
    }
    else if (this.right.isDown && this.blockPosition == 3) {
      this.handleBlockPosition4();
    }
    else if (this.left.isDown && this.blockPosition == 2) {
      this.handleBlockPosition1();
    }
    else if (this.left.isDown && this.blockPosition == 4) {
      this.handleBlockPosition3();
    }
    else if (this.up.isDown && this.blockPosition == 3) {
      this.handleBlockPosition1();
    }
    else if (this.up.isDown && this.blockPosition == 4) {
      this.handleBlockPosition2();
    }
    else if (this.down.isDown && this.blockPosition == 1) {
      this.handleBlockPosition3()
    }
    else if (this.down.isDown && this.blockPosition == 2) {
      this.handleBlockPosition4();
    }

    if (this.enter.isDown) {
      this.handleEnter();
    }

    if (this.esc.isDown) {
      this.handleBack();
    }


    if (this.blockPosition == 1) {
      this.handlePreviewLevel1();
    }

    if (this.blockPosition == 2) {
      this.handlePreviewLevel2();
    }

    if (this.blockPosition == 3) {
      this.handlePreviewLevel3();
    }

    if (this.blockPosition == 4) {
      this.handlePreviewLevel4();
    }

  }

  public handlePreviewLevel1() {
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    if (this.aux == 0) {
      this.previewLevel1.play();
    }
    this.aux = 1;
  }

  public handlePreviewLevel2() {
    this.previewLevel1.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    if (this.aux == 0) {
      this.previewLevel2.play();
    }
    this.aux = 1;
  }

  public handlePreviewLevel3() {
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel4.stop();
    if (this.aux == 0) {
      this.previewLevel3.play();
    }
    this.aux = 1;
  }

  public handlePreviewLevel4() {
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    if (this.aux == 0) {
      this.previewLevel4.play();
    }
    this.aux = 1;
  }

  public checkGamepads() {
    const gamepads = navigator.getGamepads();

    for (const gamepad of gamepads) {
      if (gamepad) {
        if (gamepad.buttons[1].pressed) {
          this.time.addEvent({ delay: 200, callback: this.handleBack, callbackScope: this, loop: false });
        } else if (gamepad.buttons[14].pressed) {
          //left
          if (this.blockPosition == 2) {
            this.handleBlockPosition1()
          }
          else if (this.blockPosition == 4) {
            this.handleBlockPosition3();
          }
        } else if (gamepad.buttons[15].pressed) {
          //right
          if (this.blockPosition == 1) {
            this.handleBlockPosition2();
          }
          else if (this.blockPosition == 3) {
            this.handleBlockPosition4();
          }
        } else if (gamepad.buttons[13].pressed) {
          //down
          if (this.blockPosition == 1) {
            this.handleBlockPosition3();
          }
          else if (this.blockPosition == 2) {
            this.handleBlockPosition4();
          }
        } else if (gamepad.buttons[12].pressed) {
          //up
          if (this.blockPosition == 3) {
            this.handleBlockPosition1();
          }
          else if (this.blockPosition == 4) {
            this.handleBlockPosition2();
          }
        } else if (gamepad.buttons[0].pressed) {
          //x (enter)
          this.time.addEvent({ delay: 200, callback: this.handleEnter, callbackScope: this, loop: false });
        }
      }
    }
  }

  public handleEnter(){
    if (this.blockPosition == 1) {
      this.handleSelectLevel1();
    }
    else if (this.blockPosition == 2) {
      this.handleSelectLevel2();
    }
    else if (this.blockPosition == 3) {
      this.handleSelectLevel3();
    }
    else if (this.blockPosition == 4) {
      this.handleSelectLevel4();
    }
  }

  public handleBack(){
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    this.scene.stop("SelectLevelScene")
    this.scene.start('SelectCharacterScene')
  }

  public handleSelectLevel1(){
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    this.scene.stop("SelectLevelScene")
    this.scene.start("Level1Scene", {
      playerName: this.playerName,
      leaderboard: this.leaderboard,
      musicLevel1: this.musicLevel1,
      musicMenu: this.musicMenu,
      errorSFX: this.errorSFX
    });
  }

  public handleSelectLevel2(){
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    this.scene.stop("SelectLevelScene")
    this.scene.start("Level2Scene", {
      playerName: this.playerName,
      leaderboard: this.leaderboard,
      musicLevel2: this.musicLevel2,
      musicMenu: this.musicMenu,
      errorSFX: this.errorSFX
    });
  }

  public handleSelectLevel3(){
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    this.scene.stop("SelectLevelScene")
    this.scene.start("Level3Scene", {
      playerName: this.playerName,
      leaderboard: this.leaderboard,
      musicLevel3: this.musicLevel3,
      musicMenu: this.musicMenu,
      errorSFX: this.errorSFX
    });
  }

  public handleSelectLevel4(){
    this.previewLevel1.stop();
    this.previewLevel2.stop();
    this.previewLevel3.stop();
    this.previewLevel4.stop();
    this.scene.stop("SelectLevelScene")
    this.scene.start("Level4Scene", {
      playerName: this.playerName,
      leaderboard: this.leaderboard,
      musicLevel4: this.musicLevel4,
      musicMenu: this.musicMenu,
      errorSFX: this.errorSFX
    });
  }

  public handleBlockPosition1(){
    this.block.setX(230);
    this.block.setY(260);
    this.blockPosition = 1;
    this.aux = 0
  }

  public handleBlockPosition2(){
    this.block.setX(520);
    this.block.setY(260);
    this.blockPosition = 2;
    this.aux = 0
  }

  public handleBlockPosition3(){
    this.block.setX(230);
    this.block.setY(440);
    this.blockPosition = 3;
    this.aux = 0
  }

  public handleBlockPosition4(){
    this.block.setX(520);
    this.block.setY(440);
    this.blockPosition = 4;
    this.aux = 0
  }
}