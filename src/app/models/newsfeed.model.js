(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .factory('NewsFeedModel', ['$q', '$state', 'Notification', '$rootScope', '$window', 'Http', 'ApiAuthenticator', 'endpoint', NewsFeedModel]);

    function NewsFeedModel($q, state, Notification, $rootScope, $window, Http, ApiAuthenticator, endpoint) {
        var NModel = {};
        var loggedInUser = ApiAuthenticator.getSessionUser();
        NModel.test = function() {
            return { status: "Success test" }
        };
        var deferred = $q.defer();
        NModel.getNewsfeed = function(limit, page, callback) {
            var options = {
                url: endpoint + '/users/' + loggedInUser._id + '/newsfeed?limit=' + limit + '&page=' + page,
                method: 'GET',
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    return data;
                    if (JSON.parse(data.payload).length) {
                        console.log("I am Parsed", JSON.parse(data.payload))
                        deferred.resolve(data.payload);
                    } else {
                        console.log("D not available")

                        Notification.info({ title: 'No Newsfeed Available', body: data.msg, timeout: 10000 });
                        deferred.resolve(data.payload);
                    }
                } else {
                    Notification.error({ title: 'Error Fetching Newsfeed', body: data.msg });
                    return false;
                }
            }
        };



        return NModel;
    }
})();