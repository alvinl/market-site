var MarketApp = angular.module('MarketApp', []);

MarketApp.filter('encodeURI', function () {

  return function (input) {
  
    return encodeURIComponent(input); 
  
  };

});

MarketApp.controller('IndexCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $scope.alert = { shown: false };

    function createAlert (alertType, message) {
    
      $scope.alert.shown   = true;
      $scope.alert.message = message;
      $scope.alert.type    = alertType;
    
    }

    $http.get('/api/recent')
      .success(function (response) {

        $scope.transactions = response;
      
      })
      .error(function (err) {

        createAlert('alert-danger error-transactions', 'There was an error loading recent transactions');
      
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

MarketApp.controller('TopUsersCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/users')
      .success(function (response) {

        $scope.users = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
      });
  
  }

  ]);

MarketApp.controller('TopCurrenciesCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/currencies')
      .success(function (response) {

        $scope.currencies = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
      });
  
  }

  ]);

MarketApp.controller('TopAppsCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/apps')
      .success(function (response) {

        $scope.apps = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
      });
  
  }

  ]);

MarketApp.controller('TopItemsCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    $http.get('/api/top/items')
      .success(function (response) {

        $scope.items = response;
      
      })
      .error(function (err) {
      
        /**
         * TODO
         * - Handle error
         */
      
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