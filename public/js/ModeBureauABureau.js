/**
 *  @author jean milsonneau
 *  @overview mode bureau a bureau
 */

class ModeBureauABureau extends ModeBureau{
    constructor() {
        super("mode bureau à bureau");
        this.url = "/mode_bureau_a_bureau";
    }

    run(inter, $scope, $http, $window) {
        super.run(inter, $scope, $http, $window);

        $scope.selected2 = null;
        $scope.selectChercheur2 = function(c){
            $scope.selected2 = c;
            console.log($scope.selected1 + " et " + $scope.selected2);
        };
    }

    interupt() {

    }
}
