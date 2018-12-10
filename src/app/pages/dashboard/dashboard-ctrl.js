/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
        .controller('dashboard-ctrl', dashboardCtrl)


    /** @ngInject */
    function dashboardCtrl($scope, $http) {
        $scope.shifts = ["ShiftA","ShiftB","ShiftC"]
        $scope.lbts = ["lbt01","lbt02"]
        $scope.views = [{
            name : "Line Fill",
            isSelected : true,
            htmlSource : ["app/pages/dashboard/reports/reports.html"]
        },{
            name : "Daily Reports",
            isSelected : false,
            htmlSource : ["app/pages/bijwasan/daily-reports/delivery-del/delivery-del.html",
                        "app/pages/bijwasan/daily-reports/rev-pumping-pnp-delhi/rev-pumping-pnp-delhi.html",
                        "app/pages/bijwasan/daily-reports/pumping-del-pnp/pumping-delhi-pnp.html",
                        "app/pages/bijwasan/daily-reports/delivery-pnp/delivery-pnp.html",
                        "app/pages/bijwasan/daily-reports/delivery-del-rev/delivery-del-rev.html",
                        "app/pages/mathura/mathura-daily-reports/ex-mathura-mbpl/ex-mathura-mbpl.html",
                        "app/pages/mathura/mathura-daily-reports/ex-mathura-mtpl/ex-mathura-mtpl.html",
                        "app/pages/tundla/tundla-daily-reports/tundla-delivery/delivery-tundla.html",
                        "app/pages/tikrikalan/tikrikalan-daily-reports/tikrikalan-delivery/delivery-tikrikalan.html",
                        "app/pages/meerut/meerut-daily-reports/meerut-delivery/delivery-meerut.html",
                        "app/pages/bharatpur/bharatpur-daily-reports/bharatpur-delivery/delivery-bharatpur.html"]
                    },{
            name : "LBT & Shutdown",
            isSelected : false,
            htmlSource : ["app/pages/mathura/shutdown/shutdown.html", "app/pages/dashboard/reports/lbt-table.html"]
        },{
            name : "Equipment Run Hrs",
            isSelected : false,
            htmlSource : ["app/pages/bijwasan/equi-running-hrs-bij/equi-running-hrs-bij.html"]
        }]

        $scope.hideEditHistoryRemarks = true;

        $scope.setSelectedView = function(view){
            $scope.selectedView = view;
        }

        $scope.today = function() {
            $scope.customDate = new Date();
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
            $scope.customDate = new Date(year, month, day);
        };

        $scope.popup1 = {
            opened: false
        };

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