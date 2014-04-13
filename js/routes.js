brewbox.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('ui', {
        url: '/ui',
        abstract: true,
        templateUrl: 'pages/mainUI.html'
    })
    .state('ui.splash', {
        url: '/splash',
        views: {
            'centre-panel': {
                templateUrl: 'pages/monitor.html'
            },
            'left-panel': {
                templateUrl: 'pages/menu.html'
            },'right-panel': {
                templateUrl: 'pages/steps.html'
            }
        }
    })

    $urlRouterProvider.otherwise("/ui/splash");

})