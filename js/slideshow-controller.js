museum_objectcatControllers.controller('slideshowCtrl', 
										['$scope', 
										'$routeParams',
										'museum_object_index','screen_saver_loop','$location', '$interval','$rootScope',
		function($scope,  $routeParams,museum_object,screen_saver_loop,$location, $interval,$rootScope) {
		// screen_saver_loop.start_screen_saver()
			 $scope.kiosk=$routeParams.kiosk||"PPL-CR-ICT05"
kiosk=$routeParams.kiosk
$scope.kiosk=$routeParams.kiosk
kiosk=$routeParams.kiosk
$scope.functionThatReturnsStyle = function() {
kiosk=$scope.kiosk
var color="background-color:"+ set_color_by_kiosk(kiosk)+" !important;"

     return  color
}

  $scope.start_screen_saver = function ( ) {
	 screen_saver_loop.start_screen_saver()
		
};


$scope.changeheadingcolor = function() {
kiosk=$scope.kiosk

var color="color:"+ set_color_by_kiosk(kiosk)+";"

     return  color
}
	 

   $scope.go = function ( path ) {
	
		$location.path( path +"/"+$routeParams.kiosk);
};

			
				
					var fotorama = $('.fotorama').fotorama();
					$scope.dismiss = function() {
						   element.modal('hide');
				   }; 
				   
					$scope.pageClass = 'page-contact';			   
					$scope.ngHide=true

					$scope.filter = function(result) {
						var filter=$scope.filtervalue
						if(filter.length>1){
						$scope.listType=$routeParams.index||"people"
						$scope.shuffle="false"
						}
						else{
					
						$scope.listType=$routeParams.index||"people"
						$scope.shuffle="true"
						}
						$scope.labels="labels"
						$scope.directory=dir
									$scope.museum_objects = museum_object.query_index({listType:$scope.listType}, function(museum_objects) {
									
									
									
									var datax = []
									var keys=[]
									
								
									
									//decide which asearch to run
									var search_type = "all"
									if(filter.length>1){
									search_type = "fuzzy_match"
									}
									if($routeParams.ids){
										
									search_type = "record_set"
									}
									
									
									
									
								switch(search_type) {
									case "all":
													//return everything in the chosen list
													console.log("returning entire list")
													var result = $scope.museum_objects;
										break;
									case "fuzzy_match":
													//run a fuzzy text search
													  var options = {
													  caseSensitive: false,
													  includeScore: false,
													  shouldSort: true,
													  threshold: 0.4,
													  location: 1,
													  distance:1,
													  maxPatternLength: 1,
													  keys: ["name","description"]
													};
													
													console.log("searching on"+filter.length)
													var fuse = new Fuse( $scope.museum_objects, options); // "list" is the item array
													var result = fuse.search(filter);
													result=JSON.stringify(result)
													var result = JSON.parse(result);
										break;
										case "record_set":
										
										var url_ids = $routeParams.ids.split("-")
										var result =[]
										angular.forEach($scope.museum_objects, function(object, key) {
											angular.forEach(url_ids, function(idx) {
												
												
													if(object.id==idx){
													
														result.push(object)
														
											}
											})
										})										
												
												
												
												
													//var result = JSON.parse(result);
													
											break;
											default:
											alert('which search?')
											}
								
								
									
											$scope.dismiss();
											
											if(result.lenth>0){
											alert('none found')
												$scope.dismiss();
											}
								
										
									angular.forEach(result, function(value, key) {
				
										// if(value.name&&value.description){
											 name=value.name
											 name=name.toUpperCase()
											
											// if(name.indexOf(filter.toUpperCase())>-1 ||filter=="" ||value.description.toUpperCase().indexOf( filter.toUpperCase())>-1){
											
												var img={img: dir+'/assets/' + value.image + '_detail.jpg', 
														full:  dir+'/assets/' + value.image + '_detail.jpg', 
														thumb:  dir+'/assets/' + value.image + '_thumb.jpg',
														id:value.id ,														
														gallery:value.gallery ,
														caption:value.name,
														description:value.description
														}
														
														
														
												if(value.video) {
														img["video"] =  dir+"assets/videos/"+value.video.video+".mp4";
														

												}
												if(value.audio) {
														var audiohtml='<div data-img:"'+dir+'/assets/' + value.image + '_detail.jpg">';
														audiohtml+='<audio class="audioControls" controls loop>';
														audiohtml+='<source src="'+dir+'/assets/audio/'+value.audio.video+'.'+value.audio.filetype+'">';
														audiohtml+='</audio>';
														audiohtml+='</div>';
													
														img["html"] =audiohtml ;
														//img["img"] ="" ;
														
														
												}
												//console.log(value.orientation)
												if(value.orientation=="landscape") {
														img["fit"] = "cover";
														
												}else{
														img["fit"] = "contain";
												
												}
													//console.log(img["fit"])
													//if($.inArray( value.id, keys )==-1){
													datax.push(img );
													keys.push(value.id)
													//}
										 //  }
									   //}
									});

								var data = [];
								data.data=(datax );
								var fotorama = $('.fotorama').data('fotorama');	
							console.log('dataload')
								fotorama.load(datax);
								console.log(datax)
								 });
								 
								fotorama.on('fotorama:show', function (e, fotorama) {
							
									     $('audio').attr("autoplay","");
									    
										 $.getJSON( dir+"/id/"+fotorama.activeFrame.id+".json", function( data ) {
												var items = [];
												$('#modaltitle').text(fotorama.activeFrame.caption)
												$('#modalInfo').html(data.description)
												var children=data.child
												console.log('children',children)
												var child_id_string = "#/slideshow/ids/"
												angular.forEach(children, function(value, key) {
												child_id_string+="-"+value.id
												$('#childlinks').show()
												})
												$('#childlinks').attr("href",child_id_string)
												
												if(fotorama.activeFrame.gallery[0]){
												
												var gallerthtml="<p> You can find out more about this in the ";
													gallerthtml+=fotorama.activeFrame.gallery[0]['EveEventTitle'];
													gallerthtml+=" gallery."	
													$('#gallery').html(gallerthtml)	
												}												
												
												

											});
								});
								
								$('.fotorama').on(
								
									  'fotorama:loadvideo ',
									
									  function (e, fotorama, extra) {
										  console.log('play video...')
									//screen_saver_loop.screensaverOff()
									});
					
					
										


    };
	$scope.filtervalue="";
	  $scope.filter("")
  }]);