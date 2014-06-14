var MarketApp = angular.module('MarketApp', []);

MarketApp.filter('encodeURI', function () {

  return function (input) {
  
    return encodeURIComponent(input); 
  
  };

});

MarketApp.filter('toLocalString', function () {

  return function (input) {
  
    return (input) ? input.toLocaleString() : input;
  
  };

});

MarketApp.controller('SearchCtrl', ['$scope', '$http',

  function ($scope, $http) {

    console.log('Loaded search ctrl');
    
    $scope.search = function () {

      if (!$scope.searchTerm)
        return;

      console.log('Searching for:', $scope.searchTerm);

      $scope.searched = true;
      
      $http.get('/api/search/item/' + encodeURIComponent($scope.searchTerm))
        .success(function (results) {
          
          $scope.searchResults = results;

        })
        .error(function (err) {
          
          console.error(err);

        });

    };

  }]);

MarketApp.controller('IndexCtrl', ['$scope', '$http',

  function ($scope, $http) {

    $http.get('/api/recent')
      .success(function (response) {

        $scope.transactions = response;
      
      })
      .error(function () {

        $scope.showError = true;
        $scope.errorMessage = 'Error loading recent transactions';
      
      });
  
  }

  ]);

MarketApp.controller('UserCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    var steamID = $scope.steamID = $window.location.pathname.replace('/u/', '');

    $http.get('/api/user/profile/' + steamID)
      .success(function (response) {

        console.dir(response);

        response.avatar = response.avatar
                          .replace('http://media.steampowered.com/steamcommunity/public/images/avatars/',
                                    'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/')
                          .replace('.jpg', '_full.jpg');

        $scope.userProfile = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
      });

    $http.get('/api/transactions/' + steamID)
      .success(function (response) {

        $scope.transactions = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
      });
  
  }

  ]);

MarketApp.controller('ItemCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    var itemName = $window.location.pathname.replace('/item/', '');

    $http.get('/api/item/recent/' + itemName)
      .success(function (response) {
      
         console.dir(response);

         $scope.transactions = response;
      
      })
      .error(function (err) {
      
         
      
      });
  
  }

  ]);

MarketApp.controller('AppCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    var itemName = $window.location.pathname.replace('/app/', '');

    $http.get('/api/app/recent/' + itemName)
      .success(function (response) {
      
         console.dir(response);

         $scope.transactions = response;
      
      })
      .error(function (err) {
      
         
      
      });
  
  }

  ]);

MarketApp.controller('CurrencyCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    // var itemName = $window.location.pathname.replace('/app/', '');

    // $http.get('/api/app/recent/' + itemName)
    //   .success(function (response) {
      
    //      console.dir(response);

    //      $scope.transactions = response;
      
    //   })
    //   .error(function (err) {
      
         
      
    //   });
  
  }

  ]);

MarketApp.controller('TopUsersCtrl', ['$scope', '$http',

  function ($scope, $http) {

    $http.get('/api/top/users')
      .success(function (response) {

        $scope.users = response;
      
      })
      .error(function () {
      
        $scope.showError = true;
        $scope.errorMessage = 'Error loading most profited users';
      
      });
  
  }

  ]);

MarketApp.controller('TopCurrenciesCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/currencies')
      .success(function (response) {

        $scope.currencies = response;
      
      })
      .error(function () {
      
        $scope.showError = true;
        $scope.errorMessage = 'Error loading most profited currencies';
      
      });
  
  }

  ]);

MarketApp.controller('TopAppsCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/apps')
      .success(function (response) {

        $scope.apps = response;
      
      })
      .error(function () {
      
        $scope.showError = true;
        $scope.errorMessage = 'Error loading most profited games';
      
      });
  
  }

  ]);

MarketApp.controller('TopItemsCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/items')
      .success(function (response) {

        $scope.items = response;
      
      })
      .error(function () {
      
        $scope.showError = true;
        $scope.errorMessage = 'Error loading most profited items';
      
      });
  
  }

  ]);

MarketApp.controller('StatsCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/stats')
      .success(function (response) {

        console.dir(response);

        $scope.stats = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
      });
  
  }

  ]);