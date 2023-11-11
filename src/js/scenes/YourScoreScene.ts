import Score from "../gameObjects/Score";

import WebFontFile from "../inputs/WebfontFile";

import { v4 as uuidv4 } from 'uuid';

declare const firebase: any
var firebaseConfig = {
    apiKey: process.env.API_KEY as string,
    authDomain: process.env.AUTH_DOMAIN as string,
    projectId: process.env.PROJECT_ID as string,
    storageBucket: process.env.STORAGE_BUCKET as string,
    messagingSenderId: process.env.MESSAGING_SENDER_ID as string,
    appId: process.env.APP_ID as string
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

  private userInputPosition1!: Phaser.GameObjects.Text
  private userInputPosition2!: Phaser.GameObjects.Text
  private userInputPosition3!: Phaser.GameObjects.Text

  private testFinish!: Phaser.GameObjects.Text

  private padDownActionExecuted = false;
  private padUpActionExecuted = false;
  private padEnterDownActionExecuted = false;

  private counter = 0
  private finish: number;
  private alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


  constructor() {
    super({ key: "YourScoreScene" });
    this.finish = 0;
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

    this.userInputPosition1 = this.add.text(350, 450, '', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' }).setVisible(false)
    this.userInputPosition2 = this.add.text(375, 450, '', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' }).setVisible(false)
    this.userInputPosition3 = this.add.text(400, 450, '', { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' }).setVisible(false)

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

  public collectUserName() {
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

  public handleDatabaseInsert() {
    
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

  public displayNewRecordTexts() {
    this.add.image(275, 60, 'titleYourScore').setOrigin(0)

    this.add.image(70, 200, 'scoreBlock').setOrigin(0)

    this.add.text(390, 270, this._score.getScore().toString(), { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' }).setOrigin(0.5);

    this.add.text(190, 540, "Pressione Enter para seguir", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });
    this.add.text(290, 220, "Novo recorde!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' });

    this.add.text(160, 350, "Parabéns por entrar no TOP 5!", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
    this.add.text(280, 390, "Digite seu nome:", { fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#000000' })
    this.add.text(350, 460, "___", { fontFamily: '"Press Start 2P"', fontSize: '24px', color: '#000000' })
  }

  public update() {

    if (this.checkGamepadsExists()) {
      this.checkGamepads();
    }


  }

  public checkGamepadsExists() {
    const gamepads = navigator.getGamepads();

    if (gamepads[0] != null) {
      return true
    } else {
      return false
    }
  }

  public checkGamepads() {
    const gamepads = navigator.getGamepads();

    this.userInputPosition1.setVisible(true)
    this.userInputPosition2.setVisible(true)
    this.userInputPosition3.setVisible(true)


    for (const gamepad of gamepads) {
      if (gamepad) {
        if (gamepad.buttons[0].pressed) {
          if (!this.padEnterDownActionExecuted) {

            if (this.aux == 5) {
              this.musicMenu.stop();
              this.scene.start("MenuScene");
            }

            this.counter = 0;
            if (this.finish == 0) {
              this.finish = 1;

            } else if (this.finish == 1) {
              this.finish = 2;
            } else if (this.finish == 2) {
              this.userName = this.userInputPosition1.text + this.userInputPosition2.text + this.userInputPosition3.text;
              this.handleDatabaseInsert();
            }

            this.padEnterDownActionExecuted = true;
          }
        } else {
          this.padEnterDownActionExecuted = false
        }

        if (gamepad.buttons[12].pressed) {
          //up
          if (!this.padUpActionExecuted) {
            if (this.finish == 0) {
              if (this.userInputPosition1.text.length > 0) {
                this.userInputPosition1.text = this.userInputPosition1.text.slice(0, -1);
              }
              this.userInputPosition1.text = this.alphabet[this.counter]
              if (this.counter == 0) {
                this.counter = this.alphabet.length;
              } else {
                this.counter--
              }

            } else if (this.finish == 1) {
              if (this.userInputPosition2.text.length > 0) {
                this.userInputPosition2.text = this.userInputPosition2.text.slice(0, -2);
              }
              this.userInputPosition2.text = this.alphabet[this.counter]
              if (this.counter == 0) {
                this.counter = this.alphabet.length;
              } else {
                this.counter--
              }

            } else if (this.finish == 2) {
              if (this.userInputPosition3.text.length > 0) {
                this.userInputPosition3.text = this.userInputPosition3.text.slice(0, -1);
              }
              this.userInputPosition3.text = this.alphabet[this.counter]
              if (this.counter == 0) {
                this.counter = this.alphabet.length;
              } else {
                this.counter--
              }

            }

            this.padUpActionExecuted = true;
          }
        } else {
          this.padUpActionExecuted = false
        }

        if (gamepad.buttons[13].pressed) {
          //down
          if (!this.padDownActionExecuted) {
            if (this.finish == 0) {
              if (this.userInputPosition1.text.length > 0) {
                this.userInputPosition1.text = this.userInputPosition1.text.slice(0, -1);
              }
              this.userInputPosition1.text = this.alphabet[this.counter]
              if (this.counter == this.alphabet.length) {
                this.counter = 0;
              } else {
                this.counter++
              }

            } else if (this.finish == 1) {
              if (this.userInputPosition2.text.length > 0) {
                this.userInputPosition2.text = this.userInputPosition2.text.slice(0, -2);
              }
              this.userInputPosition2.text = this.alphabet[this.counter]
              if (this.counter == this.alphabet.length) {
                this.counter = 0;
              } else {
                this.counter++
              }

            } else if (this.finish == 2) {
              if (this.userInputPosition3.text.length > 0) {
                this.userInputPosition3.text = this.userInputPosition3.text.slice(0, -1);
              }
              this.userInputPosition3.text = this.alphabet[this.counter]
              if (this.counter == this.alphabet.length) {
                this.counter = 0;
              } else {
                this.counter++
              }

            }

            this.padDownActionExecuted = true;
          }
        } else {
          this.padDownActionExecuted = false
        }

      }
    }

  }
  





}





