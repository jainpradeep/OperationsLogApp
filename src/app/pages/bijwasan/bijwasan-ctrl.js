/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';
    angular.module('BlurAdmin.pages.bijwasan')
        .controller('Bijwasan-ctrl', BijwasanCtrl);

    /** @ngInject */
    function BijwasanCtrl($scope, $http) {
        $scope.shifts = [{name: "Shift A", isSelected : true},{name: "Shift B"},{name: "Shift C"}]
        $scope.dashboardDate = new Date();
        $scope.lbt = [{name: "LBT 01", isSelected : true},{name: "LBT 02"}]
        $scope.products = ["6M","6H","HSD","4M","4H","PN","PX","ATF","SKO","PCK","NSKO","LF"]
        $scope.selectedShift = $scope.shifts[0].name;
        $scope.selectShift = function(shift){
            $scope.shifts.map(function(shft){
                shft.isSelected = false
                return shft;
            })
            $scope.selectedShift = shift
            shift.isSelected = true;
        }
        $scope.selectLbt = function(lbt){
            $scope.lbt.map(function(lb){
                lb.isSelected = false
                return lb;
            })
            $scope.selectedLbt = lbt
            lbt.isSelected = true;
        }
        $scope.today = function() {
            $scope.customDate =$scope.$parent.customDate;
        };
        $scope.today();

        $scope.clear = function() {
            $scope.customDate = null;
        };
        $scope.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        $scope.$watch('customDate', function(value){
            $scope.$parent.customDate =  $scope.customDate; 
          });

        $scope.toggleMin = function() {
            $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        // $scope.open2 = function() {
        //     $scope.popup2.opened = true;
        // };

        $scope.setDate = function(year, month, day) {
            $scope.customDate = $scope.$parent.customDate
        };

        $scope.popup1 = {
            opened: false
        };

        // $scope.popup2 = {
        //     opened: false
        // };

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return $scope.events[i].status;
                    }
                }
            }

            return '';
        }
    }
})();