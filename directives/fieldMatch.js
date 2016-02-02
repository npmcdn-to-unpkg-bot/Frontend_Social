angular.module('MyApp')
  .directive('fieldMatch', function() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=fieldMatch'
      },
      link: function(scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function(modelValue) {
          return modelValue === scope.otherModelValue;
        };
        scope.$watch('otherModelValue', function() {
          ngModel.$validate();
        });
      }
    };
  });

