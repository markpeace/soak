brewbox.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('ui', {
        url: '/ui',
        abstract: true,
        templateUrl: 'pages/mainUI.html'
    })
    .state('ui.brewday', {
        url: '/brewday/',
        views: {
            'centre-panel': {
                templateUrl: 'pages/monitor.html',
                controller: 'Monitor'
            },
            'left-panel': {
                templateUrl: 'pages/menu.html'
            },'right-panel': {
                templateUrl: 'pages/steps.html',
                    controller: 'Steps'
            }
        }
    })

    $urlRouterProvider.otherwise("/ui/brewday/");

})