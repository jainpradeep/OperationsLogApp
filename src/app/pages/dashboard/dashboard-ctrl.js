/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
        .controller('dashboard-ctrl', dashboardCtrl)


    /** @ngInject */
    function dashboardCtrl($scope, $http, $uibModal) {
        $scope.shifts = ["ShiftA","ShiftB","ShiftC"]
        $scope.lbts = ["lbt01","lbt02"]
        $scope.views = [{
            name : "Line Fill",
            isSelected : true,
            htmlSource : ["app/pages/dashboard/reports/linefill.html"]
        },{
            name : "Daily Reports",
            isSelected : false,
            htmlSource : [
                        "app/pages/bijwasan/daily-reports/delivery-del/delivery-del.html",
                        "app/pages/bijwasan/daily-reports/rev-pumping-pnp-delhi/rev-pumping-pnp-delhi.html",
                        "app/pages/bijwasan/daily-reports/pumping-del-pnp/pumping-delhi-pnp.html",
                        "app/pages/bijwasan/daily-reports/delivery-pnp/delivery-pnp.html",
                        "app/pages/bijwasan/daily-reports/delivery-del-rev/delivery-del-rev.html",
                        "app/pages/mathura/mathura-daily-reports/ex-mathura-mbpl/ex-mathura-mbpl.html",
                        "app/pages/mathura/mathura-daily-reports/ex-mathura-md/ex-mathura-md.html",
                        "app/pages/mathura/mathura-daily-reports/ex-mathura-mtpl/ex-mathura-mtpl.html",
                        "app/pages/tundla/tundla-daily-reports/tundla-delivery/delivery-tundla.html",
                        "app/pages/tikrikalan/tikrikalan-daily-reports/tikrikalan-delivery/delivery-tikrikalan.html",
                        "app/pages/meerut/meerut-daily-reports/meerut-delivery/delivery-meerut.html",
                        "app/pages/bharatpur/bharatpur-daily-reports/bharatpur-delivery/delivery-bharatpur.html"]
        },{
            name : "LBT & Shutdown",
            isSelected : false,
            htmlSource : ["app/pages/mathura/shutdown/shutdown.html", "app/pages/dashboard/reports/lbt-table.html", "app/pages/dashboard/reports/targetTracker.html"]
        },{
            name : "Equipment Run Hrs",
            isSelected : false,
            htmlSource : ["app/pages/bijwasan/equi-running-hrs-bij/equi-running-hrs-bij.html"]
        }]
        $scope.selectedView = $scope.views[0];
        $scope.hideEditHistoryRemarks = true;
        $scope.open = function(data) {
            $scope.$modalInstance =  $uibModal.open({
                scope: $scope,
                templateUrl: "/app/pages/dashboard/summarySection.html",
                size: '',
              })
            };
            
            $scope.ok = function() {
                $scope.$modalInstance.close();
            };
            
            $scope.cancel = function() {
                $scope.$modalInstance.dismiss('cancel');
            };
        
            
            $scope.$watch('customDate', function(value){
                localStorage.setItem('customDate', $scope.customDate);
                $scope.$parent.customDate =  $scope.customDate; 
              });
        
        $scope.setSelectedView = function(view){
            $scope.selectedView = view;
            $scope.views.map(function(view){
                view.isSelected = false
                return view;
            })
            $scope.selectedView.isSelected = true;
        }

        $scope.today = function() {
            $scope.customDate = $scope.$parent.customDate
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

        $scope.generateReport = function(divName){
            var printContents = document.getElementById(divName).innerHTML;
            var originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents;
            window.print();
            document.body.innerHTML = originalContents;
       }

        // $scope.generateReport = function(){
        //     var summaryReport = document.getElementById('summary-report').innerHTML;
        //  $http({
        //      method: 'POST',
        //      url: 'http://10.14.151.179:3006/getSummary',
        //      data: JSON.stringify({report : summaryReport}),
        //      responseType: 'arraybuffer'
        //  }).success(function (data, status, headers) {
        //      headers = headers();
      
        //      var filename = headers['x-filename'];
        //      var contentType = headers['content-type'];
      
        //      var linkElement = document.createElement('a');
        //      try {
        //          var blob = new Blob([data], { type: contentType });
        //          var url = window.URL.createObjectURL(blob);
      
        //          linkElement.setAttribute('href', url);
        //          linkElement.setAttribute("download", filename);
      
        //          var clickEvent = new MouseEvent("click", {
        //              "view": window,
        //              "bubbles": true,
        //              "cancelable": false
        //          });
        //          linkElement.dispatchEvent(clickEvent);
        //      } catch (ex) {
        //          console.log(ex);
        //      }
        //  }).error(function (data) {
        //      console.log(data);
        //  });
     
        //  }

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