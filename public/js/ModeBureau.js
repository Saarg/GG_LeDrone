/**
 *  @author Marine Le Mezo
 *  @author Yoann Fouillard
 *  @author jean milsonneau
 *  @overview mode bureau
 */

class ModeBureau extends Mode{
    constructor(name) {
        super(name || "mode bureau");
        this.url = "/mode_bureau";
    }

    run(inter, $scope, $http, $window) {
        $scope.chercheurs = [];
        $http.get('/api/chercheurs').then(function(res) {
            if(res.data.success) {
                $scope.chercheurs = res.data.chercheurs;
            } else {
                console.error("Impossible de charger la liste des chercheurs");
            }
        });

        $scope.selected1 = null;
        $scope.selectChercheur1 = function(c){
            if($scope.selected1 != c) {
                $scope.selected1 = c;
                console.log($scope.selected1 + " et " + $scope.selected2);
            } else {
                $scope.selected1 = null;
                console.log($scope.selected1 + " et " + $scope.selected2);
            }
        };
    }

    interupt() {
        super.interupt();
    }
}
