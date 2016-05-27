/**
 *  @author Marine Le Mezo
 *  @author Yoann Fouillard
 *  @author jean milsonneau
 *  @overview mode bureau a bureau
 */

class ModeBureauABureau extends ModeBureau{
    constructor() {
        super("mode bureau à bureau");
        this.url = "/mode_bureau_a_bureau";
    }

    /**
     * Variables et fonction du mode
     * @param  {$scope}
     * @param  {$http}
     * @param  {$window}
     * @return {undefined} pas de retour
     */
    run($scope, $http, $window) {
        super.run($scope, $http, $window);

        $scope.selected2 = null;
        $scope.selectChercheur2 = function(c){
            if($scope.selected2 != c) {
                $scope.selected2 = c;
                console.log($scope.selected1 + " et " + $scope.selected2);
            } else {
                $scope.selected2 = null;
                console.log($scope.selected1 + " et " + $scope.selected2);
            }
        };
    }

    /**
     * interuption du mode
     * @return {undefined} pas de retour
     */
    interupt() {
        super.interupt();
    }
}
