


museum_objectcatServices.factory('app_settings', ['$http', function ($http) {

   

	var menu={}
	menu.hide_browse_button = false
	menu.hide_stories_button= true
	menu.hide_objects_button= true
	menu.hide_list_button= true
	menu.hide_timeline_button= true
	menu.hide_slideshow_button= true
	menu.hide_feedback_button= true
	kiosk="SOMALI-KIOSK"
	call_to_action="Select a picture"
	 var app_settings = {'hide_menu':true,'menu':menu,'call_to_action':call_to_action,'kiosk':kiosk};
	
	
    return app_settings;

}]);