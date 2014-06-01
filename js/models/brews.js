angular.module('Models')

.factory('Brewdays', function(wrapParse, Company) {
        var Brewday = wrapParse('Product', {
                date: Date
                
                price: Number,
                weight: Number,
                name: String,
                in_stock: Boolean,
                company: Company,
                date: Date,
                available: {type: Boolean, default: true}
        });

        Product.prototype.beforeSave = function() {
                // some awesome logic
        };

        return Product;
})