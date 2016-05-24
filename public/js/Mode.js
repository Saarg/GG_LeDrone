/**
 *  @author jean milsonneau
 *  @overview mode
 */

class Mode {
    constructor(nom) {
        this.nom = nom || "undefined";
        this.running = false;
        this.url = null;

        console.log(this.nom);
    }

    run() {

    }

    display($scope, $http) {
        // Image
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
                getPicture();
            }, 100);
        }
        getPicture();
    }

    interupt() {

    }
}
