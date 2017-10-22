var model = [{
    title: 'My Home',
    location: {
      lat: -37.825242,
      lng: 144.965672
    }
  },
			
  {
    title: 'Crown ',
    location: {
      lat: -37.823514,
      lng: 144.958076
    }
  },
  {
    title: 'federation Square ',
    location: {
      lat: -37.817972,
      lng: 144.969041
    }
  },
  {
    title: 'City Square',
    location: {
      lat: -37.815871,
      lng: 144.966901
    }
  },
  {
    title: 'Starbucks',
    location: {
      lat: -37.813480,
      lng: 144.966305
    }
  },
  {
    title: 'Monash College',
    location: {
      lat: -37.813107,
      lng: 144.966281
    }
  },
  {
    title: 'Albert Park',
    location: {
      lat: -37.845071,
      lng: 144.968891
    }
  },
  {
    title: 'Port melbourne Beach',
    location: {
      lat: -37.842733,
      lng: 144.935074
    }
  },
  {
    title: 'Williamstown',
    location: {
      lat: -37.861031,
      lng: 144.885635
    }
  },
  {
    title: 'Monash University',
    location: {
      lat: -37.876954,
      lng: 145.04425
    }
  },
  {
    title: 'Chadstone',
    location: {
      lat: -37.886235,
      lng: 145.08296
    }
  },
];



//////////
//////
/////



 
$(document).ready(function(){
 
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
        },
        error: function (errorMessage) {
        }
    });
});








var Location = function(data) {

  var self = this;
  self.title = data.title;
  self.position = data.location;

};

var ViewModel = function() {
  var self = this;

  self.myLocations = ko.observableArray();

  self.userInput = ko.observable('');

  for (var i = 0; i < model.length; i++) {

    self.myLocations.push(new Location(model[i]));
  }

  self.doSomething = ko.computed(function(){
    console.log(self.userInput());
	  
	  
	  
	  
	  
  });

	
	
};




ko.applyBindings(new ViewModel())