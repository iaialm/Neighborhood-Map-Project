// the locations
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



var wikiUrl='http://en.wikipedia.org/w/api.php?action=opensearch&search='+ userInput+'&format=json&callback';
 
var wikiReqeuestTimeout=setTimeout(function())
{$.wikiElm.text('faild to get wikipedia resources');						   
},8000);
								   
 
    $.ajax({
		url:wikiUrl,
		dataType: "jsonp",
        //type: "GET",
        success: function (response) {
			
			var articlelist = response[1]
			
			for(var i=0; i< articlelist.length;i++){
				
				var articleleStr=articlelist[i];
				var url='http://en.wikipedia.org/wiki/'+articleleStr;
				$.wikiElm.append('<li> a href="'+url+'">'+articleleStr+'</a><li>');
			}
				
			clearTimeout(wikiReqeuestTimeout);
			  }	
				});
			
        
  
var Location = function(data) {

  var self = this;
  self.title = data.title;
  self.position = data.location;

};

var ViewModel = function() {
  var self = this;

  // add the observable for the wikidata here
  // http://knockoutjs.com/documentation/html-binding.html

  self.myLocations = ko.observableArray();

  self.userInput = ko.observable('');

  for (var i = 0; i < model.length; i++) {

    self.myLocations.push(new Location(model[i]));
  }

  self.doSomething = ko.computed(function(){

    var userInput = self.userInput().toLowerCase();

    var matchingItems = [];

    //console.log(userInput);

    if (!userInput) {
      return self.myLocations();
    }

    // iterate over self.myLocations() 

    self.myLocations().forEach(function(location) {

      var title = location.title.toLowerCase();

      console.log(title, userInput)

      // check if the substring userInput can be found in
      // the location's title (use the toLowerCase method)
      // use, for example, the String indexOf() method to ifnd the substring
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
      // if there is a match, push the location object to the matchingItems Array

    });

    return matchingItems;
	  
  });

	
	
};


var vm = new ViewModel();

ko.applyBindings(vm)