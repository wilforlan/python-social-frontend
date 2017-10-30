(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .controller('NewsfeedController', NewsfeedController);

    /** @ngInject */
    function NewsfeedController($timeout, NewsFeedModel) {
        var vm = this;
        NewsFeedModel.getNewsfeed(10, 1).then(function(feed) {
            console.log("feed", feed);
        });
        // console.log("News Feed", NewsFeedModel.getNewsfeed(10, 1))
        // console.log(vm.newsfeed);
    }
})();