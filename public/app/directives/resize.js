define([ "module"],function( module){

	/**
	 * This is the global app controller.  Here you can place functions that are accessible to All other views
	 * @class
	 * @memberof commonapp
	 */
	function DataSrvc(){

    return function(scope, element, attrs) {
			console.log($(window).height() - $('.navbar').outerHeight() - $('.footer').outerHeight());
      $(element).css("min-height", $(window).height() - $('.navbar').outerHeight() - $('.footer').outerHeight());
			$(window).resize();
    }

	}

	return [DataSrvc];
});
