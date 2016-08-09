'use strict';

/* Controllers */





var museum_objectcatControllers = angular.module('museum_objectcatControllers', []);



  





museum_objectcatControllers.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
  
	


  
  museum_objectcatControllers.controller('HomeCtrl',["$sce", 
													"$timeout", 
													"$scope",
													"museum_object",
													"$routeParams",
													"load_object_record",
		function ($sce, $timeout,$scope,museum_object,$routeParams,load_object_record) {
		
						var controller = this;
						controller.state = null;
						controller.API = null;
						controller.currentVideo = 0;
						controller.onPlayerReady = function(API) {
							controller.API = API;
						};
						controller.onCompleteVideo = function() {
							controller.isCompleted = true;
							controller.currentVideo++;
							if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;
							controller.setVideo(controller.currentVideo);
						};
						controller.videos = [
						{
						},
						];
						controller.config = {
							preload: "none",
							autoHide: false,
							autoHideTime: 3000,
							autoPlay: false,
							sources: controller.videos[0].sources,
							theme: {
							url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
							},
							plugins: {
							poster: "http://www.videogular.com/assets/images/videogular.png"
							}
						};
						controller.setVideo = function(index) {
							controller.API.stop();
							controller.currentVideo = index;
							controller.config.sources = controller.videos[index].sources;
							$timeout(controller.API.play.bind(controller.API), 100);
						};


						$scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
							load_object_record.load_object_record(museum_object)
						})


	
  }]);

