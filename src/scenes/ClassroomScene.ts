import Phaser from 'phaser';

export default class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({key: 'ClassroomScene'});
    }

    create() {
        this.scale.on('resize', this.handleResize, this);
    }

    private handleResize() {
        this.scene.restart();
    }

    destroy() {
        super.destroy();
    }
}