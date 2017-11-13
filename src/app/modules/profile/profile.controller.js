(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($scope, Http, ApiAuthenticator, endpoint, Notification) {
        var vm = this;
        var loggedInUser = ApiAuthenticator.getSessionUser();
        my_profile();
        getNewsfeed(10, 1);

        function my_profile() {
            var options = {
                url: endpoint + '/users/' + loggedInUser._id,
                method: 'GET'
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    vm.user_details = data.payload
                } else {
                    Notification.error({ title: 'Error Fetching Newsfeed', body: data.msg });
                }
            }
        }

        function getNewsfeed(limit, page) {
            var options = {
                url: endpoint + '/users/' + loggedInUser._id + '/mynewsfeed?limit=' + limit + '&page=' + page,
                method: 'GET'
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    vm.newfeed_array = JSON.parse(data.payload)
                } else {
                    Notification.error({ title: 'Error Fetching Newsfeed', body: data.msg });
                }
            }
        }

    }
})();