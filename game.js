class SceneA extends Phaser.Scene {

    constructor() {
        super({ key: 'sceneA' });
    }

    preload() {
        this.load.image('rolly', 'assets/rolly.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#add8e6'); // light blue background

        let titleText = this.add.text(400, 100, 'Roly Poly: To the End', { 
            font: '52px Arial', 
            color: '#ffffff',
            align: 'center', 
            fontWeight: 'bold' 
        }).setOrigin(0.5);

        let playText = this.add.text(400, 400, 'PLAY', { 
            font: '20px Arial',
            color: '#ffxxff',
            align: 'center'
        }).setOrigin(0.5);

        playText.setInteractive({ useHandCursor: true });

        playText.on('pointerover', () => { 
            playText.setFontSize(30);
        });

        playText.on('pointerout', () => { 
            playText.setFontSize(20);
        });

        playText.on('pointerdown', () => { 
            this.scene.start('sceneB');
        });

        // Add rolly sprite
        this.rolly = this.add.sprite(config.width, config.height / 2, 'rolly').setScale(0.5); // adjust scale as needed

        // Create tween to move rolly from right to left
        this.tweens.add({
            targets: this.rolly,
            x: -this.rolly.displayWidth,
            duration: 5000,
            repeat: -1
        });
    }
}

class SceneB extends Phaser.Scene {

    constructor() {
        super({ key: 'sceneB' });
    }

    preload() {
        this.load.image('rolly', 'assets/rolly.png');
        this.load.image('coin', 'assets/coin.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#FFFF00'); // yellow background

        // Display "You Win!" text
        let winText = this.add.text(config.width / 2, config.height / 2, 'You Win!', { 
            font: '52px Arial', 
            color: '#000000',
            align: 'center', 
            fontWeight: 'bold' 
        }).setOrigin(0.5);

        // Add rolly sprite with physics
        this.rolly = this.physics.add.sprite(200, config.height / 2, 'rolly').setScale(0.5); // adjust scale as needed
        this.rolly.setCollideWorldBounds(true); // ensures rolly won't fall out of the world

        // Add coin sprite with physics
        this.coin = this.physics.add.sprite(400, config.height / 2, 'coin').setScale(0.5); // adjust scale as needed
        this.coin.setCollideWorldBounds(true); // ensures coin won't fall out of the world

        // Let's make both rolly and coin jump in a loop
        this.time.addEvent({
            delay: 2000, // in ms
            callback: () => {
                this.rolly.setVelocityY(-200); // this velocity value might need adjustment
                this.coin.setVelocityY(-200);  // this velocity value might need adjustment
            },
            loop: true
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 } // added some gravity
        }
    },
    scene: [SceneA, SceneB]
};

let game = new Phaser.Game(config);
