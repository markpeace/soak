angular.module('Models')

.factory('Recipes', function(wrapParse, Company) {
        var Recipe = wrapParse('Recipe', {
                name: string,
                style: string,
                reference:string

        });

        Recipe.prototype.beforeSave = function() {
                // some awesome logic
        };

        return Product;
})