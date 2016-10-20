

museum_objectcatControllers.controller('screen_saver', 
										['$scope', 
										'$http',
										'$q',
										'$routeParams',
										'$location',
										'museum_object_index',
										'image_feed',
										'museum_objects_by_artist',
										'artist_list',
										'gallery_list',
										'$debounce',
										'productService',
										'screen_saver_loop',
										'$location',
										'$rootScope',
										'detect_dragging','app_settings',
function($scope, $http, $q,$routeParams,$location,museum_object_index,image_feed,							museum_objects_by_artist,
										artist_list,
										gallery_list,
										$debounce,
										productService,
										screen_saver_loop, $location,$rootScope,detect_dragging,app_settings
										) {
  var vm = this;
  
$scope.kiosk=app_settings.kiosk||"null"
kiosk=$routeParams.kiosk
$scope.functionThatReturnsStyle = function() {

var color="background-color:"+ set_color_by_kiosk(kiosk)+";"

     return  color
}

 $scope.call_to_action=app_settings.call_to_action
    $scope.card = {};
    $scope.card.title = 'test';
    vm.page = 0;
    vm.shots = [];
    vm.loadingMore = false;
  	$scope.artists = artist_list.query_index();
	$scope.galleries = gallery_list.query_index();
	$scope.location="Find out more about the objects in this gallery..."
	$scope.orderProp = 'age';
    $scope.listType = 'people';
    $scope.labels="labels";
	$scope.directory=dir
 	$scope.$watch('artist', function(newValue, oldValue) {
    if (newValue === oldValue) { return; }
    $debounce(applyArtistQuery, 750);
    });

   var applyArtistQuery = function() { 
    $scope._artist = $scope.artist;
   };
   
   $scope.artistUpdate = function() {
		var allObjects =  museum_objects_by_artist.query_index({artist_listType:$scope.artist_listType.link});
		$scope.museum_objects =allObjects
		 productService.addProduct($scope.museum_objects);
};	

	var images_to_add =[]	
	 
	  var objectsloaded_in_current_batch;
	   $scope.total_objects_loaded=0
	  var max_objects_in_page=2
	  
	     function load_objects_into_grid(museum_objects,page) { 
		 
		 
		 objectsloaded_in_current_batch=0;
		 
		 // shuffle(museum_objects);
		 angular.forEach(museum_objects , function(object, key) {
	
	//if(key>page*max_objects_in_page){
						  images_to_add.push({
								"id": object.id,
								//"title": object.title,
								//"description": "<p>"+object.description+"</p>"+"<p><a href='#id/"+object.id + "/"+object.link+ "' >Click to find out more</a></p>"||"",
							
								"images": {
								  "hidpi": "https://d13yacurqjgara.cloudfront.net/users/288987/screenshots/2744187/swiftmill-animation.gif",
								  "normal":  dir+'/assets/' + object.image + '_detail.jpg',
								  "teaser":  dir+'/assets/' + object.image + '_thumb.jpg',
								},
								"html_url": "https://dribbble.com/shots/2744187-Swiftmill-Animation",
								"animated": true,
								"tags": [],
								"user": {
								  "id": 288987,
								  "location": "Germany",
								  "links": {
									"twitter": "https://twitter.com/jonadinges"
								  },
								  "buckets_count": 0
								 
								},
								"team": null
							  })
							  
		//  }
					  })
					  
					  }
					  
					  vm.loadMoreShots = function() {

					if(vm.loadingMore) return;
					vm.page++;
					vm.loadingMore = true;
					
					var promise =museum_object_index.query_index({listType:$scope.listType}, function(museum_objects) {  
							   
							   load_objects_into_grid(museum_objects,vm.page);
							   
							  var shotsTmp = angular.copy(vm.shots);
							   shotsTmp = shotsTmp.concat(images_to_add);
							  vm.shots = shotsTmp;
							  vm.loadingMore = false;
								}, function() {

								  vm.loadingMore = false;
								});
								return promise;
				  };
			  
					vm.loadMoreShots();	
	

					 if($rootScope.screensaver_on!=true){
						 console.log('start screensaver')
					   screen_saver_loop.start_screen_saver();
					  }
					detect_dragging.drag_handler()
					   $scope.go = function ( path ) {
						 
						   if( $rootScope.isDragging==false){
							 if(path>0){
							$location.path( "id/"+ path +"/"+$routeParams.kiosk);
							detect_dragging.drag_handler()
							 }else
							{
								$location.path(  path +"/"+$routeParams.kiosk);
							}
						   }
					};

					  $scope.start_screen_saver = function ( ) {
						 screen_saver_loop.start_screen_saver()
							
					};
						 $scope.pageClass = 'page-contact';				
}]);
