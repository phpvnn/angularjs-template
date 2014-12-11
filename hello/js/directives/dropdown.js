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
