(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController($timeout) {
        var vm = this;

        console.log('IndexController Loaded');
    }
})();