


museum_objectcatServices.factory('send_data', ['$http', function ($http) {

    var urlBase =  'http://markpajak.co.uk/mark/kiosk-feedback/user_analytics.php';
    var StudentDataOp = {};

    StudentDataOp.getStudents = function () {
        return $http.get(urlBase+'/GetStudents');
    };

    StudentDataOp.add_log = function (page) {
	    
	    page.app_type="INTERPRETATION-KIOSK";
	     page.location="MSHED";
		
		  return $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : urlBase, // the url where we want to POST
            data        : page, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
             encode          : true
        })
		
		
		
       // return $http.post(urlBase + '?page_id='+ page.id + '&page_name='+ page.name+ '&kiosk='+ page.kiosk);
    };
    return StudentDataOp;

}]);
