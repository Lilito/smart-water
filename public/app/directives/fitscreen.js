define([ "module"],function( module){

	return function(){

    return function(scope, element, attrs) {
      $(element).css("min-height", 20 + $(window).height() - $('.navbar').outerHeight() - $('.footer').outerHeight());
    };

	};

});
