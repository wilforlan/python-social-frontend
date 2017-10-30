(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log) {

        $log.debug('runBlock end');
    }

})();