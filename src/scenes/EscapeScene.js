import Phaser from 'phaser';

export default class EscapeScene extends Phaser.Scene {
    constructor() {
        super('EscapeScene');
    }

    preload() {
        this.load.image('escape', 'src/assets/escape.png');
    }

    create() {
        const img = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.height * 3 / 5,
            'escape'
        );

        img.setScale(0.67);

        this.add.text(
            20,              // x position
            20,              // y position
            '' +
            '🎉 Čestitke, raziskovalec! 🎉\n' +
            'Uspelo ti je premagati vse izzive iz kemije, fizike, matematike in računalništva.\n' +
            'S svojim znanjem si deaktiviral nevarnosti laboratorija, stabiliziral reaktor in\nnašel pot do izhoda.\n' +
            '\n' +
            'Pobeg iz Area 51 je uspel.\n' +
            'Tvoja misija je končana – in dokazal si, da si pripravljen tudi na najtežje maturitetne izzive.',   // text
            {
                fontSize: '32px',
                color: '#000000'
            }
        );
    }
}
