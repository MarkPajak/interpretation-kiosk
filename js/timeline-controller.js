  
  museum_objectcatControllers.controller('timelineCtrl', ['$scope', '$timeout','timeline_service' ,
																			'museum_object_index',
																			"productService",
																			"artist_list",
																			"museum_objects_by_artist",
																			"$debounce",
																			"$routeParams",
																			"screen_saver_loop",'$location',
																			
																			function ($scope, 
																			$timeout,
																			timeline_service,
																			museum_object_index,
																			productService,
																			artist_list,
																			museum_objects_by_artist,
																			$debounce,
																			$routeParams,screen_saver_loop,$location
																			) {

	//see https://timeline.knightlab.com/docs/options.html
    $scope.options = {
                      debug: true,
                      timenav_position: 'top',
                      language: 'en',
	                  hash_bookmark: false,
					   initial_zoom: 3,
					 menubar_height:400,
					 marker_height_min:100,
					 timenav_height_min:100,
					timenav_height_percentage:50,
					 marker_padding:15
					 
    };
	
  $scope.go = function ( path ) {
	  screen_saver_loop.screensaverOff()
		$location.path( path );
};
	
	
    $scope.$watch('artist', function(newValue, oldValue) {
    if (newValue === oldValue) { return; }
    $debounce(applyArtistQuery, 750);
   });

   var applyArtistQuery = function() { 
    $scope._artist = $scope.artist;
   };

	$scope.artist_timelineUpdate = function() {
	
	angular.forEach($scope.timeline._storyslider._slides , function(slide, key) {

	if(slide.data.artist){
	
		if( $scope.artist_listType.name==slide.data.artist[0].name)
		
		 $scope.timeline.goTo(key)
		}
	})
	
	};	
	
	
	
		
		
    $scope.listType = 'people';
    $scope.labels="labels"

 
	  
	   $scope.museum_objects = museum_object_index.query_index({listType:$scope.listType}, function(museum_objects) { 
	 
	   load_objects_into_timeline(museum_objects)
	   })
    

     // var data = timeline_service.query(function(data){
  function load_objects_into_timeline(museum_objects) { 
   
   console.log('loading the following', museum_objects)
   //loop through data and assign parameters for events.
  var timeline = []
  timeline.title=
					  {
						"media": {
						  "url": "images/input.png",
						  "caption": "media caption.",
						  "credit": "media credit"
						},
						"text": {
						  "headline": "first slide headline",
						  "text": "<p> first slide description</p>"
						}
					  }
  
  var events = []	
  $scope.artists = artist_list.query_index({}, function(artists) { 
  
  
  angular.forEach(artists , function(artist, key) {
 
					if(artist.active_from>0){
									events.push(  {
										"media": {
										"url": dir+"img/person.jpg",
										 "thumbnail": dir+'img/'+"person.jpg",
										"caption": "",
										"credit": ""
									  },
									  "start_date": {
										"year": artist.active_from ||1200
									   
									  }
									  ,
									  "end_date": {
										"year": artist.active_until ||1200
									   
									  },
									  "text": {
										"headline": artist.name ||"w",
										"text": ""
									  },
									  "group": "ARTISTS",
									  "background":{
											"color":"#cd0056"
											}
									})
						  }
						  
							if(artist.birth>0){
									events.push(  {
										"media": {
										"url": dir+"img/person.jpg",
										 "thumbnail": dir+'img/'+"person.jpg",
										"caption": "",
										"credit": ""
									  },
									  "start_date": {
										"year": artist.birth ||1200
									   
									  }
									  ,
									  "end_date": {
										"year": artist.death ||1200
									   
									  },
									  "text": {
										"headline": artist.name ||"w",
										"text": ""
									  },
									  "group": "ARTISTS",
									  "background":{
											"color":"#cd0056"
											}
									})
						  }
  })

 angular.forEach(museum_objects , function(object, key) {
 
			if(object.start_date){
	
							events.push(  {
								"media": {
								"url": dir+'/assets/' + object.image + '_detail.jpg',
								 "thumbnail": dir+'/assets/' + object.image + '_thumb.jpg',
								"caption": "",
								"credit": ""
							  },
							  "artist":object.artists,
							  "start_date": {
								"year": object.start_date ||1200,
							   
							  },
							  "id":object.id,
							   "end_date": {
								"year": object.end_date ||1200,
							   
							  },
							  "text": {
								"headline": object.title ||"w",
								"text": object.description + "<p><a href='#id/"+object.id + "/"+object.link+ "' >Click to find out more</a></p>",
							  },
							  "group": "PAINTINGS",
							  "background":{
											"color":"#0096bd"
											}
							})
			 }
			 
			 
			if(object.production_date_earliest>0){
					events.push(  {
						"media": {
						"url": dir+'/assets/' + object.image + '_detail.jpg',
						 "thumbnail": dir+'/assets/' + object.image + '_thumb.jpg',
						"caption": "",
						"credit": ""
					  },
					  "artist":object.artists,
					  "start_date": {
						"year": object.production_date_earliest ||1200,
					   
					  },
					  "id":object.id,
					   "end_date": {
						"year": object.production_date_latest ||1200,
					   
					  },
					  "text": {
						"headline": object.title ||"w",
						"text": object.description + "<p><a href='#id/"+object.id + "/"+object.link+ "' >Click to find out more</a></p>",
					  },
					  "group": "PAINTINGS",
					  "background":{
									"color":"#0096bd"
									}
					})
			 }
		  })
 })
 
	//add events to timeline
    timeline.events=events
	
	console.log($routeParams)	
	 $timeout(function () {
		  $scope.timeline.setData(timeline);
		  
		  if($routeParams.museum_objectId){
	  
			angular.forEach($scope.timeline._storyslider._slides , function(slide, key) {
			if(slide.data.id){
				if( $routeParams.museum_objectId==slide.data.id)	
				$scope.timeline.goTo(key)
				}
			})	
		}
		else{
		  $scope.timeline.goTo(1);
		 }
	}, 200);

    $scope.$watch('options', function(newOptions) {
      if($scope.timeline) {
        $scope.timeline.setOptions(newOptions);
      }
    }, true);
	
	};

 
 
   
	
  }]);
/* jshint +W106 */