/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.shiftNotes', ['ui.bootstrap'])
      .config(function($stateProvider) {
        console.log("Sda")
        $stateProvider
          .state('main.shiftNotes', {
            url: '/shiftNotes',
            templateUrl: 'app/pages/shiftNotes/shiftNotes.html',
            title: 'Shift Notes',
            controller: 'shiftNotes-ctrl',  
            sidebarMeta: {
              icon: 'ion-ios-pulse',
              order: 100,
            },
            authenticate: true
          });
      })
      .controller('shiftNotes-ctrl', ShiftNotesCtrl);

  

  /** @ngInject */
  function ShiftNotesCtrl($scope, $http, $rootScope, editableOptions,editableThemes, $uibModal, notesService,toasterService ) {
    var shiftNotesBlocks = $('.cd-timeline-block'),
        offset = 0.8;
        $scope.notes = {};
        $rootScope.isAdmin = localStorage.getItem("isAdmin"); $rootScope.isShiftOfficer= localStorage.getItem("isShiftOfficer")
        $scope.opennotes = function(){
        $scope.notesModal =  $uibModal.open({
            scope: $scope,
            templateUrl: "/app/pages/shiftNotes/addShiftNote.html",
            size: '',
          })
        }
        $scope.editnotesModal = function() {
          $scope.notesModal.close();
        };
      
        $scope.cancelnotesModal = function() {
          $scope.notesModal.dismiss('cancel');
        };

        $scope.editNote = function(){
          $scope.editableNote.editedDate = new Date();
          $scope.editableNote.officer = localStorage.getItem("username");
          $scope.editableNote.time = (new Date()).toTimeString().split(' ')[0]
          $scope.notes.notesData[$scope.selectedShift.index].notes[$scope.editableNoteIndex] = $scope.editableNote;
          notesService.editnotesData(JSON.stringify({
              _id : $scope.notes.notesID,
              date: $scope.notes.notesDate,
              data: $scope.notes.notesData,
            })).then(function(){
              toasterService.openSucessToast("Record has been successfully inserted/updated!");
              $scope.cancelnotesEditModal();
              $scope.getDaysNote();
            },function(){
              $scope.cancelnotesEditModal();
              toasterService.openErrorToast("Record has been successfully inserted/updated!");
            })    
        }

        $scope.editnotes = function(note,index){
          $scope.editableNoteIndex = index;
          $scope.editableNote = note;
          $scope.editModal =  $uibModal.open({
              scope: $scope,
              templateUrl: "/app/pages/shiftNotes/editShiftNote.html",
              size: '',
            })
          }
  
          $scope.editnotesModalClose = function() {
            $scope.editModal.close();
          };
        
          $scope.cancelnotesEditModal = function() {
            $scope.editModal.dismiss('cancel');
          };

    $scope.types = ["danger","warning","primary"]
        $scope.customDate = new Date();

        $scope.shifts = [{name: "Shift A", isSelected : true, index : 0},{name: "Shift B", index : 1},{name: "Shift C", index : 2}]
            
        $scope.selectedShift = $scope.shifts[0] ;
        $scope.selectShift = function(shift){
            $scope.shifts.map(function(shft){
                shft.isSelected = false
                return shft;
            })
            $scope.selectedShift = shift
            shift.isSelected = true;
        }

    //hide ShiftNotes blocks which are outside the viewport
    hideBlocks(shiftNotesBlocks, offset);
    $scope.selectedShift =  $scope.selectedShift
    $scope.$watch('customDate', function(value){
      $scope.customDate = $scope.customDate;
    });

    //on scolling, show/animate ShiftNotes blocks when enter the viewport
    $(window).on('scroll', function () {
      if (!window.requestAnimationFrame) {
        setTimeout(function () {
          showBlocks(shiftNotesBlocks, offset);
        }, 100);
      } else {
        window.requestAnimationFrame(function () {
          showBlocks(shiftNotesBlocks, offset);
        });
      }
    });

    function hideBlocks(blocks, offset) {
      blocks.each(function () {
        ( $(this).offset().top > $(window).scrollTop() + $(window).height() * offset ) && $(this).find('.cd-ShiftNotes-img, .cd-ShiftNotes-content').addClass('is-hidden');
      });
    }

    function showBlocks(blocks, offset) {
      blocks.each(function () {
        ( $(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-ShiftNotes-img').hasClass('is-hidden') ) && $(this).find('.cd-ShiftNotes-img, .cd-ShiftNotes-content').removeClass('is-hidden').addClass('bounce-in');
      });
      
    }
    
    $scope.today = function() {
      $scope.customDate =$scope.customDate;
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
      $scope.customDate =  $scope.customDate; 
      $scope.initNewNote();
      $scope.getDaysNote();
    });

    $scope.initNewNote = function() {
      $scope.newNote = {
        heading: "",
        shift: $scope.selectedShift,
        date: $scope.customDate,
        officer:"",
        description : "",
        type: "warning"
      }
  };

  $scope.getDaysNote= function(){
    notesService.getnotesData(JSON.stringify({
      date : $scope.customDate
    })).then(
      function(data) { 
        $scope.notes.notesData = JSON.parse(data.data.data)[0].data;
        $scope.notes.notesDate = JSON.parse(data.data.data)[0].date;
        $scope.notes.notesID = JSON.parse(data.data.data)[0]._id;
      },
      function(msg) {
      });
  }

  $scope.editNoteStart = function(data, rowform){
    $scope.editablenotesHourlyRec = angular.copy(data);
    $scope.rowform = rowform;
  }

  $scope.saveNote = function(data, index){
//    data.editHistory = $scope.editablenotesHourlyRec;
    $scope.newNote.editedDate = new Date();
    $scope.newNote.officer = localStorage.getItem("username");
    $scope.newNote.time = (new Date()).toTimeString().split(' ')[0]
    $scope.notes.notesData[$scope.selectedShift.index].notes.push($scope.newNote) 
    notesService.editnotesData(JSON.stringify({
        _id : $scope.notes.notesID,
        date: $scope.notes.notesDate,
        data: $scope.notes.notesData,
      })).then(function(){
        toasterService.openSucessToast("Record has been successfully inserted/updated!");
        $scope.cancelnotesModal();
        $scope.getDaysNote();
      },function(){
        $scope.cancelnotesModal();
        toasterService.openErrorToast("Record has been successfully inserted/updated!");
      })      
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
      $scope.customDate = $scope.customDate
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

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

  }
})();