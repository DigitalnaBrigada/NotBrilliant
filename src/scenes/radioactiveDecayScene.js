import Phaser from 'phaser';

export default class RadioactiveDecayScene extends Phaser.Scene {
    constructor() {
        super('RadioactiveDecayScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        this.add.rectangle(0, 0, width, height, 0x101010).setOrigin(0);

        this.add.text(width / 2, 60, 'Radioaktivni Razpad – Polovični Čas', {
            fontSize: '36px',
            color: '#ffffff'
        }).setOrigin(0.5);

        this.createBackButton();

        // Initial random assignment
        this.N0 = Phaser.Math.Between(1000, 5000);
        this.halfLife = Phaser.Math.Between(3, 12); // seconds
        this.timePassed = 0;

        this.generateAssignment();

        this.setupDecayGraph(width / 2, height / 2);
    }

    createBackButton() {
        const btn = this.add.rectangle(120, 60, 160, 50, 0x4a90e2, 0.9)
            .setInteractive({ useHandCursor: true });

        this.add.text(120, 60, 'Nazaj', {
            fontSize: '22px',
            color: '#fff'
        }).setOrigin(0.5);

        btn.on('pointerover', () => btn.setFillStyle(0x3b73b6));
        btn.on('pointerout', () => btn.setFillStyle(0x4a90e2));
        btn.on('pointerdown', () => this.scene.start('LabScene'));
    }

    setupDecayGraph(x, y) {
        this.graph = this.add.graphics();
        this.text = this.add.text(x, y + 150, '', {
            fontSize: '22px',
            color: '#fff'
        }).setOrigin(0.5);

        this.assignmentText = this.add.text(
            x + 300, y - 50, '', { fontSize: '18px', color: '#ffffff', wordWrap: { width: 300 } }
        ).setOrigin(0, 0);

        // Slider DOM
        this.halfLifeInput = this.add.dom(x, y + 100).createFromHTML(`
            <input type="range" min="1" max="12" value="${this.halfLife}" style="width: 220px;">
        `);

        this.halfLifeInput.addListener('input');
        this.halfLifeInput.on('input', () => {
            this.halfLife = Number(this.halfLifeInput.node.querySelector('input').value);
            // Update assignment if the user changes half-life
            this.generateAssignment();
        });

        // Time loop for graph
        this.time.addEvent({
            delay: 100,
            loop: true,
            callback: () => {
                this.timePassed += 0.1;
                this.drawDecay(x, y);
            }
        });
    }

    drawDecay(x, y) {
        const N = this.N0 * Math.pow(0.5, this.timePassed / this.halfLife);

        this.graph.clear();
        this.graph.lineStyle(3, 0x4a90e2);

        // Axes
        this.graph.lineStyle(2, 0xffffff, 0.5);
        this.graph.beginPath();
        this.graph.moveTo(x - 150, y + 40); // origin
        this.graph.lineTo(x + 150, y + 40); // x-axis
        this.graph.lineTo(x + 145, y + 35);
        this.graph.moveTo(x + 150, y + 40);
        this.graph.lineTo(x + 145, y + 45);
        this.graph.strokePath();

        this.graph.beginPath();
        this.graph.moveTo(x - 150, y + 40); // origin
        this.graph.lineTo(x - 150, y - 60); // y-axis
        this.graph.lineTo(x - 155, y - 55);
        this.graph.moveTo(x - 150, y - 60);
        this.graph.lineTo(x - 145, y - 55);
        this.graph.strokePath();

        // Decay curve
        this.graph.lineStyle(3, 0x4a90e2);
        this.graph.beginPath();
        for (let t = 0; t <= this.timePassed; t += 0.1) {
            const value = this.N0 * Math.pow(0.5, t / this.halfLife);
            const px = x - 150 + (t * 18);
            const py = y + 40 - (value / this.N0) * 100;
            if (t === 0) this.graph.moveTo(px, py);
            else this.graph.lineTo(px, py);
        }
        this.graph.strokePath();

        this.text.setText(
            `Preostalo število atomov: ${Math.round(N)}\n` +
            `T = ${this.timePassed.toFixed(1)} s`
        );

        // Show assignment
        this.assignmentText.setText(
            `Izračunajte preostalo število atomov po T sekundah.\n` +
            `Začetno število N0 = ${this.N0}\n` +
            `Polovični čas T1/2 = ${this.halfLife} s\n` +
            `Uporabite formulo: N = N0 * (1/2)^(t / T1/2)`
        );
    }

    generateAssignment() {
        this.assignmentTime = Phaser.Math.Between(5, 20); // seconds
    }
}
