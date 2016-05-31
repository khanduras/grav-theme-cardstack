app.Card = Backbone.Model.extend({
	defaults: {
		dataCaptured: false,
		dataToBeRendered: true
	},
    initialize: function(attributes) {
    	var that = this;
        this.jurl = attributes.jurl;
    //    console.log(app.base_url + this.jurl +'.json')
        this.fetch().done( function() {
          app.cardList.sortByField('lastmodified_ticks','descending');
        	that.set('dataCaptured', true);
        });
    },
	url: function() {
		return this.jurl +'.json';
	}
});
