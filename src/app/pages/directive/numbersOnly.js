/**
 * Numeric directive.
 * Version: 1.0.0
 * 
 * Numeric only input. Limits input to:
 * - max value: maximum input value. Default undefined (no max).
 * - min value: minimum input value. Default undefined (no min).
 * - decimals: number of decimals. Default 2.
 * - formatting: apply thousand separator formatting. Default true.
 */
(function () {
    'use strict';

    /* global angular */
    angular.module('BlurAdmin.pages')
        .directive('numeric', numbersOnly);

        numbersOnly.$inject = ['$locale'];






  function numbersOnly() {
    return {
      restrict: 'A',
      link: function($scope, $element, $attrs) {
        $element.bind("keypress", function(event) {
          var keyCode = event.which || event.keyCode;

          if (keyCode == $attrs.code) {
            $scope.$apply(function() {
              $scope.$eval($attrs.dlKeyCode, {$event: event});
            });

          }
        });
      }
    };
  }

})();
