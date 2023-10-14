import WebFontFile from "../inputs/WebfontFile";

import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components'
import { v4 as uuidv4 } from 'uuid';

import Score from "../gameObjects/Score";

// declare firebase to resolve TypeScript error
declare const firebase: any

var firebaseConfig = {
  apiKey: "AIzaSyDTYiyAoCDSP3kjmC-CoucQTbWc4ZAbZM0",
  authDomain: "estacoes-c9bed.firebaseapp.com",
  projectId: "estacoes-c9bed",
  storageBucket: "estacoes-c9bed.appspot.com",
  messagingSenderId: "951179728056",
  appId: "1:951179728056:web:b1555e56b38d577fbbd04d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class ScoreBoardScene extends Phaser.Scene {

  private leaderboard: any

  private newScore: number
  private userName: string
  private level: string

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

  constructor() {
    super({ key: "ScoreBoardScene" });

  }

  init(data: { score: Score, userName: string, level: string }) {
    const db = firebase.firestore();

    this.newScore = data.score.getScore()
    this.userName = data.userName
    this.level = data.level

    this.leaderboard = new LeaderBoard({
      root: 'leaderboard'
    })

    const userID = uuidv4(); // This generates a unique UUID as the user ID
    const newUserData = {
      score: this.newScore,
      userId: userID,
      userName: this.userName,
      level: this.level,
    };

    const userDocumentRef = db.collection('leaderboard').doc(userID);

    userDocumentRef.set(newUserData)
      .then(() => {
        console.log('New user document created successfully.');
      })
      .catch((error) => {
        console.error('Error creating new user document:', error);
      });


  }

  public preload() {
    this.load.audio('menuMusic', '../../assets/audio/musicMenu.mp3');
    this.load.image('bgMenu', '../../assets/backgrounds/menuBackground.png');
    this.load.image('back', '../../assets/images/back.png')
    this.load.image('titleScore', '../../assets/images/PLACAR.png')
    this.load.image('logo', '../../assets/images/logo.png');

    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)
  }

  public async create() {

    this.menuMusic = this.sound.add('menuMusic', this.config);
    this.menuMusic.play();

    this.add.image(400, 300, 'bgMenu');
    this.add.image(400, 150, 'logo')


    this.add.image(260, 200, 'titleScore').setOrigin(0)

    var backButton = this.add.image(50, 50, 'back').setScale(0.05);
    backButton.setInteractive();
    backButton.on('pointerdown', function () {
      this.menuMusic.stop();
      this.scene.start('MenuScene')
    }, this);

    this.add.text(100, 280, 'NOME', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })
    this.add.text(330, 280, 'SCORE', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })
    this.add.text(560, 280, 'FASE', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })

    const scores = await this.leaderboard.loadFirstPage()
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



  }

  public update() {

  }

}