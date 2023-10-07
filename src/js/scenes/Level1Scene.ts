import Players from "../gameObjects/Players";
import Score from "../gameObjects/Score";
import Platform from "../gameObjects/Platform";
import Icons from "../gameObjects/Icons";


export default class Level1Scene extends Phaser.Scene {

    private musicLevel1!: Phaser.Sound.BaseSound 
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

    private _player: Players
    private playerName: string

    //keys
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
    F: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;

    private _score: Score

    private _platform: Platform

    private _springIconGroup: Icons
    private _summerIconGroup: Icons
    private _fallIconGroup: Icons
    private _winterIconGroup: Icons


    constructor() {
        super({ key: "Level1Scene"});
        
      }

    init(data) {
        this.playerName = data.playerName;
    }

    public preload() {
        this.load.audio('musicLevel1', '../../assets/audio/musicLevel1.mp3');
        this.load.image('backgroundLevel1', '../../assets/backgrounds/level1Background.jpg');
        
        this.load.spritesheet('junior', '../../assets/images/junior.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('sandy', '../../assets/images/sandy.png', { frameWidth: 32, frameHeight: 48 });

        this.load.image('springIcon', '../../assets/images/springIcon.png');
        this.load.image('summerIcon', '../../assets/images/summerIcon.png');
        this.load.image('fallIcon', '../../assets/images/fallIcon.png');
        this.load.image('winterIcon', '../../assets/images/winterIcon.png');

        //keys
        this.A = this.input.keyboard.addKey('A')
        this.S = this.input.keyboard.addKey('S')
        this.D = this.input.keyboard.addKey('D')
        this.F = this.input.keyboard.addKey('F')
        this.left = this.input.keyboard.addKey('LEFT')
        this.right = this.input.keyboard.addKey('RIGHT')
        this.space = this.input.keyboard.addKey('SPACE')
        this.enter = this.input.keyboard.addKey('ENTER')
    }
  
    public create() {
        this.musicLevel1 = this.sound.add('musicLevel1', this.config);
        this.musicLevel1.play();

        this.add.image(400, 300, 'backgroundLevel1').setScale(0.3);
        
        this._score = new Score(this, 16, 16).setDepth(1);

        this._player = new Players(this, 100, 580, this.playerName).setDepth(1);

        this._platform = new Platform(this.physics.world, this);
        
        this._springIconGroup = new Icons(this, this._score, this.A)
        this._springIconGroup.create(200, -30, 'springIcon').setScale(0.15);
        this._springIconGroup.handleIconFalling(5000, 200, -30, 'springIcon', 43);
        this._springIconGroup.handlePlayerOverlap(this._player)
        this._springIconGroup.handlePlatformOverlap(this._platform)
    

        this._summerIconGroup = new Icons(this, this._score, this.S)
        this._summerIconGroup.handleIconFalling(17000, 340, -30, 'summerIcon', 10)
        this._summerIconGroup.handlePlayerOverlap(this._player)
        this._summerIconGroup.handlePlatformOverlap(this._platform)

        this._fallIconGroup = new Icons(this, this._score, this.D)
        this._fallIconGroup.handleIconFalling(23000, 470, -30, 'fallIcon', 8)
        this._fallIconGroup.handlePlayerOverlap(this._player)
        this._fallIconGroup.handlePlatformOverlap(this._platform)

        this._winterIconGroup = new Icons(this, this._score, this.F)
        this._winterIconGroup.handleIconFalling(29000, 600, -30, 'winterIcon', 6)
        this._winterIconGroup.handlePlayerOverlap(this._player)
        this._winterIconGroup.handlePlatformOverlap(this._platform)
        
        this.physics.add.collider(this._player, this._platform);

        this.time.addEvent({
            delay: this.musicLevel1.duration*1000,
            loop: false,
            callback: () => {
                this.scene.start("YourScoreScene",  {score: this._score });
            }
        })

    }

    public update(){
        if (this.left.isDown && this.space.isDown)
        {
            this._player.setState("runningleft")
        }
        else if (this.left.isDown) {
            this._player.setState("walkingleft")
        }
        else if (this.right.isDown && this.space.isDown)
        {
            this._player.setState("runningright")
        }
        else if (this.right.isDown) {
            this._player.setState("walkingright")
        }
        else
        {
            this._player.setState("turn")
        }

        if (this._score.getGameOverScore() >= 1650) {
            this.musicLevel1.stop();
            this.scene.start('GameOverScene');
        }
        
    }

  }
  