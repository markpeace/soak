angular.element(document).ready(function() {
  angular.bootstrap(document, ["soak"]);
});

var brewbox = angular.module('soak', ['ionic'])

angular.module('Controllers', ['Models']);
angular.module('Models', ['wrapParse']); // At this point Parse is already integrated with Angular's lifecycle.
