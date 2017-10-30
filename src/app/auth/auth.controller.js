(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .controller('AuthCtrl', ['$rootScope', '$scope', '$http', '$window', 'endpoint', 'Notification', 'Http', 'ApiAuthenticator', '$state', '$stateParams', AuthCtrl]);

    /** @ngInject */
    function AuthCtrl($rootScope, $scope, $http, $window, endpoint, Notification, Http, ApiAuthenticator, $state, $stateParams) {
        var vm = this;
        vm.state_params = $stateParams;
        vm.BusinessLogin = function BusinessLogin(business) {
            var options = {
                url: endpoint + '/business/login',
                method: 'POST',
                data: { email: business.email, password: business.password }
            };
            Http.Normalload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.responseCode === 1) {
                    console.log(data.payload);
                    ApiAuthenticator.saveLoggedInBusiness(data.payload, function() {
                        $state.go('business_listings');
                    });
                } else {
                    vm.api_error = data.responseText;
                    Notification.error({ message: data.responseText });
                }
            }
        };

        vm.BusinessLogout = function BusinessLogout() {
            ApiAuthenticator.logout();
        };

        vm.isBusinessLogin = function isBusinessLogin() {
            if ((sessionStorage.isBusinessLoggedIn === undefined) || (sessionStorage.isBusinessLoggedIn === "0")) {
                return false;
            }
            return true;
        };


    }


})();