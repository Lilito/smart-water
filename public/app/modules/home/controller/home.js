app.controller('HomeCtrl', function ($scope, $http , AuthService, $timeout) {
    //ionic.material.ink.displayEffect();

    $scope.user = {};
    $scope.auth = {};
    $scope.evaluation= {};
    $scope.user.username = AuthService.username();
    $scope.user.name = AuthService.name();
    $scope.spinner = {};



    function loadValves(){
      var myloc = new google.maps.LatLng(20.3001358,-103.1895831);
      var mapOptions = {
          zoom: 15,
          center: myloc,
          scrollwheel: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      $scope.map = new google.maps.Map(document.getElementById('map_canvas'),mapOptions);
      var red = new google.maps.MarkerImage('images/manage_32_red.png',
        new google.maps.Size(50, 50),
        new google.maps.Point(0,0),
        new google.maps.Point(12, 16));

        var green = new google.maps.MarkerImage('images/manage_32_green.png',
          new google.maps.Size(50, 50),
          new google.maps.Point(0,0),
          new google.maps.Point(12, 16));

          var closed = new google.maps.MarkerImage('images/manage_32.png',
            new google.maps.Size(50, 50),
            new google.maps.Point(0,0),
            new google.maps.Point(12, 16));






      $http.get('/api/valves/' ).success(function(data, status, headers, config) {
       $scope.valvesList = data.body.rows;

       $scope.valvesList.forEach(function(valve){
         var icon;
         if(valve.doc.active){
           icon=green;
         }
         if(!valve.doc.active){
           icon=closed;
         }
         if(valve.doc.issued){
           icon=red;
         }
          var marker = new google.maps.Marker({
             position: new google.maps.LatLng(valve.doc.latitude, valve.doc.longitude),
             map: $scope.map,
             icon: icon
         });

         var contentString = '<div id="content" style="dir:rtl; text-align:right;">'+
                 '<div id="siteNotice">'+
                 '</div>'+
                 '<h1 id="firstHeading" class="firstHeading"><h1>'+valve.doc._id+'</h1>'+
                 '<div id="bodyContent">'+
                 '<p>'+valve.doc.time+ 'minutes</p>'+
                 '</div>'+
                 '</div>';
         var infowindow = new google.maps.InfoWindow({
             content: contentString,
             maxWidth: 250
         });
         google.maps.event.addListener(marker, 'click', function() {
             infowindow.open($scope.map,marker);
         });


       });


     }).error(function(data, status, headers, config) {
       $scope.spinner.usersList = false;
     });
    }

loadValves();



});

app.filter("capitalize", function(){
   return function(text) {
       if(text !== null) {
           return text.substring(0,1).toUpperCase()+text.substring(1);
       }
   };
});
