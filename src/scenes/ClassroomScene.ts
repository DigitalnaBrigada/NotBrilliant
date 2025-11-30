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
        this.createDoor(width, height);


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

    private createDoor(width: number, height: number) {
        const doorX = width * 0.8;
        const doorY = height * 0.55;
        const doorWidth = width * 0.18;
        const doorHeight = height * 0.5;
        const keypadX = doorX + doorWidth * 0.77;
        const keypadY = doorY - height * 0.05;

        const door = this.add.rectangle(
            doorX,
            doorY,
            doorWidth,
            doorHeight,
            0x607d8b
        );

        const frame = this.add.rectangle(
            doorX,
            doorY,
            doorWidth,
            doorHeight
        );
        frame.setStrokeStyle(width * 0.004, 0x37474f);

        for (let i = 0; i < 13; i++) {
            const rivetL = this.add.circle(
                doorX - doorWidth * 0.45,
                doorY - doorHeight * 0.45 + (i * doorHeight * 0.075),
                width * 0.004,
                0x546e7a
            );
            rivetL.setStrokeStyle(width * 0.001, 0x37474f);
        }

        for (let i = 0; i < 13; i++) {
            const rivetR = this.add.circle(
                doorX + doorWidth * 0.45,
                doorY - doorHeight * 0.45 + (i * doorHeight * 0.075),
                width * 0.004,
                0x546e7a
            );
            rivetR.setStrokeStyle(width * 0.001, 0x37474f);
        }


        const label = this.add.rectangle(
            doorX,
            doorY - doorHeight * 0.35,
            doorWidth * 0.66,
            height * 0.025,
            0xfacc15
        );

        const labelText = this.add.text(
            doorX,
            doorY - doorHeight * 0.35,
            'AUTHORIZED PERSONNEL ONLY',
            {
                fontSize: `${width * 0.007}px`,
                color: '#000000'
            }
        ).setOrigin(0.5);

        const windowRect = this.add.rectangle(
            doorX,
            doorY - doorHeight * 0.2,
            doorWidth * 0.65,
            height * 0.1,
            0x1a237e,
            0.4
        );
        windowRect.setStrokeStyle(width * 0.003, 0x37474f);

        const graphics = this.add.graphics();
        graphics.lineStyle(1, 0x263238, 0.3);

        for (let i = 0; i < 8; i++) {
            const y = doorY - doorHeight * 0.25 + (i * height * 0.0125);
            graphics.lineBetween(
                doorX - doorWidth * 0.325,
                y,
                doorX + doorWidth * 0.325,
                y
            );
        }

        for (let i = 0; i < 12; i++) {
            const x = doorX - doorWidth * 0.325 + (i * doorWidth * 0.054);
            graphics.lineBetween(
                x,
                doorY - doorHeight * 0.25,
                x,
                doorY - doorHeight * 0.15
            );
        }

        const hinge1 = this.add.rectangle(doorX - doorWidth * 0.5, doorY - doorHeight * 0.3, width * 0.005, height * 0.02, 0x616161);
        const hinge2 = this.add.rectangle(doorX - doorWidth * 0.5, doorY, width * 0.005, height * 0.02, 0x616161);
        const hinge3 = this.add.rectangle(doorX - doorWidth * 0.5, doorY + doorHeight * 0.3, width * 0.005, height * 0.02, 0x616161);
    }


    private handleResize() {
        this.scene.restart();
    }

    destroy() {
        super.destroy();
    }
}