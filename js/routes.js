brewbox.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('ui', {
                url: '/ui',
                abstract: true,
                controller:'MainUI',
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
        .state('ui.recipes', {
                url: '/recipes/',
                views: {
                        'centre-panel': {
                                templateUrl: 'pages/recipes.html',
                                controller: 'Recipes'
                        },
                        'left-panel': {
                                templateUrl: 'pages/menu.html'
                        }
                }
        })

        $urlRouterProvider.otherwise("/ui/brewday/");

})