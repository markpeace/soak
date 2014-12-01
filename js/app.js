angular.element(document).ready(function() {
        angular.bootstrap(document, ["soak"]);
});

var soak = angular.module('soak', ['ui.router'])

angular.forEach(['x', 'y', 'width', 'height', 'fill'], function(name) {
        var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);
        soak.directive(ngName, function() {
                return function(scope, element, attrs) {
                        attrs.$observe(ngName, function(value) {
                                attrs.$set(name, value); 
                        })
                };
        });
});