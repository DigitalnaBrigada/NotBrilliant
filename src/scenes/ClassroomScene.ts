import Phaser from 'phaser';

export default class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({key: 'ClassroomScene'});
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.createBackground(width, height);
        this.createMonitor(width, height);


        this.scale.on('resize', this.handleResize, this);
    }

    private createBackground(width: number, height: number) {
        const floorHeight = height * 0.2;
        const floorGradient = this.add.rectangle(
            width / 2,
            height - floorHeight / 2,
            width,
            floorHeight,
            0x607d8b
        );

        const wallHeight = height * 0.8;
        const wall = this.add.rectangle(
            width / 2,
            wallHeight / 2,
            width,
            wallHeight,
            0xc5ccd1
        );

        const light1 = this.add.rectangle(width * 0.28, height * 0.05, width * 0.15, height * 0.01, 0xffffff, 0.4);
        light1.setBlendMode(Phaser.BlendModes.ADD);

        const light2 = this.add.rectangle(width * 0.72, height * 0.05, width * 0.15, height * 0.01, 0xffffff, 0.4);
        light2.setBlendMode(Phaser.BlendModes.ADD);
    }

    private createMonitor(width: number, height: number) {
        const monitorX = width * 0.25;
        const monitorY = height * 0.25;
        const monitorWidth = width * 0.35;
        const monitorHeight = height * 0.35;

        const topWidth = width * 0.04;
        const bottomWidth = width * 0.02;
        const standHeight = height * 0.03;

        const trapezoidPoints = [
            -bottomWidth / 2, standHeight / 2,   // bottom left
            bottomWidth / 2, standHeight / 2,   // bottom right
            topWidth / 2, -standHeight / 2,   // top right
            -topWidth / 2, -standHeight / 2    // top left
        ];

        const leftStand = this.add.polygon(
            monitorX - width * 0.04,
            monitorY + monitorHeight / 2 + height * 0.02,
            trapezoidPoints,
            0x263238
        );

        const rightStand = this.add.polygon(
            monitorX + 2 * width * 0.04,
            monitorY + monitorHeight / 2 + height * 0.02,
            trapezoidPoints,
            0x263238
        );

        const bezel = this.add.rectangle(
            monitorX,
            monitorY,
            monitorWidth,
            monitorHeight,
            0x37474f
        );

        const screen = this.add.rectangle(
            monitorX,
            monitorY,
            monitorWidth * 0.92,
            monitorHeight * 0.92,
            0x1a1f24
        );

        const glare = this.add.triangle(
            monitorX - monitorWidth * 0.3,
            monitorY - monitorHeight * 0.3,
            0, 0,
            monitorWidth * 0.4, 0,
            0, monitorHeight * 0.4,
            0xffffff,
            0.05
        );

        const topBarText = this.add.text(
            monitorX - monitorWidth * 0.42,
            monitorY - monitorHeight * 0.4,
            'MathLab',
            {
                fontSize: `${width * 0.01}px`,
                color: '#60a5fa'
            }
        );

        const connectedDot = this.add.circle(
            monitorX + monitorWidth * 0.25,
            monitorY - monitorHeight * 0.4,
            width * 0.004,
            0x22c55e
        );

        const connectedText = this.add.text(
            monitorX + monitorWidth * 0.27,
            monitorY - monitorHeight * 0.42,
            'Connected',
            {
                fontSize: `${width * 0.01}px`,
                color: '#60a5fa'
            }
        );

        const bottomText = this.add.text(
            monitorX - monitorWidth * 0.42,
            monitorY + monitorHeight * 0.38,
            'Lab Station 03',
            {
                fontSize: `${width * 0.008}px`,
                color: '#9ca3af'
            }
        );

        const powerLED = this.add.circle(
            monitorX + monitorWidth * 0.48,
            monitorY + monitorHeight * 0.47,
            width * 0.003,
            0x22c55e
        );
        powerLED.setBlendMode(Phaser.BlendModes.ADD);

    }


    private handleResize() {
        this.scene.restart();
    }

    destroy() {
        super.destroy();
    }
}