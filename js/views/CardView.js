app.CardView = Backbone.View.extend({
  template: _.template($('#card-template').html()),

  render: function(){

    $('.loading').html('<p>&nbsp;</p>');    
    $('#card_view').append(this.$el.html(this.template(this.model.toJSON())));
    app.cardgrid.init();
    
    return this; // enable chained calls
  },
  initialize: function(){

    var that = this;
   
    if (this.model.get('dataCaptured') == false) {
      this.model.fetch().done(function(){
        app.cardList.sortByField('lastmodified_ticks','descending');
        that.model.set('dataCaptured' , true);
        that.doRender();
      });
    } else {
      this.doRender();
    }
  },
  doRender: function() {
    if (this.model.get('dataToBeRendered') == true) {
      this.model.set('dataToBeRendered' , false);
      this.render();
    }
  }, 
  events: {
//    'dblclick label' : 'edit',
//    'keypress .edit' : 'updateOnEnter',
//    'blur .edit' : 'close',
 //   'click .toggle': 'toggleCompleted',
 //   'click .destroy': 'destroy'
  }
});