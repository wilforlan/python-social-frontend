(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .factory('Notification', ['toaster', Notification]);

    function Notification(toaster) {
        var self = this;

        self.error = function(options) {
            var showCloseButton = options.showCloseButton || false;
            var timeout = options.timeout || 3000;
            var onHideCallback = options.onHideCallback || '';
            toaster.pop({
                type: 'error',
                title: options.title,
                body: options.body,
                showCloseButton: showCloseButton,
                timeout: timeout,
                onHideCallback: onHideCallback
            });
        };

        self.success = function(options) {
            var showCloseButton = options.showCloseButton || false;
            var timeout = options.timeout || 3000;
            var onHideCallback = options.onHideCallback || '';
            toaster.pop({
                type: 'success',
                title: options.title,
                body: options.body,
                showCloseButton: showCloseButton,
                timeout: timeout,
                onHideCallback: onHideCallback
            });
        };

        self.test = "I am working";

        self.info = function(options) {
            var showCloseButton = options.showCloseButton || false;
            var timeout = options.timeout || 3000;
            var onHideCallback = options.onHideCallback || '';
            toaster.pop({
                type: 'info',
                title: options.title,
                body: options.body,
                showCloseButton: showCloseButton,
                timeout: timeout,
                onHideCallback: onHideCallback
            });
        };


        return self;
    }
})();