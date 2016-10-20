


museum_objectcatServices.factory('media_player', ['$http', function ($http) {

    var urlBase =  'http://markpajak.co.uk/mark/kiosk-feedback/user_analytics.php';
    var StudentDataOp = {};
	var novideo =true
	var video_button_style
	var audiohtml="<h1>bread</h1>"
	
	getStudents = function () {
        return $http.get(urlBase+'/GetStudents');
    };
	
	 StudentDataOp.play_video = function (dir,museum_object) {
		// $('.fotorama').data('fotorama').destroy()
		var fotorama = $('.fotorama').fotorama();
		 if(dir.indexOf("file") == -1){dir=dir+"/"}
		
		
									var datax = []
									var keys=[]
				angular.forEach(museum_object.images, function(slide, key) {
					
										// if(value.name&&value.description){
											 name=museum_object.name
											 name=name.toUpperCase()
											
											// if(name.indexOf(filter.toUpperCase())>-1 ||filter=="" ||value.description.toUpperCase().indexOf( filter.toUpperCase())>-1){
											
												var img={img: dir+'/assets/' +slide.image + '_detail.jpg', 
														full:  dir+'/assets/' + slide.image + '_detail.jpg', 
														thumb:  dir+'/assets/' + slide.image + '_thumb.jpg',
														id:museum_object.id ,														
														gallery:museum_object.gallery ,
														caption:museum_object.name,
														description:museum_object.description
														}
														
														
														
												if(museum_object.video) {
														img["video"] =  dir+"assets/videos/"+museum_object.video.video+".mp4";
														

												}
												if(museum_object.audio) {
														var audiohtml='<div data-img:"'+dir+'/assets/' + museum_object.images[0].image + '_detail.jpg">';
														audiohtml+='<audio id="audioplayer" class="audioControls"  >';
														audiohtml+='<source src="'+dir+'assets/audio/'+museum_object.audio[0].video+'.'+museum_object.audio[0].filetype+'">';
														audiohtml+='</audio>';
														audiohtml+='</div>';
													
														img["html"] =audiohtml ;
														//img["img"] ="" ;
														
														
												}
												//console.log(value.orientation)
												if(museum_object.orientation=="landscape") {
														img["fit"] = "cover";
														
												}else{
														img["fit"] = "contain";
												
												}
													//console.log(img["fit"])
													//if($.inArray( value.id, keys )==-1){
													datax.push(img );
													keys.push(museum_object.id)
													//}
										 //  }
									   //}
								
				
								
								
								
								})
							var data = [];
								data.data=(datax );
							$(function() {	
								 fotorama =$('#'+museum_object.id+"_fotorama").data('fotorama');
								 
						$('#'+museum_object.id+"_fotorama").data('fotorama').destroy()
								fotorama.load(datax);
								console.log('fotorama datax',datax)
								fotorama.playVideo()
								$('audio').attr("autoplay","");
								
							})
							
    };
    return StudentDataOp;

}]);
