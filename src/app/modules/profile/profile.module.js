(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .config(ProfileModule);

    /** @ngInject */
    function ProfileModule($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('profile', {
                parent: 'index',
                // url: '/app/dashboard',
                templateUrl: 'app/core/views/content.html',
            })
            .state('profile.main', {
                parent: 'index',
                url: '/app/profile',
                views: {
                    'body@index': {
                        templateUrl: 'app/modules/profile/profile.html',
                        controller: 'ProfileController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    check: function(ApiAuthenticator) {
                        ApiAuthenticator.authenticateUserIsLoggedIn();
                    }
                }

            });
        $urlRouterProvider.otherwise('/url/invalid');
    }

})();