museum_objectcatControllers.controller('museum_objectListCtrl', ['$scope', 
																'$filter',
																'$routeParams',
																'museum_object_index',
																'museum_objects_by_artist',
																'artist_list','gallery_list',
																'$debounce','productService','screen_saver_loop','$location',
  function($scope, 
			$filter,
			$routeParams,
			museum_object,
			museum_objects_by_artist,
			artist_list,
			gallery_list,
			$debounce,
			productService,screen_saver_loop,$location) {
				
$scope.kiosk=$routeParams.kiosk||"PPL-CR-ICT05"
kiosk=$routeParams.kiosk
$scope.functionThatReturnsStyle = function() {
kiosk=$scope.kiosk
var color="background-color:"+ set_color_by_kiosk(kiosk)+";"

     return  color
}

   $scope.go = function ( path ) {
	  screen_saver_loop.screensaverOff()
		$location.path( path +"/"+$routeParams.kiosk);
};



     $scope.pageClass = 'page-about';	
$scope.listType = 'people';
$scope.labels="labels"
$scope.directory=dir
if(productService.getProducts()){
	$scope.museum_objects =productService.getProducts();
}else{
	$scope.museum_objects = museum_object.query_index({listType:$scope.listType});
}


$scope.artists = artist_list.query_index();
$scope.galleries = gallery_list.query_index();
$scope.location="Find out more about the objects in this gallery..."
$scope.orderProp = 'age';

$scope.$watch('queryInput', function(newValue, oldValue) {
    if (newValue === oldValue) { return; }
    $debounce(applyQuery, 350);
	
});


$scope.filterReset = function() { 
	$scope.listType = 'people';
	$scope.labels="labels"
	$scope.directory=dir
	$scope.museum_objects = museum_object.query_index({listType:$scope.listType});
	$scope.crabs="";
	$scope._artist= "";
	$scope._artist="";
	
};



var applyQuery = function() { 
    $scope.crabs = $scope.queryInput;
	 var x = $filter('filter')($scope.museum_objects, $scope.crabs);
	productService.addProduct(x );
};



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
		
 productService.addProduct($scope.museum_objects);
 
  }]);