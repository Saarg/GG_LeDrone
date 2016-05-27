/**
 *  @author jean milsonneau
 *  @overview mode
 */

class Mode {
    constructor(nom) {
        this.nom = nom || "undefined";
        this.running = false;

        console.log(this.nom);
    }

    run() {

    }

    display($scope, $http) {
        var m = this;
        m.running = true;

        // Image ===============================================================
        $scope.img = null;
        var getPicture = function() {
            $http.get('/api/picture').then(function(res) {
                $scope.img = res.data.img;
            });

            setTimeout(function () {
                if(m.running) {
                    getPicture();
                }
            }, 1000);
        }
        getPicture();
    }

    interupt() {
        this.running = false;
    }
}
