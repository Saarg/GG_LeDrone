/**
 *  @author jean milsonneau
 *  @overview mode bureau
 */

class Interface {
    constructor() {
        this.modes = ["/mode_manuel", "/mode_bureau", "/mode_bureau_a_bureau"];
    }

    selectMode(mode, $window) {
        $window.location = this.modes[mode];
    }

    interuptMode($window) {
        $window.location = "/";
    }
}
