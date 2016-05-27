app.Card = Backbone.Model.extend({
	defaults: {
		dataCaptured: false,
		dataToBeRendered: false
	},
    initialize: function(attributes) {
    	var that = this;
        this.jurl = attributes.jurl;
    //    console.log(app.base_url + this.jurl +'.json')
        this.fetch().done( function() {
        	that.dataCaptured = true;
        });
    },
	url: function() {
		return this.jurl +'.json';
	}
});
