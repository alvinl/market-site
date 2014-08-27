var MarketApp = angular.module('MarketApp', []);

MarketApp.filter('encodeURI', function () {

  return function (input) {

    return encodeURIComponent(input);

  };

});

MarketApp.filter('currencyName', function () {

  var currencyNames = {

    2001: 'USD',
    2003: 'EUR',
    2005: 'RUB',
    2002: 'GBP',
    2007: 'BRL',
    2008: 'JPY'

  };

  return function (input) {

    return (currencyNames.hasOwnProperty(input)) ?
            currencyNames[input] :
            'Unkown Currency';

  };

});

MarketApp.filter('commaSeperate', function () {

  return function (input) {

    // Source:
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    return (input) ? input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : input;

  };

});

MarketApp.controller('SearchCtrl', ['$scope', '$http',

  function ($scope, $http) {

    $scope.search = function () {

      if (!$scope.searchTerm)
        return;

      $scope.searched = true;

      $http.get('/api/search/item/' + encodeURIComponent($scope.searchTerm), {cache: true})
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

MarketApp.controller('RecentUsersCtrl', ['$scope', '$http',

  function ($scope, $http) {

    $http.get('/api/recent/users')
      .success(function (response) {

        $scope.users = response;

      })
      .error(function () {

        $scope.showError = true;
        $scope.errorMessage = 'Error loading recently tracked users';

      });

  }

  ]);

MarketApp.controller('RecentItemsCtrl', ['$scope', '$http',

  function ($scope, $http) {

    $http.get('/api/recent/items')
      .success(function (response) {

        $scope.items = response;

      })
      .error(function () {

        $scope.showError = true;
        $scope.errorMessage = 'Error loading recently tracked items';

      });

  }

  ]);

MarketApp.controller('UserCtrl', ['$scope', '$http', '$window',

  function ($scope, $http, $window) {

    var steamID = $scope.steamID = $window.location.pathname.replace('/u/', '');

    $scope.userProfile = {

      avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg'

    };

    $http.get('/api/user/profile/' + steamID)
      .success(function (response) {

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

         $scope.transactions = response;

      })
      .error(function (err) {



      });

  }

  ]);

MarketApp.controller('CurrencyCtrl', ['$scope', '$http',

  function ($scope, $http) {

    $http.get('/api/currency/recent/' + $scope.currencyID)
      .success(function (response) {

         $scope.transactions = response;

      })
      .error(function (err) {

         console.error(err);

      });

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

    $scope.stats = {};

    if (!!window.EventSource) {

      var stream = new EventSource('/api/stats/stream');

      stream.addEventListener('update', function (payload) {

        var statToUpdate = payload.data;

        $scope.$apply(function () {

          $scope.stats[statToUpdate] = $scope.stats.hasOwnProperty(statToUpdate) ?
                                       $scope.stats[statToUpdate] + 1 :
                                       1;

        });

      });

    }

    $http.get('/api/stats')
      .success(function (response) {

        // Apply initial stats
        for (var initialStat in response)
          $scope.stats[initialStat] = $scope.stats.hasOwnProperty(initialStat) ?
                                      $scope.stats[initialStat] + response[initialStat] :
                                      response[initialStat];

      })
      .error(function (err) {

        /**
         * TODO
         * - Handle error
         */

      });

  }

  ]);
