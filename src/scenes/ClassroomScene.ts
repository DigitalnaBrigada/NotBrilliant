import Phaser from 'phaser';

export default class ClassroomScene extends Phaser.Scene {
    private keypadButton?: Phaser.GameObjects.Rectangle;
    private latexElement?: HTMLDivElement;

    private mathProblems = [
        {
            problem: '\\int_1^6 (12x^3 - 9x^2 + 2) \\, dx',
            question: '',
            hints: [
                '\\int (f(x) + g(x)) \\, dx = \\int f(x) \\, dx + \\int g(x) \\, dx',
                '\\int x^n \\, dx = \\frac{x^{n+1}}{n+1}'
            ],
            correctAnswer: '123456',
            size: 0.025
        }
    ];

    private currentProblemIndex: number = 0;

    constructor() {
        super({key: 'ClassroomScene'});
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        if (!this.latexElement) {
            this.createLatexDisplay(width, height);
        } else {
            this.updateLatexPosition(width, height);
        }

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

        const conduitStartX = doorX + doorWidth * 0.5;
        const conduitEndX = keypadX - width * 0.04;
        const conduitY = keypadY;

        const conduit = this.add.rectangle(
            (conduitStartX + conduitEndX) / 2,
            conduitY,
            conduitEndX - conduitStartX,
            height * 0.008,
            0x757575
        );

        const wireGraphics = this.add.graphics();
        wireGraphics.lineStyle(2, 0xd32f2f);
        wireGraphics.lineBetween(conduitStartX, conduitY - height * 0.005, conduitEndX, conduitY - height * 0.005);

        wireGraphics.lineStyle(2, 0x0288d1);
        wireGraphics.lineBetween(conduitStartX, conduitY, conduitEndX, conduitY);

        wireGraphics.lineStyle(2, 0x388e3c);
        wireGraphics.lineBetween(conduitStartX, conduitY + height * 0.005, conduitEndX, conduitY + height * 0.005);

        this.createKeypad(keypadX, keypadY, width, height);
    }

    private createKeypad(x: number, y: number, width: number, height: number) {
        const keypadWidth = width * 0.08;
        const keypadHeight = height * 0.18;

        this.keypadButton = this.add.rectangle(
            x,
            y,
            keypadWidth,
            keypadHeight,
            0x37474f
        );
        this.keypadButton.setStrokeStyle(width * 0.003, 0x263238);
        this.keypadButton.setInteractive({useHandCursor: true});

        const brandText = this.add.text(
            x,
            y - keypadHeight * 0.42,
            'SecureAccess 3000',
            {
                fontSize: `${width * 0.005}px`,
                color: '#d1d5db'
            }
        ).setOrigin(0.5);

        const buttonSize = width * 0.015;
        const gap = width * 0.005;
        const startY = y - keypadHeight * 0.15;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const num = row * 3 + col + 1;
                const btnX = x - buttonSize - gap + col * (buttonSize + gap);
                const btnY = startY + row * (buttonSize + gap);

                const btn = this.add.rectangle(btnX, btnY, buttonSize, buttonSize, 0x424242);
                btn.setStrokeStyle(width * 0.001, 0x212121);

                const btnText = this.add.text(btnX, btnY, num.toString(), {
                    fontSize: `${width * 0.008}px`,
                    color: '#ffffff'
                }).setOrigin(0.5);
            }
        }

        const led1 = this.add.circle(x - width * 0.005, y + keypadHeight * 0.45, width * 0.002, 0xdc2626);
        led1.setBlendMode(Phaser.BlendModes.ADD);

        const led2 = this.add.circle(x + width * 0.005, y + keypadHeight * 0.45, width * 0.002, 0x4b5563);

        this.keypadButton.on('pointerdown', () => {
            this.showModal();
        });

        this.keypadButton.on('pointerover', () => {
            this.keypadButton?.setFillStyle(0x455a64);
        });

        this.keypadButton.on('pointerout', () => {
            this.keypadButton?.setFillStyle(0x37474f);
        });
    }

    private createLatexDisplay(width: number, height: number) {
        this.latexElement = document.createElement('div');
        this.latexElement.style.position = 'absolute';
        this.latexElement.style.left = `${width * 0.25}px`;
        this.latexElement.style.top = `${height * 0.25}px`;
        this.latexElement.style.width = `${width * 0.32}px`;
        this.latexElement.style.height = `${height * 0.32}px`;
        this.latexElement.style.transform = 'translate(-50%, -50%)';
        this.latexElement.style.display = 'flex';
        this.latexElement.style.flexDirection = 'column';
        this.latexElement.style.alignItems = 'center';
        this.latexElement.style.justifyContent = 'center';
        this.latexElement.style.color = 'rgba(255, 255, 255, 0.9)';
        this.latexElement.style.fontSize = `${width * this.mathProblems[this.currentProblemIndex].size}px`;
        this.latexElement.style.pointerEvents = 'none';
        this.latexElement.innerHTML = `
            <div id="latex-content">
                \\[${this.mathProblems[this.currentProblemIndex].problem}\\]

                ${
            this.mathProblems[this.currentProblemIndex].question !== ''
                ? `\\[${this.mathProblems[this.currentProblemIndex].question}\\]`
                : ''
        }
            </div>
        `;

        document.body.appendChild(this.latexElement);

        if (!(window as any).MathJax) {
            (window as any).MathJax = {
                tex: {
                    inlineMath: [['$', '$'], ['\\(', '\\)']],
                    displayMath: [['$$', '$$'], ['\\[', '\\]']]
                },
                startup: {
                    pageReady: () => {
                        return (window as any).MathJax.startup.defaultPageReady();
                    }
                }
            };

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js';
            script.async = true;
            document.head.appendChild(script);
        } else {
            setTimeout(() => {
                if ((window as any).MathJax?.typesetPromise) {
                    (window as any).MathJax.typesetPromise([this.latexElement]);
                }
            }, 100);
        }
    }

    private updateLatexPosition(width: number, height: number) {
        if (this.latexElement) {
            this.latexElement.style.left = `${width * 0.25}px`;
            this.latexElement.style.top = `${height * 0.25}px`;
            this.latexElement.style.width = `${width * 0.32}px`;
            this.latexElement.style.height = `${height * 0.32}px`;
            this.latexElement.style.fontSize = `${width * this.mathProblems[this.currentProblemIndex].size}px`;
        }
    }




















    private handleResize() {
        this.scene.restart();
    }

    destroy() {
        super.destroy();
    }
}