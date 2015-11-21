Products = new Mongo.Collection("products");

Products.bySku = function(sku){
    return Products.findOne({sku : sku});
};

Products.featured = function(){
    var featuredSkus = ["honeymoon-mars","johnny-liftoff","one-way-reentry"];
    return Products.find({sku : {$in : featuredSkus}},
        {fields : {inventory : false, cost : false}});
};



Products.findOne = function(args){
    return _.find(Products, function(product){
        return product.sku === args.sku;
    });
}

