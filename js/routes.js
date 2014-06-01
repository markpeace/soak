brewbox.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

        .state('ui', {
                url: '/ui',
                abstract: true,
                controller:'MainUI',
                templateUrl: 'pages/mainUI.html'
        })
        .state('ui.splash', {
                url: '/brewday',
                views: {
                        'centre-panel': {
                                templateUrl: 'pages/brewday/splash.html',
                                controller: 'Splash'
                        },
                        'left-panel': {
                                templateUrl: 'pages/menu.html'
                        },'right-panel': {
                                templateUrl: 'pages/brewday/steps.html',
                                controller: 'Steps'
                        }
                }
        })
        .state('ui.brewday', {
                url: '/brewday/:id',
                views: {
                        'centre-panel': {
                                templateUrl: 'pages/brewday/monitor.html',
                                controller: 'Monitor'
                        },
                        'left-panel': {
                                templateUrl: 'pages/menu.html'
                        },'right-panel': {
                                templateUrl: 'pages/brewday/steps.html',
                                controller: 'Steps'
                        }
                }
        })        
        .state('ui.recipes', {
                url: '/recipes/:recipe_id',
                views: {
                        'centre-panel': {
                                templateUrl: 'pages/recipes/list.html',
                                controller: 'ListRecipes'
                        },
                        'left-panel': {
                                templateUrl: 'pages/menu.html'
                        },'right-panel': {
                                templateUrl: 'pages/recipes/profile.html',
                                controller: 'RecipeProfile'
                        }
                }
        })

        $urlRouterProvider.otherwise("/ui/brewday");

})