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

    interuptMode($http) {
        //this.modes[this.curMode].interupt($http);

        this.curMode = -1;
    }

    getMode(m) {
        return this.modes[m];
    }
}
