import Phaser from 'phaser';

export default class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({key: 'ClassroomScene'});
    }

    create() {
        const width = this.scale.width;
        const height = this.scale.height;

        this.createBackground(width, height);

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


    private handleResize() {
        this.scene.restart();
    }

    destroy() {
        super.destroy();
    }
}