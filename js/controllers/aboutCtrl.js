angular.module('app')
  .controller('AboutCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    var vm = this;
    vm.maxTags = 10;
    vm.tagList = [{
      name: 'tag1'
    }, {
      name: 'tag2'
    }, {
      name: 'tag3'
    }]
    vm.remove = function (item, e) {
      console.log('remove', item, e);
      vm.tagList = vm.tagList.filter(i => i.name !== item.name)
    }
    vm.add = function () {
      show().then((data) => {
        console.log(data, 'data');
        if (data && data.form && data.form.name) {
          vm.tagList.push(data.form)
        }
      });
    }

    vm.edit = function (item) {
      console.log('editTag', item);
      const _item = angular.copy(item);
      show(_item).then((data) => {
        if (data && data.form && data.form.name) {
          vm.tagList.push(data.form)
        }
      });
    }

    function show(data) {
      return $mdDialog.show({
        controller: DialogController,
        controllerAs: 'vm',
        templateUrl: '/directive/dialog.html',
        parent: angular.element(document.body),
        clickOutsideToClose: false,
        fullscreen: false, // Only for -xs, -sm breakpoints.
        locals: {
          form: data
        },
      })

      function DialogController(form) {
        const vm = this;
        vm.form = {
          name: '',
          age: '',
          address: '',
          school: ''
        }
        if (form) {
          Object.assign(vm.form, form)
        }
        vm.submit = function () {
          vm.hide({
            form: vm.form
          })
        }

        vm.hide = function (data) {
          $mdDialog.hide(data);
          vm.form = {
            name: '',
            age: '',
            address: '',
            school: ''
          }
        };
      }
    }
  }]);