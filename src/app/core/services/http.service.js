(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .factory('Http', ['$http', 'Notification', '$rootScope', 'ApiAuthenticator', Http]);

    function Http(http, $rootScope, Notification, ApiAuthenticator) {
        var reply = {};
        // var Notification = angular.injector.get('Notification');

        reply.failureMessage = function(response) {
            Notification.error({ message: 'Connection error. Please check internet connection ' + response.msg });
        };

        reply.Authedload = function(params, success, failure) {
            $rootScope.loadingProgress = true;

            if (!angular.isFunction(failure) || failure === undefined)
                failure = reply.failureMessage;

            var sent_headers = { 'Content-Type': 'application/json' };

            if (params.headers == 'form') {
                sent_headers = { 'Content-Type': undefined };
            }

            if (params.headers == 'x-www-form') {
                sent_headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            }

            params.data = (params.data == undefined) ? {} : params.data;
            params.method = (params.method === undefined) ? 'POST' : params.method;

            var tokenize = reply.appendToken(params.url, params.method, sent_headers, params.data);

            http
                ({
                    method: tokenize.method,
                    url: tokenize.url,
                    data: tokenize.data,
                    headers: tokenize.headers
                }).then(parseSuccessResponse, parseFailureResponse);

            function parseSuccessResponse(response) {
                $rootScope.loadingProgress = false;
                ApiAuthenticator.authenticateAndRedirectApiResponse(response, function() {
                    success(response);
                });
            }

            function parseFailureResponse(response) {
                $rootScope.loadingProgress = false;
                ApiAuthenticator.authenticateAndRedirectApiResponse(response, function() {
                    failure(response);
                });
            }
        };
        reply.Normalload = function(params, success, failure) {
            $rootScope.loadingProgress = true;

            if (!angular.isFunction(failure) || failure === undefined)
                failure = reply.failureMessage;

            var sent_headers = { 'Content-Type': 'application/json' };

            if (params.headers == 'form') {
                sent_headers = { 'Content-Type': undefined };
            }

            if (params.headers == 'x-www-form') {
                sent_headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            }

            params.data = (params.data == undefined) ? {} : params.data;
            params.method = (params.method === undefined) ? 'POST' : params.method;

            var tokenize = reply.appendToken(params.url, params.method, sent_headers, params.data);

            http
                ({
                    method: tokenize.method,
                    url: params.url,
                    data: params.data,
                    headers: params.headers
                }).then(parseSuccessResponse, parseFailureResponse);

            function parseSuccessResponse(response) {
                $rootScope.loadingProgress = false;
                ApiAuthenticator.authenticateAndRedirectApiResponse(response, function() {
                    success(response);
                });
            }

            function parseFailureResponse(response) {
                $rootScope.loadingProgress = false;
                ApiAuthenticator.authenticateAndRedirectApiResponse(response, function() {
                    failure(response);
                });
            }
        };

        reply.appendToken = function(url, method, headers, data) {
            var api_token = "";
            var return_data = {};

            if (localStorage.api_token !== undefined && localStorage.api_token !== "undefined") {
                api_token = localStorage.api_token;
                headers['Authorization'] = "Bearer " + api_token;
                // headers['x-access-token'] = api_token;
            }

            switch (headers['Content-Type']) {
                case undefined:
                    //data.append('token', api_token);
                    return_data = data;
                    break;

                case 'application/x-www-form-urlencoded':
                    //data.token = api_token;
                    return_data = data; //$.param(data);
                    break;

                case 'application/json':
                    return_data = data;
                    break;
            }

            return { 'url': url, 'method': method, 'headers': headers, 'data': return_data };
        };

        return reply;
    }
})();