import Phaser from 'phaser';

export default class PhysicsPulleyScene extends Phaser.Scene {
    constructor() {
        super('PhysicsPulleyScene');
    }

    preload() {
        this.load.image('pulleyWheel', 'src/assets/pulleyWheel.png');
        this.load.image('weight', 'src/assets/weight.png');
        this.load.image('telescope', 'src/assets/telescope.png');
    }

    create() {
        const { width, height } = this.cameras.main;

        // background
        this.add.rectangle(0, 0, width, height, 0xf2f2f2).setOrigin(0);

        // pulley wheels (default = 1)
        this.numWheels = 1;
        this.wheels = [];

        const centerX = width / 2;
        const topY = 150;

        this.createPulleySystem(centerX, topY);

        // weight hanging down
        this.weight = this.add.image(centerX, topY + 200, 'weight').setScale(0.6);

        // info text
        this.forceText = this.add.text(width / 2, height - 100, '', {
            fontSize: '26px',
            color: '#000'
        }).setOrigin(0.5);

        this.updateForceLabel();

        // buttons to modify wheels
        this.addButton(width / 2 - 120, height - 50, '- Kolo', () => {
            if (this.numWheels > 1) {
                this.numWheels--;
                this.rebuildPulley(centerX, topY);
            }
        });

        this.addButton(width / 2 + 120, height - 50, '+ Kolo', () => {
            if (this.numWheels < 6) {
                this.numWheels++;
                this.rebuildPulley(centerX, topY);
            }
        });

        // telescope for switching scene
        const telescope = this.add.image(width - 120, 120, 'telescope').setScale(0.5)
            .setInteractive({ useHandCursor: true });

        telescope.on('pointerdown', () => {
            this.cameras.main.fade(300, 0, 0, 0);
            this.time.delayedCall(300, () => {
                this.scene.start('ModernPhysicsScene');
            });
        });
    }

    createPulleySystem(x, y) {
        this.wheels = [];
        const spacing = 70;
        for (let i = 0; i < this.numWheels; i++) {
            const wheel = this.add.image(x, y + i * spacing, 'pulleyWheel').setScale(0.5);
            this.wheels.push(wheel);
        }
    }

    rebuildPulley(x, y) {
        this.wheels.forEach(w => w.destroy());
        this.createPulleySystem(x, y);
        this.updateForceLabel();
    }

    updateForceLabel() {
        // Basic physics: mechanical advantage = number of rope segments
        const ropeSegments = this.numWheels * 2;
        const force = (100 / ropeSegments).toFixed(1); // assume 100N weight for clarity
        this.forceText.setText(`Število kolesc: ${this.numWheels} | Sila na vrvi: ${force} N`);
    }

    addButton(x, y, label, callback) {
        const bg = this.add.rectangle(x, y, 120, 40, 0x4a90e2, 0.9)
            .setInteractive({ useHandCursor: true });
        const txt = this.add.text(x, y, label, {
            fontSize: '20px',
            color: '#fff'
        }).setOrigin(0.5);

        bg.on('pointerover', () => bg.setFillStyle(0x3b73b6));
        bg.on('pointerout', () => bg.setFillStyle(0x4a90e2));
        bg.on('pointerdown', callback);
    }
}
