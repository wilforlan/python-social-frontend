/* global malarkey:false, moment:false */
(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .constant('moment', moment)
        .value('endpoint', 'http://localhost:3000');


})();