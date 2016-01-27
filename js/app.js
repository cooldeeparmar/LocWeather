//Device Envent Listener
$( document ).ready(function() {
      document.addEventListener("deviceready",onDeviceReady,false);
 });
function onDeviceReady()
{
	$('#show_loc').click(function(e){
        e.preventDefault();
        getMoreLocation();
	});
	$('#show_clear').click(function(e){
        e.preventDefault();
        getClearinfo();
	});
  $('#otherloc').click(function(){
        var city=$('#city').val();
        var state=$('#state').val();
        html ='<h1>'+city+','+state+'</h1>';
        $('#Myloc').html(html);
        getWeather(city,state);

  });                       

	getdate();
	getLocation();
}



function getdate()
{
	var currentdate=new Date();
	var datetime=currentdate.getDate()+"/"
	            +(currentdate.getMonth()+1)+ "/"
	            +currentdate.getFullYear()+ " @ "
	            +currentdate.getHours()+ ":"
	            +currentdate.getMinutes()+ ":"
	            +currentdate.getSeconds();
	           
    $('#datetime_display').html(datetime);
}

function getLocation()
{
	     navigator.geolocation.getCurrentPosition(function(position){
         var lat=position.coords.latitude;
         var lon=position.coords.longitude;
         var city='';
         var state='';
         var html='';
         var latlng =lat+','+lon;
         $.ajax({

         	  url:'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng,
         	  dataType:'json',
         	  success:function(response){
                 city=response.results[0].address_components[3].long_name;
                 state=response.results[0].address_components[4].short_name;

                 html ='<h1>'+city+','+state+'</h1>';
                 $('#Myloc').html(html);

                 getWeather(city,state);
                 $('#show_wea').click(function(e){
                         e.preventDefault();
                          $('.navbar-toggle').click();
                          getMoreweather(city,state);
                    });

         	  }
         });




	 });
	
}
function getWeather(city,state)
{
	var output='';
	 $.ajax({
         	  url:'http://api.wunderground.com/api/fc0f6e7f891b5c7a/conditions/q/'+state+','+city+'.json',
         	  dataType:'jsonp',
         	  success:function(response){
         	  	   console.log(response.current_observation);
                  weather=response['current_observation']['weather'];
                  temp_sting=response['current_observation']['temperature_string'];
                  icon=response['current_observation']['icon_url'];
                  output='<h1 class="text-center"><img src="'+icon+'"> '+weather+'</h1>'+
                         '<h2 class="text-center">'+temp_sting+'</h2>';
                 $('#weather').html(output);
         	  }
         });

}
function getMoreLocation()
{
	 $('.navbar-toggle').click();
	var html='';
   navigator.geolocation.getCurrentPosition(function(position){
     html='<ul id="more_location_list" class="list-group">'+
          '<li class="list-group-item"><strong>Latitude:</strong>'+position.coords.latitude+'</li>'+
          '<li class="list-group-item"><strong>Longitude:</strong>'+position.coords.longitude+'</li>'+
          '<li class="list-group-item"><strong>Altitude:</strong>'+position.coords.altitude+'</li>'+
          '<li class="list-group-item"><strong>Accuracy:</strong>'+position.coords.accuracy+'</li>'+  
          '</ul>';
          $('#more_loc_dis').html(html);
    
   });
}
function getMoreweather(city,state)
{
  var output='';
   $.ajax({
            url:'http://api.wunderground.com/api/fc0f6e7f891b5c7a/conditions/q/'+state+','+city+'.json',
            dataType:'jsonp',
            success:function(response){
               console.log(response.current_observation);

               temp_f=response['current_observation']['temp_f'];
               temp_c=response['current_observation']['temp_c'];
               dewpoint_string=response['current_observation']['dewpoint_string'];
               dewpoint_f=response['current_observation']['dewpoint_f'];
               wind_string=response['current_observation']['wind_string'];
               wind_mph=response['current_observation']['wind_mph'];
               visibility_km=response['current_observation']['visibility_km'];
               solarradiation=response['current_observation']['solarradiation'];

               relative_humidity=response['current_observation']['relative_humidity'];
               local_time=response['current_observation']['local_time_rfc822'];
               precip_today_in=response['current_observation']['precip_today_in'];
               feelslike_string=response['current_observation']['feelslike_string'];
               feelslike_f=response['current_observation']['feelslike_f'];
               feelslike_c=response['current_observation']['feelslike_c'];
               
                 output='<ul id="more_location_list" class="list-group">'+
                '<li class="list-group-item"><strong>Dewpoint_string:</strong>'+dewpoint_string+'</li>'+
                '<li class="list-group-item"><strong>Dewpoint_f:</strong>'+dewpoint_f+'</li>'+
                '<li class="list-group-item"><strong>temp_f:</strong>'+temp_f+'</li>'+
                '<li class="list-group-item"><strong>temp_c:</strong>'+temp_c+'</li>'+  
                '</ul>';
                $('#more_weather_dis').html(output);     
            }
         });
    
}
function getClearinfo()
{
   getLocation();
   $('.navbar-toggle').click();
  $('#more_loc_dis').html('');
  $('#more_weather_dis').html('');
}