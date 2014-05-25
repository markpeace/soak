angular.element(document).ready(function() {
  angular.bootstrap(document, ["brewbox"]);
});

var brewbox = angular.module('brewbox', ['ionic'])

angular.forEach(['d'], function(name) {
        var ngName = 'ng' + name[0].toUpperCase() + name.slice(1);
        brewbox.directive(ngName, function() {
                return function(scope, element, attrs) {
                        attrs.$observe(ngName, function(value) {
                                attrs.$set(name, value); 
                        })
                };
        });
});

brewbox.run(function(HardwareInterface) {});
