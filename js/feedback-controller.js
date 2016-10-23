

museum_objectcatControllers.controller('feedbackCtrl',  ['$scope',
																   '$routeParams',
																   'museum_object',
																   '$sce', 
																   "$timeout",
																   "productService",
																   "load_object_record",
																   "record_id",'$location','$interval','$rootScope','screen_saver_loop','app_settings','app_functons',
  function($scope, $routeParams, museum_object,$sce,$timeout,productService,load_object_record,record_id ,$location, $interval,$rootScope,screen_saver_loop,app_settings,app_functons) {


$scope.pageClass = 'page-grid';
$scope.kiosk=$routeParams.kiosk //menu button
$scope.call_to_action=app_settings.call_to_action
kiosk_path=$routeParams.kiosk
$scope.start_screen_saver = function () {
	 screen_saver_loop.start_screen_saver()
		
};
$scope.functionThatReturnsStyle = function() {
	return app_functons.functionThatReturnsStyle($routeParams.kiosk)	
		
};
$scope.changeheadingcolor = function() {
	return app_functons.changeheadingcolor($routeParams.kiosk)	
		
};


$scope.go = function ( path ) {
																 
$location.path( path);
};
  

$scope.menu=app_settings.menu
$scope.show_menu=app_settings.hide_menu	



	  
  

  
  $scope.card = {};
  $scope.card.title = 'test';

 

	
	   
	
 $scope.MainController = function ( picklist ) {
    var vm = this;
    // funcation assignment
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: '#',
      url: '#' // a link to your twitter/github/blog/whatever
    };
    vm.exampleTitle = 'Introduction';
    vm.env = {
      angularVersion: angular.version.full
    };

    vm.model = {
      awesome: true,
	  kiosk:app_settings.kiosk,
	  description:""
    };
    vm.options = {
      formState: {
        awesomeIsForced: false
      }
    };
    
    vm.fields = [
     
	  {

                            type: 'radio',
                            key: 'satisfaction',							
                            templateOptions: {
                              label: "How satisfied are you with your experience of using this information kiosk?",  
                                
                                options: [
									 {
										"name": "very satisfied",
										"value": "very satisfied"
									  },
									  {
										"name": "satisfied",
										"value": "satisfied"
									  },
									  {
										"name": "neither satisfied nor disatisfied",
										"value": "neither satisfied nor disatisfied"
									  },
									  {
										"name": "disatisfied",
										"value": "disatisfied"
									  },
									  {
									  
										"name": "very disatisfied",
										"value": "very disatisfied"
									  }
                                ]
							}
	  },{
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Why?',
          placeholder: 'we will use your feedback to try and make it better',
          description: ''
        },
        expressionProperties: {
          'templateOptions.focus': 'formState.awesomeIsForced',
          'templateOptions.description': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'And look! This field magically got focus!';
            }
          }
        }
      },
/*
      {
        key: 'awesome',
        type: 'checkbox',
        templateOptions: { label: '' },
        expressionProperties: {
          'templateOptions.disabled': 'formState.awesomeIsForced',
          'templateOptions.label': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'Too bad, formly is really awesome...';
            } else {
              return 'Is formly totally awesome? (uncheck this and see what happens)';
            }
          }
        }
		
      },
	  */
      {
        key: 'whyNot',
        type: 'textarea',
        expressionProperties: {
          'templateOptions.placeholder': function(viewValue, modelValue, scope) {
            if (scope.formState.awesomeIsForced) {
              return 'Too bad... It really is awesome! Wasn\'t that cool?';
            } else {
              return 'Type in here... I dare you';
            }
          },
          'templateOptions.disabled': 'formState.awesomeIsForced'
        },
        hideExpression: 'model.awesome',
        templateOptions: {
          label: 'Why Not?',
          placeholder: 'Type in here... I dare you'
        },
        watcher: {
          listener: function(field, newValue, oldValue, formScope, stopWatching) {
            if (newValue) {
              stopWatching();
              formScope.model.awesome = true;
			  formScope.model.satisfaction = undefined;
			  formScope.model.kiosk=app_settings.kiosk;
              formScope.model.whyNot = undefined;
              field.hideExpression = null;
              formScope.options.formState.awesomeIsForced = true;
            }
          }
        }
      },
     
      {
        key: 'exampleDirective',
        template: '<div example-directive></div>',
        templateOptions: {
          label: 'Example Directive',
        }
      }
    ];

    // function definition
    function onSubmit() {
		
		
      formData=(vm.model);
	 
	  
	  if(formData.satisfaction ||formData.description!=""){
	  
	    $.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : 'http://markpajak.co.uk/mark/kiosk-feedback/logger.php', // the url where we want to POST
            data        : formData, // our data object
            dataType    : 'json', // what type of data do we expect back from the server
             encode          : true,
			  success: function(data) {
        	
               
    }
        }).done(function(data) { console.log('suvccess')
				vm.options.resetModel()
  $scope.go('/'+$routeParams.kiosk)})
    .fail(function() { })
    .always(function() { });
           

        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();

	  }
	  
	  
    }
		
    
 }

		
						
}]);
