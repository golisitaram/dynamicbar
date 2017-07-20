var dpb = angular.module('progressbar',[]); //Dynamic Progress Bar - dpb

dpb.controller('progressBar', ['$scope','$http','$timeout', function($scope,$http,$timeout){
    $scope.getDynamicData = function(){
        delete $scope.EndPoint;
        $http.get('http://pb-api.herokuapp.com/bars')
             .then(function(response){
                $scope.EndPoint = response.data;
                $scope.selectedOpt = '0';
             })
    }
    $scope.getDynamicData();
    
    $scope.updateBar = function(v){
        var finalWidth = $scope.EndPoint.bars[$scope.selectedOpt] + v ;
        $scope.EndPoint.bars[$scope.selectedOpt] = finalWidth > $scope.EndPoint.limit ? $scope.EndPoint.limit : ((finalWidth < 0) ? 0 : finalWidth); 
    }
    
    $scope.$watch('selectedOpt', function(newV,oldV){
        console.log($scope.selectedOpt);
        $scope.highLight = {};
        $scope.highLight[newV] = true;
    });

    $scope.selectBar = function(b){
        $scope.selectedOpt = b.toString();
    }

}]);