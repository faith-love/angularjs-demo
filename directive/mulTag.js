const app = angular.module('app')

app.directive('mulTags', function () {
  return {
    restrict: 'E', // 指令可以作为元素使用
    templateUrl: '/directive/multag.html', // 内置的HTML模板
    scope: {
      tagList: '=', // 双向数据绑定
      maxTags: '<', // 只读
      add: '=',
      remove: '=',
      edit: '=',
      readonly: '<' // 只读
    }, // 隔离作用域
    controller: mulTagCtrl,
    controllerAs: 'vm',
  };

  function mulTagCtrl($scope, $element, $attrs) {
    var vm = this;
    console.log($scope);
    vm.remove = function (item, e) {
      e.stopPropagation();
      angular.isFunction($scope.remove) && $scope.remove(angular.copy(item), e);
    }
    vm.add = function () {
      angular.isFunction($scope.add) && $scope.add();
    }

    vm.edit = function (item, e) {
      e.stopPropagation();
      angular.isFunction($scope.edit) && $scope.edit(angular.copy(item), e);
    }
  }

});