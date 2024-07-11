(function () {
  'use strict';
  angular.module('app').controller('ContactChipDemoCtrl', ContactChipDemoCtrl);
  ContactChipDemoCtrl.$inject = ['$mdDialog', '$mdConstant'];

  function ContactChipDemoCtrl($mdDialog, $mdConstant) {
    var vm = this;
    vm.customKeys = [];
    vm.tags = ['Apple', 'Banana', 'Cherry'];
    vm.numberChips = [];
    vm.readonly = false;
    vm.removable = true;
    vm.addTag = function (e) {
      console.log(e, 88);
    };
    vm.showDialog = function (ev) {
      $mdDialog
        .show({
          controller: DialogController,
          templateUrl: '/views/table.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: false,
          fullscreen: false, // Only for -xs, -sm breakpoints.
          locals: {
            selectedList: vm.tags,
          },
        })
        .then(function ({
          selectedList
        }) {
          if (selectedList && selectedList.length > 0) {
            vm.tags = angular.copy(selectedList);
          } else {
            vm.tags = [];
          }
        });
    };

    function DialogController($scope, $mdDialog, selectedList) {
      $scope.list = [{
          orgName: '合肥天华集团',
          orgCode: '001',
        },
        {
          orgName: '安庆天华集团',
          orgCode: '002',
        },
        {
          orgName: '绿岸天华集团',
          orgCode: '003',
        },
        {
          orgName: '舒城天华集团',
          orgCode: '004',
        },
        {
          orgName: '马鞍山天华集团',
          orgCode: '005',
        },
      ];

      $scope.selected = [];
      $scope.toggle = function (item) {
        item.checked = !item.checked;
        if (item.checked) {
          $scope.selected.push(item);
        } else {
          let i = $scope.selected.findIndex((i) => i.orgCode === item.orgCode);
          if (i > -1) $scope.selected.splice(i, 1);
        }
      };

      $scope.exists = function (item, list) {
        return item.checked;
      };

      $scope.isIndeterminate = function () {
        return (
          $scope.selected.length !== 0 &&
          $scope.selected.length !== $scope.list.length
        );
      };

      $scope.isChecked = function () {
        return $scope.selected.length === $scope.list.length;
      };

      $scope.toggleAll = function () {
        if ($scope.selected.length === $scope.list.length) {
          $scope.selected = [];
          $scope.list.forEach(function (item) {
            item.checked = false;
          });
        } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
          $scope.selected = $scope.list.slice(0);
          $scope.list.forEach(function (item) {
            item.checked = true;
          });
        }
      };

      $scope.showBack = function () {
        $scope.list.forEach(function (item) {
          (selectedList || []).map((i) => i.orgCode).includes(item.orgCode) ?
            (item.checked = false) :
            (item.checked = true);
          $scope.toggle(item);
        });
      };

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.select = function () {
        $mdDialog.hide({
          selectedList: $scope.selected,
        });
      };
      $scope.showBack();
    }
  }
})();