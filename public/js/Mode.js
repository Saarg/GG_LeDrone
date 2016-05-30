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

    /**
     * Variables et fonction du mode
     * @param  {$scope}
     * @param  {$http}
     * @param  {$window}
     * @return {undefined} pas de retour
     */
    run($scope, $http, $window) {

    }

    /**
     * gestion des choses a afficher
     * @param  {$scope}
     * @param  {$http}
     * @param  {$window}
     * @return {undefined} pas de retour
     */
    display($scope, $http, $window) {
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
            }, 500);
        }
        getPicture();
    }

    /**
     * interuption du mode
     * @return {undefined} pas de retour
     */
    interupt() {
        this.running = false;
    }
}
