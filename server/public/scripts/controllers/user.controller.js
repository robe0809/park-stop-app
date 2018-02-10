myApp.controller('UserController', ['UserService', function(UserService) {
  console.log('UserController created');
  
  var self = this;

  self.userService = UserService;
  self.parkList = UserService.parkList;
  self.userObject = UserService.userObject;

  console.log(self.userObject);

  self.nationalPark = [
    {
        name: "Acadia National Park",
        code: "acad",
        picture: "/assets/acadia.jpg"
    },
    {
        name: "Arches National Park",
        code:  "arch",
        picture: "/assets/Arches.jpg"
    },
    {
        name: "Badlands National Park",
        code: "badl",
        picture: "/assets/Badlands.jpg"
    },   
    {
        name: "Big Bend National Park",
        code: "bibe",
        picture: "/assets/Big-Bend.jpg"
    }, 
    {
        name: "Biscayne National Park",
        code: "bisc",
        picture: "/assets/Biscayne.jpg"
    }, 
    {
        name: "Black Canyon Of The Gunnison National Park",
        code: "blca",
        picture: "/assets/Black-Canyon-Gunnison.jpg"
    }, 
    {
        name: "Bryce Canyon National Park",
        code: "brca",
        picture: "/assets/Bryce-Canyon.jpg"
    }, 
    {
        name: "Canyonlands National Park",
        code: "cany",
        picture: "/assets/Canyonlands.jpg"
    }, 
    {
        name: "Capitol Reef National Park",
        code: "care",
        picture: "/assets/Capitol-Reef.jpg"
    }, 
    {
        name: "Carlsbad Caverns National Park",
        code: "cave",
        picture: "/assets/Carlsbad.jpg"
    }, 
    {
        name: "Channel Islands National Park",
        code: "chis",
        picture: "/assets/Channel-Islands.jpg"
    }, 
    {
        name: "Congaree National Park",
        code: "cong",
        picture: "/assets/Congaree.jpg"
    }, 
    {
        name: "Crater Lake National Park",
        code: "crla",
        picture: "/assets/Crater-lake.jpg"
    }, 
    {
        name: "Cuyahoga Valley National Park",
        code: "cuva",
        picture: "/assets/Cuyahoga.jpg"
    }, 
    {
        name: "Death Valley National Park",
        code: "deva",
        picture: "/assets/Death-Valley.jpg"
    }, 
    {
        name: "Denali National Park & Preserve",
        code: "dena",
        picture: "/assets/Denali.jpg"
    }, 
    {
        name: "Dry Tortugas National Park",
        code: "drto",
        picture: "/assets/Dry-Tortugas.jpg"
    }, 
    {
        name: "Everglades National Park",
        code: "ever",
        picture: "/assets/Everglades.jpg"
    }, 
    {
        name: "Gates Of The Arctic National Park & Preserve",
        code: "gaar",
        picture: "/assets/Gates-of-the-Arctic.jpg"
    }, 
    {
        name: "Glacier National Park",
        code: "glac",
        picture: "/assets/Glacier.jpg"
    }, 
    {
        name: "Glacier Bay National Park & Preserve",
        code: "glba",
        picture: "/assets/Glacier-Bay.jpg"
    }, 
    {
        name: "Grand Canyon National Park",
        code: "grca",
        picture: "/assets/Grand-Canyon.jpg"
    }, 
    {
        name: "Grand Teton National Park",
        code: "grte",
        picture: "/assets/Grand-Teton.jpg"
    }, 
    {
        name: "Great Basin National Park",
        code: "grba",
        picture: "/assets/Great-Basin.jpg"
    }, 
    {
        name: "Great Sand Dunes National Park & Preserve",
        code: "grsa",
        picture: "/assets/Great-Sand-Dunes.jpg"
    }, 
    {
        name: "Great Smoky Mountains National Park",
        code: "grsm",
        picture: "/assets/Great-Smoky-Mountains.jpg"
    }, 
    {
        name: "Guadalupe Mountains National Park",
        code: "gumo",
        picture: "/assets/Guadalupe-Mountains.jpg"
    },
    {
        name: "Haleakala National Park",
        code:  "hale",
        picture: "/assets/Haleakala.jpg"
    },
    {
        name: "Hawai'i Volcanoes National Park",
        code: "havo",
        picture: "/assets/Hawaii-Volcanoes.jpg"
    },
    {
        name: "Hot Springs National Park",
        code: "hosp",
        picture: "/assets/Hot-Springs.jpg"
    },
    {
        name: "Isle Royale National Park",
        code: "isro",
        picture: "/assets/Isle-Royale.jpg"
    },
    {
        name: "Joshua Tree National Park",
        code: "jotr",
        picture: "/assets/Joshua-Tree.jpg"
    },
    {
        name: "Katmai National Park & Preserve",
        code: "katm",
        picture: "/assets/Katmai.jpg"
    },
    {
        name: "Kenai Fjords National Park",
        code: "kefj",
        picture: "/assets/Kenai-Fjords.jpg"
    },
    {
        name: "Kobuk Valley National Park",
        code:  "kova",
        picture: "/assets/Kobuk-Valley.jpg" 
    },
    {
        name: "Lake Clark National Park & Preserve",
        code: "lacl",
        picture: "/assets/Lake-Clark.jpg"
    },
    {
        name: "Lassen Volcanic National Park",
        code: "lavo",
        picture: "/assets/Lassen.jpg"
    },
    {
        name: "Mammoth Cave National Park",
        code: "maca",
        picture: "/assets/Mammoth.jpg"
    },
    {
        name: "Mesa Verde National Park",
        code: "meve",
        picture: "/assets/Mesa-Verde.jpg"
    },
    {
        name: "Mount Rainier National Park",
        code: "mora",
        picture: "/assets/Mount-Rainier.jpg"
    },
    {
        name: "North Cascades National Park",
        code: "noca",
        picture: "/assets/North-Cascades.jpg"
    },
    {
        name: "Olympic National Park",
        code: "olym",
        picture: "/assets/Olympic.jpg"
    },
    {
        name: "Petrified Forest National Park",
        code: "pefo",
        picture: "/assets/Petrified.jpg"
    },
    {
        name: "Pinnacles National Park",
        code: "pinn",
        picture: "/assets/Pinnacles.jpg"
    },
    {
        name: "Redwood National and State Parks",
        code: "redw",
        picture: "/assets/Redwood.jpg"
    },
    {
        name: "Rocky Mountain National Park",
        code: "romo",
        picture: "/assets/Rocky-Mountain.jpg"
    },
    {
        name: "Saguaro National Park",
        code: "sagu",
        picture: "/assets/Saquaro.jpg"
    },
    {
        name: "Sequoia & Kings Canyon National Parks",
        code: "seki",
        picture: "/assets/Sequoia.jpg"
    },
    {
        name: "Shenandoah National Park",
        code: "shen",
        picture: "/assets/Shenandoah.jpg"
    },
    {
        name: "Theodore Roosevelt National Park",
        code: "thro",
        picture: "/assets/Theodore-Roosevelt.jpg"
    },
    {
        name: "Virgin Islands National Park",
        code: "viis",
        picture: "/assets/Virgin-Islands.jpg"

    },
    {
        name: "Voyageurs National Park",
        code: "voya",
        picture: "/assets/Voyageurs.jpg"
    },
    {
        name: "Wind Cave National Park",
        code: "wica",
        picture: "/assets/Wind-Cave.jpg"
    },
    {
        name: "Wrangell - St Elias National Park & Preserve",
        code: "wrst",
        picture: "/assets/Wrangell-St-Elias.jpg"
    },
    {
        name: "Yellowstone National Park",
        code: "yell",
        picture: "/assets/Yellowstone.jpg"
    },
    {
        name: "Yosemite National Park",
        code: "yose",
        picture: "/assets/Yosemite.jpg"
    },
    {
        name: "Zion National Park",
        code: "zion",
        picture: "/assets/zion.jpg"
    }    
]

self.searchPark = function (parkSelected) {
    UserService.searchPark(parkSelected);
}
  

}]);
