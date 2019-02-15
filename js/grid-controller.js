

museum_objectcatControllers.controller('gridCtrl', 
										['$scope', 
										'$http',
										'$q',
										'$routeParams',
										'museum_object_index','image_feed',
										'museum_objects_by_artist',
										'artist_list','gallery_list',
										'$debounce','productService','$location','$interval','$rootScope','screen_saver_loop','detect_dragging','app_settings','app_functons',
function($scope, $http, $q,$routeParams,museum_object_index,
										image_feed,
										museum_objects_by_artist,
										artist_list,
										gallery_list,
										$debounce,
										productService,  $location, $interval,$rootScope,screen_saver_loop,detect_dragging,app_settings,app_functons,send_data) {
  var vm = this;
  
  $scope.kiosk_path=$routeParams.kiosk
$scope.menu=app_settings.menu
$scope.pageClass = 'page-grid';
$scope.kiosk=$routeParams.kiosk
$scope.call_to_action=app_settings.call_to_action
kiosk_path=$routeParams.kiosk



	  var page = {           
																	page_id:"1234",
																	page_name: $routeParams.type,
																	page_type:'button click',
																	kiosk_id:$routeParams.kiosk,
																	kiosk: app_settings.kiosk
																};
											console.log('clicked',page)							


$scope.start_screen_saver = function () {
	 screen_saver_loop.start_screen_saver()
		
};
$scope.functionThatReturnsStyle = function() {
	return app_functons.functionThatReturnsStyle($routeParams.kiosk)	
		
};
$scope.changeheadingcolor = function() {
	return app_functons.changeheadingcolor($routeParams.kiosk)	
		
};

 		$scope.go_home = function ( path ) {
																
																  var page = {           
																	page_id:"1234",
																	page_name: path,
																	page_type:'button click',
																	kiosk_id:$routeParams.kiosk,
																	kiosk: app_settings.kiosk
																};
																
																
						
																//send_data.add_log(page)
																
																	$location.path($scope.kiosk_path);
																	
																};

		
		

	  
  
  
  
  $scope.card = {};
  $scope.card.title = 'test';
  vm.page = 0;
  vm.shots = [];


  detect_dragging.drag_handler()
   if($rootScope.screensaver_on!=true){
						 console.log('start screensaver')
					   screen_saver_loop.start_screen_saver();
					  }

							
	    
  
  vm.loadingMore = false;
  	$scope.artists = artist_list.query_index();
	$scope.galleries = gallery_list.query_index();
	$scope.location="Find out more about the objects in this gallery..."
	$scope.orderProp = 'age';
    $scope.listType =$routeParams.type;
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
		 
		   if($rootScope.screensaver_on==true){
	   shuffle(museum_objects);
	  }
	  
		 objectsloaded_in_current_batch=0;
	
		 		$scope.go = function ( path ) {
					
																  var page = {           
																	page_id:"1234",
																	page_name: path,
																	page_type:'button click',
																	kiosk_id:$routeParams.kiosk,
																	kiosk: app_settings.kiosk
																};
																
							
						   if( $rootScope.isDragging==false){
							 if(path>0){
							$location.path( "id/"+ path +"/"+$routeParams.kiosk);
							detect_dragging.drag_handler()
							 }else
							{
								$location.path(  path +"/"+$routeParams.kiosk);
							}
						   }
			
															
														
															
																//send_data.add_log(page)
												
																
																	
																};
		
		 angular.forEach(museum_objects , function(object, key) {
	
	if(museum_objects.length==0){alert('o')}
	if(object.description){	//if(key>page*max_objects_in_page){
		
		
		
	if(object.type[0] ){
	if(object.type[0].toLowerCase()==$routeParams.type.toLowerCase()||$rootScope.screensaver_on==true){
		
		
						  images_to_add.push({
								"id": object.id,
								"title": object.title,
								"description": "<p>"+object.description+"</p>"||"",
								"width": 400,
								"height": 300,
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
							 
	}
	}
	}
							  
		//  }
					  })
					  		
					   vm.loadMoreShots(); 
					   
						  
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
		
						
}]);
