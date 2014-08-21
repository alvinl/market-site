var MarketApp=angular.module("MarketApp",[]);MarketApp.filter("encodeURI",function(){return function(r){return encodeURIComponent(r)}}),MarketApp.filter("currencyName",function(){var r={2001:"USD",2003:"EUR",2005:"RUB",2002:"GBP",2007:"BRL",2008:"JPY"};return function(e){return r.hasOwnProperty(e)?r[e]:"Unkown Currency"}}),MarketApp.filter("commaSeperate",function(){return function(r){return r?r.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","):r}}),MarketApp.controller("SearchCtrl",["$scope","$http",function(r,e){r.search=function(){r.searchTerm&&(r.searched=!0,e.get("/api/search/item/"+encodeURIComponent(r.searchTerm),{cache:!0}).success(function(e){r.searchResults=e}).error(function(r){console.error(r)}))}}]),MarketApp.controller("IndexCtrl",["$scope","$http",function(r,e){e.get("/api/recent").success(function(e){r.transactions=e}).error(function(){r.showError=!0,r.errorMessage="Error loading recent transactions"})}]),MarketApp.controller("RecentUsersCtrl",["$scope","$http",function(r,e){e.get("/api/recent/users").success(function(e){r.users=e}).error(function(){r.showError=!0,r.errorMessage="Error loading recently tracked users"})}]),MarketApp.controller("RecentItemsCtrl",["$scope","$http",function(r,e){e.get("/api/recent/items").success(function(e){r.items=e}).error(function(){r.showError=!0,r.errorMessage="Error loading recently tracked items"})}]),MarketApp.controller("UserCtrl",["$scope","$http","$window",function(r,e,t){var o=r.steamID=t.location.pathname.replace("/u/","");r.userProfile={avatar:"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg"},e.get("/api/user/profile/"+o).success(function(e){e.avatar=e.avatar.replace("http://media.steampowered.com/steamcommunity/public/images/avatars/","https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/").replace(".jpg","_full.jpg"),r.userProfile=e}).error(function(){}),e.get("/api/transactions/"+o).success(function(e){r.transactions=e}).error(function(){})}]),MarketApp.controller("ItemCtrl",["$scope","$http","$window",function(r,e,t){var o=t.location.pathname.replace("/item/","");e.get("/api/item/recent/"+o).success(function(e){r.transactions=e}).error(function(){})}]),MarketApp.controller("AppCtrl",["$scope","$http","$window",function(r,e,t){var o=t.location.pathname.replace("/app/","");e.get("/api/app/recent/"+o).success(function(e){r.transactions=e}).error(function(){})}]),MarketApp.controller("CurrencyCtrl",["$scope","$http",function(r,e){e.get("/api/currency/recent/"+r.currencyID).success(function(e){r.transactions=e}).error(function(r){console.error(r)})}]),MarketApp.controller("TopUsersCtrl",["$scope","$http",function(r,e){e.get("/api/top/users").success(function(e){r.users=e}).error(function(){r.showError=!0,r.errorMessage="Error loading most profited users"})}]),MarketApp.controller("TopCurrenciesCtrl",["$scope","$http","$window",function(r,e){e.get("/api/top/currencies").success(function(e){r.currencies=e}).error(function(){r.showError=!0,r.errorMessage="Error loading most profited currencies"})}]),MarketApp.controller("TopAppsCtrl",["$scope","$http","$window",function(r,e){e.get("/api/top/apps").success(function(e){r.apps=e}).error(function(){r.showError=!0,r.errorMessage="Error loading most profited games"})}]),MarketApp.controller("TopItemsCtrl",["$scope","$http","$window",function(r,e){e.get("/api/top/items").success(function(e){r.items=e}).error(function(){r.showError=!0,r.errorMessage="Error loading most profited items"})}]),MarketApp.controller("StatsCtrl",["$scope","$http","$window",function(r,e){e.get("/api/stats").success(function(e){r.stats=e}).error(function(){})}]);