import Score from "../gameObjects/Score";

import WebFontFile from "../inputs/WebfontFile";

import { v4 as uuidv4 } from 'uuid';




declare const firebase: any
console.log(process.env.apiKey);
console.log(process.env.authDomain);
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class YourScoreScene extends Phaser.Scene {

  private leaderboard: any

  private userName: string

  private _score: Score
  private level: string

  private musicMenu!: Phaser.Sound.BaseSound

  private aux: number


  constructor() {
    super({ key: "YourScoreScene" });
  }

  init(data) {
    this._score = data.score;
    this.level = data.level
    this.leaderboard = data.leaderboard
    this.musicMenu = data.musicMenu
  }


  public preload() {
    //font
    const fonts = new WebFontFile(this.load, 'Press Start 2P');
    this.load.addFile(fonts)

    this.aux = 0
  }

  public async create() {
    this.musicMenu.play();

    this.add.image(400, 300, 'bg_menu');

    const scores = await this.leaderboard.loadFirstPage()
    if (scores.length >= 5) {
      scores.sort((a, b) => b.score - a.score);

      //top 5 score
      for (let i = 0; i < 5; ++i) {
        this.aux = this.aux + 1

        const scoreItem = scores[i]

        if (this._score.getScore() > scoreItem.score) {

          this.displayNewRecordTexts()

          var db = firebase.firestore();
          var docRef = db.collection("leaderboard").doc(scoreItem.userId);
          docRef.delete()
            .then(function () {
              console.log("Document deleted successfully");
            })
            .catch(function (error) {
              console.error("Error deleting document: " + error);
            });

          this.collectUserName()

          break
        }

      }



    } else {
      this.displayNewRecordTexts()
      this.collectUserName()
    }

    if (this.aux == 5) {
      this.add.image(275, 60, 'titleYourScore').setOrigin(0)
      this.add.image(70, 200, 'scoreBlock').setOrigin(0)

      this.add.text(375, 260, this._score.getScore().toString(), { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' });
      this.add.text(190, 540, "Pressione Enter para seguir", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });
      this.add.text(290, 220, "Sua pontuação:", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });
      this.add.text(200, 350, "Parabéns pelo resultado!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
      this.input.keyboard.on('keydown', (event) => { // Use an arrow function
        if (event.key === 'Enter') {
          this.musicMenu.stop();
          this.scene.start("MenuScene");
        }
      });
    }

  }

  collectUserName() {
    const userInput = this.add.text(350, 450, '', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' });

    this.input.keyboard.on('keydown', (event) => { // Use an arrow function
      if (event.key === 'Enter' && userInput.text.length > 0) {
        const enteredText = userInput.text;
        this.userName = enteredText;
        this.handleDatabaseInsert(); // Call the method using 'this'
      } else if (event.key.length === 1 && userInput.text.length < 3) {
        userInput.text += event.key;
      } else if (event.key === 'Backspace' && userInput.text.length > 0) {
        userInput.text = userInput.text.slice(0, -1);
      }
    });
  }


  handleDatabaseInsert() {

    this.aux = 1;

    const db = firebase.firestore();

    const userID = uuidv4();
    const newUserData = {
      score: this._score.getScore(),
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

    this.musicMenu.stop();
    this.scene.start("ScoreBoardScene", {
      leaderboard: this.leaderboard,
      musicMenu: this.musicMenu
    });
  }

  displayNewRecordTexts() {
    this.add.image(275, 60, 'titleYourScore').setOrigin(0)

    this.add.image(70, 200, 'scoreBlock').setOrigin(0)

    this.add.text(375, 260, this._score.getScore().toString(), { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' });

    this.add.text(190, 540, "Pressione Enter para seguir", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });
    this.add.text(290, 220, "Novo recorde!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });

    this.add.text(160, 350, "Parabéns por entrar no TOP 5!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
    this.add.text(280, 390, "Digite seu nome:", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
    //this.add.text(350, 450, "MEL", { fontFamily: '"Press Start 2P"' ,fontSize: '24px', color: '#000000' })
    this.add.text(350, 460, "___", { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })
  }



  public update() {

  }

}