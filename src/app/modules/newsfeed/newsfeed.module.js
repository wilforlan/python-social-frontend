(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .config(NewsfeedModule);

    /** @ngInject */
    function NewsfeedModule($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('newsfeed', {
                parent: 'index',
                // url: '/app/dashboard',
                templateUrl: 'app/core/views/content.html',
            })
            .state('newsfeed.main', {
                parent: 'index',
                url: '/app/newsfeed',
                views: {
                    'body@index': {
                        templateUrl: 'app/modules/newsfeed/newsfeed.html',
                        controller: 'NewsfeedController',
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