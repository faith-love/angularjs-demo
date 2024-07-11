angular.module('app', ['ui.router', 'ngMaterial'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: '/views/mulSelectDialog.html',
        controller: 'ContactChipDemoCtrl',
        controllerAs: 'vm'
      })
      .state('/about', {
        url: '/about',
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'vm'
      })

    $urlRouterProvider.otherwise('/about');
  });