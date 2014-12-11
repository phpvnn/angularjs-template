'use strict';

var app = angular.module('wfiMotor', ['ngAnimate', 'ngRoute', 'ngResource', 'ngSanitize', 'wfiMotor.services', 'wfiMotor.filters', 'wfiMotor.directives', 'wfiMotor.templates']);


app.config(['$routeProvider',function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/index/home.html'
  }).when('/directives', {
    templateUrl: 'views/index/directives.html',
  }).when('/e-shopping-cart', {
    templateUrl: 'views/index/filters.html',
  }).when('/e-shopping-cart', {
    templateUrl: 'views/index/e-shopping-cart.html',
  }).otherwise({
    redirectTo: '/'
  });
}]);

var directives = angular.module( 'wfiMotor.directives', [] );
var filters = angular.module( 'wfiMotor.filters', [] );
var services = angular.module( 'wfiMotor.services', [] );
var templates = angular.module( 'wfiMotor.templates', [] );

app.factory('getJson', function($resource) {

  var loaddata = {};

  loaddata.jsonObjs = [];

  loaddata.fromUrl = function(el, n) {
      //console.log('jsonFromUrl');
        if(n<0)
        {
          return 0;
        }
        var strUrl = el[n].getAttribute('data-ajax-magic-link');
        var strName = el[n].getAttribute('data-ajax-magic-name');
        if(strUrl && strName){
            $http.get(strUrl).then( function( result ){
                //console.log(result.data);
                loaddata.jsonObjs[strName] = result.data;
                return n + loaddata.jsonFromUrl(el, n-1);
            },
            function(error){
              loaddata.jsonObjs[strName] = null;
            });
        }
  };

  return loaddata;
});

app.factory('Data', function($resource) {
  return {
    "text": "view hello page 1"
  };
});

app.factory('getJson', function($resource) {

  var loaddata = {};

  loaddata.jsonObjs = [];

  loaddata.fromUrl = function(el, n) {
      //console.log('jsonFromUrl');
        if(n<0)
        {
          return 0;
        }
        var strUrl = el[n].getAttribute('data-ajax-magic-link');
        var strName = el[n].getAttribute('data-ajax-magic-name');
        if(strUrl && strName){
            $http.get(strUrl).then( function( result ){
                //console.log(result.data);
                loaddata.jsonObjs[strName] = result.data;
                return n + loaddata.jsonFromUrl(el, n-1);
            },
            function(error){
              loaddata.jsonObjs[strName] = null;
            });
        }
  };

  return loaddata;
});


(function() {
    "use strict";

    // dropdowns - select2 & synced select

    angular.module('wfiMotor.directives')
        .directive('wfiDropdown', ["$templateCache", "$timeout",

            function($templateCache, $timeout) {
                var controller = ["$scope", "$rootScope",
                    function($scope, $rootScope) {
                        $scope.isTouch = Modernizr.touch;

                        $timeout(function() {
                            $scope.isDisabled = $scope.$eval("page.isDisabled");

                        }, 0);
                        $scope.setData = function(setData) {
                            $scope.ngModel = setData;
                        };
                    }
                ];

                var link = function(scope, elem, attrs) {

                    // options depend on parent value
                    if (attrs.parent) {
                        // store child options, which are keyed on parent value
                        scope.childOptions = scope.options;
                        scope.options = [];

                        scope.$watch("parent", function(newval) {

                            if (newval) {
                                // locate by key
                                scope.options = _(scope.childOptions)
                                    .chain()
                                    .filter(function(x) {
                                        return x.flagName === newval.value;
                                    })
                                    .map(function(x) {
                                        return {
                                            value: x.key,
                                            text: x.text
                                        };
                                    })
                                    .value();

                                scope.ngModel = null;
                            }
                        });
                    }
                };

                var def = {
                    restrict: 'A',
                    require: "ngModel",
                    controller: controller,
                    scope: {
                        name: "@",
                        requiredMessage: "@",
                        errorMessage: "@",
                        errors: "=",
                        form: "=",
                        ngModel: "=",
                        label: "@",
                        info: "@",
                        placeholder: "@",
                        options: "=",
                        disabled: "@",
                        required: "@",
                        valid: "@",
                        page: "=",
                        parent: "="
                    },
                    template: function(element, attrs) {
                        var html = $templateCache.get("dropdown.html");

                        html = html.replace(/name="{{name}}/g, "name=\"" + attrs.name);

                        return html;
                    },
                    replace: true,
                    link: link
                };

                return def;
            }
        ]);
})();

app.controller( 'bodyCtrl', [ '$scope', 'Data' ,
  function( $scope, Data )
  {
    /*jshint devel:true */
    console.log('hello Angular js 1', Data);
    /*jshint devel:true */
  }]
);

app.controller( 'cartCtrl', [ '$scope',
  function( $scope )
  {
    $scope.items = [
      {title: 'Paint pots', quantity: 8, price: 3.95},
      {title: 'Polka dots', quantity: 17, price: 12.95},
      {title: 'Pebbles', quantity: 5, price: 6.95}
    ];
    $scope.remove = function(index) {
      $scope.items.splice(index, 1);
    };
  }]
);
