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
        $scope.arrayBufferToBase64 = function( buffer ) {
            var binary = '';
            var bytes = new Uint8Array( buffer );
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            return window.btoa( binary );
        }

        $scope.img = null;
        var getPicture = function() {
            $http.get('/api/picture').then(function(res) {
                $scope.img = res.data.img;
            });

            setTimeout(function () {
                if(m.running) {
                    refreshDroneStatus();
                }
            }, 100);
        }
        getPicture();

        // Status ==============================================================
        $scope.connected = false;
        $scope.ready = false;
        $scope.moving = false;
        $scope.batteryLevel = -1;
        var refreshDroneStatus = function() {
            $http.get('/api/droneStatus').then(function(res) {
                $scope.connected = res.data.connected;
                $scope.ready = res.data.ready;
                $scope.moving = res.data.moving;
                $scope.batteryLevel = res.data.batteryLevel;
            });

            setTimeout(function () {
                if(m.running) {
                    refreshDroneStatus();
                }
            }, 1000);
        }
        refreshDroneStatus()
    }

    interupt() {
        this.running = false;
    }
}
