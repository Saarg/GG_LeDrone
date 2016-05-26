/**
 *  @author jean milsonneau
 *  @overview mode bureau
 */

class Interface {
    constructor() {
        this.curMode = -1;
        this.modes = [new ModeManuel(), new ModeBureau(), new ModeBureauABureau()];
    }

    selectMode(mode) {
        this.curMode = mode;
    }

    interuptMode() {
        this.modes[this.curMode].interupt();
        this.curMode = -1;
    }

    getMode(m) {
        return this.modes[m];
    }
}
