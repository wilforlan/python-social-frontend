(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('index', {
                abstract: true,
                //url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/core/views/layout.html',
                        controller: 'IndexController'
                    },
                    'fixed-sidebar-left@index': { templateUrl: 'app/partials/fixed-sidebar-left.html' },
                    'fixed-sidebar-right@index': { templateUrl: 'app/partials/fixed-sidebar-right.html' },
                    'header@index': { templateUrl: 'app/partials/header.html' },
                    'content@index': { templateUrl: 'app/core/views/content.html' }
                }
            })
            .state('home', {
                url: '/',
                templateUrl: 'app/core/views/test.html',
                controller: 'CooperativeController',
                controllerAs: 'main'
            })
            .state('not_found', {
                url: '/url/invalid',
                templateUrl: 'app/error/404.html',
                controller: 'ProfileController as vm',
                resolve: {
                    check: function(ApiAuthenticator) {
                        ApiAuthenticator.authenticateAdminIsLoggedIn();
                    }
                }
            });
        $urlRouterProvider.otherwise('/url/invalid');
    }

})();