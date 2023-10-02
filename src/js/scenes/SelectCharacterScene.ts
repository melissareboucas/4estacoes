export default class SelectCharacterScene extends Phaser.Scene {

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

    private selectedPlayerName: string

    private block!: Phaser.GameObjects.Image
    private blockPosition: number

    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;

    constructor() {
        super({ key: "SelectCharacterScene"});
        this.blockPosition = 0;

      }

    public preload() {
        this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
        this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.jpg');
        this.load.spritesheet('junior', '../../assets/images/junior.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('sandy', '../../assets/images/sandy.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('block', '../../assets/images/block.png')

        //keys
        this.left = this.input.keyboard.addKey('LEFT')
        this.right = this.input.keyboard.addKey('RIGHT')
        this.enter = this.input.keyboard.addKey('ENTER')
    }
  
    public create() {
        this.menuMusic = this.sound.add('menuMusic', this.config);
        this.menuMusic.play();

        this.add.image(400, 300, 'bgMenu').setScale(0.3);
        
        this.add.image(250, 300, 'sandy').setScale(2)
        this.add.image(550, 300, 'junior').setScale(2)
        this.block = this.add.image(250, 300, 'block').setScale(3)

        
    }

    public update(){
        if (this.left.isDown && this.blockPosition != 0)
        {
            this.block.setX(250);
            this.blockPosition = 0;
        }
        else if (this.right.isDown && this.blockPosition != 1) {
            this.block.setX(550);
            this.blockPosition = 1;
        }

        if (this.enter.isDown) {
            if (this.blockPosition == 0) {
                this.selectedPlayerName = 'sandy'
            } else {
                this.selectedPlayerName = 'junior'
            }
            this.menuMusic.stop();
            this.scene.start("Level1Scene", {playerName: this.selectedPlayerName});
        }
    }

  }
  