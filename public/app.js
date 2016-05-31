
'use strict';

(function() {
  var app = angular.module('flapperNews', ['ui.router']);

  app.factory('posts', [ postsFactory ]);

  
  function postsFactory() {
    var o = {
      posts: [
        {title: 'post 1', upvotes: 5, comments:[]},
        {title: 'post 2', upvotes: 2, comments:[]},
        {title: 'post 3', upvotes: 15, comments:[]},
        {title: 'post 4', upvotes: 9, comments:[]},
        {title: 'post 5', upvotes: 4, comments:[]}
        ]
    };
    return o; 
  }
  
  app.controller('MainCtrl', [
    '$scope', 
    'posts', 
    MainCtrl]);
  
  app.controller('PostsCtrl', [
    '$scope',
    '$stateParams',
    'posts',
    PostsCtrl ]
  );

  function PostsCtrl($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
      if($scope.body === '') { return; }
      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });
      $scope.body = '';
    };
  }
  
  function MainCtrl($scope, posts) {
    $scope.test = 'Hello world!';
    $scope.posts = posts.posts;

    $scope.addPost = addPost;
    $scope.incrementUpvotes = incrementUpvotes;
    
    function incrementUpvotes(post) {
      post.upvotes += 1;
    }
    
    function addPost() 
    {
      if (!$scope.title || $scope.title === '') {
        return;
      }
      $scope.posts.push({
        title: $scope.title,
        link: $scope.link, 
        upvotes: 0,
        comments: [
          {author: 'Joe', body: 'Cool post!', upvotes: 0},
          {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
        ] 
      });
      $scope.title = '';
      $scope.link = '';
    }
  }
  
  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/home.html',
          controller: 'MainCtrl'
        })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

      $urlRouterProvider.otherwise('home');
    }]);
  
})();
