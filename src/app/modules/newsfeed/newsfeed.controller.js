(function() {
    'use strict';

    angular
        .module('pythonSocial')
        .controller('NewsfeedController', NewsfeedController);

    /** @ngInject */
    function NewsfeedController($scope, Http, ApiAuthenticator, endpoint, Notification) {
        var vm = this;
        var loggedInUser = ApiAuthenticator.getSessionUser();
        getNewsfeed(10, 1);
        findFriends(20, 1);

        function getNewsfeed(limit, page) {
            var options = {
                url: endpoint + '/users/' + loggedInUser._id + '/newsfeed?limit=' + limit + '&page=' + page,
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

        function findFriends(limit, page) {
            var options = {
                url: endpoint + '/users/find_friends/' + loggedInUser._id + '?limit=' + limit + '&page=' + page,
                method: 'GET'
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    vm.friends_array = JSON.parse(data.payload)
                } else {
                    Notification.error({ title: 'Error Fetching Newsfeed', body: data.msg });
                }
            }
        }


        vm.follow_user = function follow_user(user) {
            var options = {
                url: endpoint + '/users/' + loggedInUser._id + '/follow/' + user._id.$oid,
                method: 'PUT'
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    user.disabled = true;
                    Notification.success({ title: 'Yah!', body: data.msg });
                } else {
                    Notification.error({ title: 'Error Following User', body: data.msg });
                }
            }
        };

        vm.like_story = function like_story(story) {
            var options = {
                url: endpoint + '/users/' + loggedInUser._id + '/like/' + story._id.$oid,
                method: 'PUT'
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    story.likers.push(loggedInUser._id);
                } else {
                    Notification.error({ title: 'Error Liking Story', body: data.msg });
                }
            }
        };

        vm.create_story = function create_story(story) {
            var options = {
                url: endpoint + '/users/story',
                method: 'POST',
                data: { user_id: loggedInUser._id, story_text: story.story_content }
            };
            Http.Authedload(options, successCallBack);

            function successCallBack(response) {
                var data = response.data;
                if (data.status === 'success') {
                    $scope.story.story_content = '';
                    Notification.success({ title: 'Yah!', body: data.msg });
                } else {
                    Notification.error({ title: 'Error Creating Story', body: data.msg });
                }
            }
        };


        // console.log("News Feed", NewsFeedModel.getNewsfeed(10, 1))
        // console.log(vm.newsfeed);
    }
})();