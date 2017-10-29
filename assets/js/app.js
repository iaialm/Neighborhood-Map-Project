// the map 
var locations = [{
    title: 'My Home',
    location: {
        lat: -37.825242,
        lng: 144.965672
    },
}, {
    title: 'Crown ',
    location: {
        lat: -37.823514,
        lng: 144.958076
    },
}, {
    title: 'federation Square ',
    location: {
        lat: -37.817972,
        lng: 144.969041
    },
}, {
    title: 'City Square',
    location: {
        lat: -37.815871,
        lng: 144.966901
    },
}, {
    title: 'Starbucks',
    location: {
        lat: -37.813480,
        lng: 144.966305
    },
}, {
    title: 'Monash College',
    location: {
        lat: -37.813107,
        lng: 144.966281
    },
}, {
    title: 'Albert Park',
    location: {
        lat: -37.845071,
        lng: 144.968891
    },
}, {
    title: 'Port melbourne Beach',
    location: {
        lat: -37.842733,
        lng: 144.935074
    },
}, {
    title: 'Williamstown',
    location: {
        lat: -37.861031,
        lng: 144.885635
    }
}, {
    title: 'Monash University',
    location: {
        lat: -37.876954,
        lng: 145.04425
    }
}, {
    title: 'Chadstone',
    location: {
        lat: -37.886235,
        lng: 145.08296
    }
}, ];

function initMap() {
    setAllURLs();

    map = new google.maps.Map(document.getElementById('map'), {
        center: locations[0].location,
        zoom: 13
    });

    // https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html#L239
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }
      var markers = []
      var defaultIcon = makeMarkerIcon('0091ff');


    var infowindow = new google.maps.InfoWindow();
    locations.forEach(function(location, index) {

        var position = location.location;
        var title = location.title;
        var url = location.url;

        var marker = new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            index: index
        });

        markers.push(marker)

        vm.locations()[index].marker = marker

        marker.addListener('click', function() {
            markers.forEach(function(marker) {
              marker.setIcon(defaultIcon)
            })
            var url = location.url;
            console.log(locations);
            infowindow.setContent(this.title + "  " + " check this link " + "  " + url);
            infowindow.open(map, this);
            marker.setIcon("https://cdn3.iconfinder.com/data/icons/musthave/24/Stock%20Index%20Down.png");
        });
    });
}

//locations
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
    }, {
        title: 'federation Square ',
        location: {
            lat: -37.817972,
            lng: 144.969041
        }
    }, {
        title: 'City Square',
        location: {
            lat: -37.815871,
            lng: 144.966901
        }
    }, {
        title: 'Starbucks',
        location: {
            lat: -37.813480,
            lng: 144.966305
        }
    }, {
        title: 'Monash College',
        location: {
            lat: -37.813107,
            lng: 144.966281
        }
    }, {
        title: 'Albert Park',
        location: {
            lat: -37.845071,
            lng: 144.968891
        }
    }, {
        title: 'Port melbourne Beach',
        location: {
            lat: -37.842733,
            lng: 144.935074
        }
    }, {
        title: 'Williamstown',
        location: {
            lat: -37.861031,
            lng: 144.885635
        }
    }, {
        title: 'Monash University',
        location: {
            lat: -37.876954,
            lng: 145.04425
        }
    }, {
        title: 'Chadstone',
        location: {
            lat: -37.886235,
            lng: 145.08296
        }
    },
];



var Location = function(data) {
	"use strict";
    var self = this;

    self.title = data.title;
    self.position = data.location;
};


var ViewModel = function() {
	"use strict";
    var self = this;
    self.locations = ko.observableArray();
    self.userInput = ko.observable('');
    for (var i = 0; i < model.length; i++) {
    self.locations.push(new Location(model[i]));
    }

    self.fillterdlocations = ko.computed(function() {
        var userInput = self.userInput().toLowerCase();

        return ko.utils.arrayFilter(self.locations(), function(location) {
                  var doesMatch = location.title.toLowerCase().indexOf(userInput) >= 0; // true or false
                  if (location.marker) location.marker.setVisible(doesMatch)
                  return doesMatch
                });
    });

    // http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
    self.doSomethingWithTheMarkerWhenListItemClicked = function(clickedLocation) {
      //console.log('click')
      console.log(clickedLocation)

      // use clickedLocation.marker to activate the clicked list item's map marker
      // for example, the google.maps.event.trigger() method can be helpful
    };
};

var vm = new ViewModel();

ko.applyBindings(vm);



// wikepedia section 
function getURL(title, index) {
	"use strict";
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + title + '&format=json';
	
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response) {
            var articlelist = response[1];

            for (var i = 0; i < articlelist.length; i++) {
                var articleleStr = articlelist[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleleStr;
                locations[index].url = url;
            }
        }
    });
}
function setAllURLs() {
	"use strict";
    for (var i = 0; i < locations.length; i++)
        getURL(locations[i].title,i);
}