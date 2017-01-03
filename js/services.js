'use strict';

/* Services */
 


var museum_objectcatServices = angular.module('museum_objectcatServices', ['ngResource']);




museum_objectcatServices.factory('app_functons', [ '$rootScope', function ( $rootScope) {

var app_functons=[]

app_functons.changeheadingcolor = function(kiosk) {

var color="color:"+ set_color_by_kiosk(kiosk)+";"

return  color
}	

app_functons.functionThatReturnsStyle = function(kiosk) {

var color="background-color:"+ set_color_by_kiosk(kiosk)+";"

return  color
}

   
return app_functons

}]);




museum_objectcatServices.factory('detect_dragging', function($rootScope) {
	
var detect_dragging=[]
 $rootScope.isDragging = false;
var currentPos = [];
detect_dragging.drag_handler= function(){
 $('md-content').on('mousedown', function (evt) {

   currentPos = [evt.pageX, evt.pageY]

 $('md-content').on('mousemove', function handler(evt) {

    currentPos=[evt.pageX, evt.pageY];
    $('#content-scroller').off('mousemove', handler);

  });

 $('md-content').on('mouseup', function handler(evt) {
	
    if(evt.pageX+ evt.pageY==currentPos[0]+currentPos[1]){
			console.log('clicking')
       $rootScope.isDragging = false;
	}
    else
	{
      $rootScope.isDragging = true;
		console.log('dragging')
	}
 $('md-content').off('mouseup', handler);
 
  });

});
}

/* App Module */

  return detect_dragging

})



museum_objectcatServices.factory('screen_saver_loop', function($rootScope,$location,$interval,app_settings) {
	



				//NB make sure any views called int he screensaver dont contain the screensaver service!
				 var sharedService = {};
				// var currentView ['/grid/story','/grid/object','']
				  $rootScope.i = 0
				 var timer
				 
				function switchview(i){
					var audioplayer
						 var videoElement = $('iframe').contents().find("video").get(0)
					
						if(!audioplayer ){var audioplayer=[]
						audioplayer.paused=true
						}
				var audioElement_not_playing = audioplayer.paused
						 

				if  ((!videoElement || videoElement.paused) && audioplayer.paused==true) {
					
			
						
						$rootScope.updateInterval 
						console.log(i)
						if(i>=screensaver.length){i=0;$rootScope.i=0}
						app_start_log(app_settings.kiosk,"SCREENSAVER")						
						$location.path(screensaver[i]+"/"+ kiosk_path)
						$rootScope.i++
					}
					else{
						
						console.log('video playing..cancel')
					}
					
						

				}

				//	$interval.cancel(timer);

				  sharedService.start_screen_saver = function() {
					
			
					  $interval.cancel($rootScope.timer );
					
					if($location.path()!="/screen_saver_images"){	
							$rootScope.screensaver_on=true
						
							$rootScope.timer = $interval(function() { switchview( $rootScope.i) },5   * 60*   1000)
					}
					
				  
				  };

				  sharedService.screensaverOff = function() {
						$rootScope.screensaver_on=false
					   $interval.cancel($rootScope.timer );
					   console.log('screensaver off')
					  
				
				   
				  };

				  return sharedService;
});
  
  



museum_objectcatServices.factory('museum_object', ['$resource','$location',
  function($resource,$location){
	  
	function resourceErrorHandler(response) { 

$location.path( "/"+kiosk );
 }  
	  
	  
	 return  $resource(dir+'/id/:museum_objectId.json', {} , 
{
        'get':    {method:'GET',  params:{museum_objectId:'museum_objectId'}}
   
})
	 /*
    return $resource(dir+'/id/:museum_objectId.json', {}, {
  query: {method:'GET', params:{museum_objectId:'museum_objectId'}, isArray:true,interceptor : {responseError : resourceErrorHandler}}
    });
	
*/
  }]);
  
  museum_objectcatServices.factory('record_id', function() {
   var record_id = 'default';
   return {
     record_id: function() { return record_id; },
     setrecord_id: function(record_id) { record_id = newrecord_id }
   };
});

 
  
  museum_objectcatServices.factory('image_feed', ['$resource',
  function($resource){
    return $resource( {}, {
	
      query: {method:'GET', params:{museum_objectId:'museum_objectId'}, isArray:true}
    });

  }]);

  
  museum_objectcatServices.factory("timeline_service", function ($resource) {
//asyncronicity can cause issues when calling the data - need to use a callback function!!   
   return $resource(dir+'data/timeline.json',{isArray:true});
});
  
museum_objectcatServices.factory('productService', function() {
  var productList
   var next_id
   var prev_id


  var addProduct = function(newObj) {
      productList=(newObj);
  };
  var getProducts = function(newObj) {
     return productList;
  };

  var getProduct_id = function(next_prev,museum_object_id){
  
  console.log('looking for '+museum_object_id)
   
	 if(next_prev=="next"){
     for (var key in productList) {
	
			if (productList[key].id){
				if (productList[key].id == museum_object_id) {
			
				return productList[ parseInt(key)+1].id;
				}
			}
		}
	
	}
	else{
	
	    for (var key in productList) {
			if (productList[key].id){
				if (productList[key].id == museum_object_id) {
				
				return productList[ parseInt(key)-1].id;
				}
			}
		}
		
	}
	
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts,
	 getProduct_id: getProduct_id
  };

});


museum_objectcatServices.factory('load_object_record', function() {

 var load_object_record = function(museum_object) {

  
  var mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
	
			var source
			var controller=[]
			controller.videos=[]
			if(museum_object.video){
			
			_.each(museum_object.video, function(vid) { 

					/*
					source= {
						sources: [
							{src: $sce.trustAsResourceUrl("http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+vid.video), type: "video/mp4",
							name:vid.name
							}
						]
					}
					*/
					controller.config = {
                preload: "none",
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: controller.videos[0] && controller.videos[0].sources ||"",
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                plugins: {
                    poster: "http://museums.bristol.gov.uk/m-shed/assets/"+vid.image+"_detail.jpg"
                }
            };

					controller.videos.push(source)
									});
			}
			
	
}

 return {
    load_object_record: load_object_record
   
  };
  
  
});




museum_objectcatServices.factory('museum_object_index', ['$resource',
  function($resource){
    return $resource(dir+'/data/index-:listType.json', {}, {
      
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);

  museum_objectcatServices.factory('artist_list', ['$resource',
  function($resource){
    return $resource(dir+'/data/band_list.json', {}, {
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);
  
    museum_objectcatServices.factory('museum_objects_by_artist', ['$resource',
  function($resource){

    return $resource(dir+'/data/index-:artist_listType.json', {
	}, {
     
	   query_index: {method:'GET', params:{}, isArray:true},
	   objects:'cheese'
    });

  }]);
  
    museum_objectcatServices.factory('gallery_list', ['$resource',
  function($resource){
    return $resource(dir+'/data/gallery_list.json', {}, {
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);
  
     museum_objectcatServices.factory('picklist', [
        
        function province() {
            function getProvinces() {
                return [
                    {
                        "name": "Alberta",
                        "value":"alberta"
                    },
                    {
                        "name":"British Columbia",
                        "value":"british_columbia"
                    },
                    {
                        "name":"Manitoba",
                        "value":"manitoba"
                    },
                    {
                        "name":"New Brunswick",
                        "value":"new_brunswick"
                    },
                    {
                        "name":"Newfoundland and Labrador",
                        "value":"newfoundland_and_labrador"
                    },
                    {
                        "name":"Northwest Territories",
                        "value":"northwest_territories"
                    },
                    {
                        "name":"Nova Scotia",
                        "value":"nova_scotia"
                    },
                    {
                        "name":"Nunavut",
                        "value":"nunavut"
                    },              
                    {
                        "name":"Ontario",
                        "value":"ontario"
                    },
                    {
                        "name":"Prince Edward Island",
                        "value":"prince_edward_island"
                    },
                    {
                        "name":"Quebec",
                        "value":"quebec"
                    },
                    {
                        "name":"Saskatchewan",
                        "value":"saskatchewan"
                    },
                    {
                        "name":"Yukon",
                        "value":"Yukon"
                    },
                ];
            }

            return {
                getProvinces: getProvinces
            }
        }])
        

  
  museum_objectcatControllers.controller('MyCtrl', ['$scope', '$debounce', function($scope, $debounce) {
        $scope.val = 0;
        $scope.inc = function() {
            $debounce(increase, 300);
        };

        var increase = function() {
            $scope.val++;
        }           
    }])
    // http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
    // adapted from angular's $timeout code
    museum_objectcatServices.factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
        function($rootScope,   $browser,   $q,   $exceptionHandler) {
            var deferreds = {},
                methods = {},
                uuid = 0;

            function debounce(fn, delay, invokeApply) {
                var deferred = $q.defer(),
                    promise = deferred.promise,
                    skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                    timeoutId, cleanup,
                    methodId, bouncing = false;

                // check we dont have this method already registered
                angular.forEach(methods, function(value, key) {
                    if(angular.equals(methods[key].fn, fn)) {
                        bouncing = true;
                        methodId = key;
                    }
                });

                // not bouncing, then register new instance
                if(!bouncing) {
                    methodId = uuid++;
                    methods[methodId] = {fn: fn};
                } else {
                    // clear the old timeout
                    deferreds[methods[methodId].timeoutId].reject('bounced');
                    $browser.defer.cancel(methods[methodId].timeoutId);
                }

                var debounced = function() {
                    // actually executing? clean method bank
                    delete methods[methodId];

                    try {
                        deferred.resolve(fn());
                    } catch(e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    }

                    if (!skipApply) $rootScope.$apply();
                };

                timeoutId = $browser.defer(debounced, delay);

                // track id with method
                methods[methodId].timeoutId = timeoutId;

                cleanup = function(reason) {
                    delete deferreds[promise.$$timeoutId];
                };

                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                promise.then(cleanup, cleanup);

                return promise;
            }


            // similar to angular's $timeout cancel
            debounce.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject('canceled');
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };

            return debounce;
    }]);
	
	

