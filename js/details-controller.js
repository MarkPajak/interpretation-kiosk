

museum_objectcatControllers.controller('museum_objectDetailCtrl', ['$scope', 
																   '$routeParams',
																   'museum_object',
																   '$sce', 
																   "$timeout",
																   "productService",
																   "load_object_record",
																   "record_id",'$location','$interval','$rootScope','screen_saver_loop',
  function($scope, $routeParams, museum_object,$sce,$timeout,productService,load_object_record,record_id ,$location, $interval,$rootScope,screen_saver_loop) {
						$scope.screensaver_on=false
						$scope.labels="labels"
						$scope.directory=dir
						$scope.firstOne=true;
						$scope.lastOne=true;
						$scope.pageClass = 'page-about';	
				
 	

$scope.novideo=true
$scope.kiosk=$routeParams.kiosk
kiosk=$routeParams.kiosk
$scope.changeheadingcolor = function() {
kiosk=$scope.kiosk
var color="color:"+ set_color_by_kiosk(kiosk)+" !important;"

     return  color
}
$scope.functionThatReturnsStyle = function() {
kiosk=$scope.kiosk
var color="background-color:"+ set_color_by_kiosk(kiosk)+";"

     return  color
}
						$scope.pagenav = function(next_prev,firstLoad) {
								
								var museum_object_id = productService.getProduct_id(next_prev,$routeParams.museum_objectId)
								
								$routeParams.museum_objectId=museum_object_id
								record_id.setrecord_id(museum_object_id)
								if(museum_object_id>0 && !firstLoad){
										$scope.museum_object = museum_object.get({museum_objectId: museum_object_id}, function(museum_object) {
										load_object_record.load_object_record(museum_object)
										
										
										
										
										})
								}
								$scope.add_nav_buttons()
								
						}
						
						
						
					
						
						
			   
						$scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
							
							
											console.log(museum_object)
											var children=museum_object.child
												console.log('children',children)
												var child_id_string = "/ids/"
												angular.forEach(children, function(value, key) {
												child_id_string+="-"+value.id
												
												})
												$scope.childlinks=child_id_string
												   $scope.go = function ( path ) {
													  screen_saver_loop.screensaverOff()
														$location.path( path +"/"+$routeParams.kiosk);
													};


												  $scope.goSlideshow = function ( path ) {
													
													  $location.path( '/slideshow'+child_id_string );
												};

							
								$scope.mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
								$scope.setImage = function(imageUrl) {
									$scope.mainImageUrl = imageUrl.image;
									$scope.museum_object.description = imageUrl.description;
									
								};
								
								angular.forEach(museum_object.video, function(object_media) {
								$scope.novideo=false
								$scope.video_button_style = function() {
									kiosk=$scope.kiosk
									
									style="position: absolute;width: 86px;	height: 96px;right: 20%;top: 4%;margin-left: -48px;margin-top: -48px;background-position: 0 -64px;z-index: 500;cursor: pointer;background: url(img/fotorama.png) no-repeat;	-webkit-tap-highlight-color: transparent;-webkit-user-select: none;	-moz-user-select: none;-ms-user-select: none;user-select: none;background-size: 100px;background-position-x: -10px;background-position-y: -70PX;"
									
									
								

										 return  style
									}
								 $scope.go_video = function (  ) {
								
													  screen_saver_loop.screensaverOff()
													 $location.path( '/slideshow/ids/'+museum_object.id );
													};
													return false
								})
								
								
								

						})
						
						
						$scope.add_nav_buttons=function(){
						try{
						console.log(productService.getProduct_id("prev",$routeParams.museum_objectId))
						$scope.firstOne=false;
						}
						catch(er){
							$scope.firstOne=true;
						}
						
						
						try{
						console.log(productService.getProduct_id("next",$routeParams.museum_objectId))
						$scope.lastOne=false;
						}
						catch(er){
							$scope.lastOne=true;
						}
						
						}
						$scope.add_nav_buttons()
						

							
						
}]);