angular.module('MinhoModel')
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('light-blue');
  })
  .controller('AppCtrl', [
    '$scope',
    function ($scope) {

      $scope.initForm = initForm;
      $scope.submit = submit;

      initForm();


      function submit(form) {
        $scope.form = form;

        var seric = new Decimal($scope.mmForm.seric).times('0.1');
        var transferrin = new Decimal($scope.mmForm.transferrin).times('0.46');
        var result = seric.minus(transferrin).minus('5.99');

        if($scope.mmForm.symptoms) {
          result = result.plus('3.76');
        }
        if($scope.mmForm.weight) {
          result = result.plus('3.51');
        }
        if($scope.mmForm.hospitalization) {
          result = result.plus('3.94');
        }

        result = result.neg();
        result = Decimal.div('1', result.exp().plus('1'));

        $scope.result = result.times(100).toPrecision(4);

        //P(GI malignancy) = 1/(1+e^-(-5,99 + 0,10 x seric iron -0,46 x transferrin saturation+3,76 if gastrointestinal symptoms + 3,51 if weight loss + 3,94 if need forhospitalization))
      };

      function initForm() {
        delete $scope.result;
        if($scope.form) {
          $scope.form.$setPristine();
          $scope.form.$setUntouched()
        }

        $scope.mmForm = {
          symptoms: false,
          weight: false,
          hospitalization: false
        }
      }

    }
  ]);
