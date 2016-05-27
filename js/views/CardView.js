app.CardView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#card-template').html()),

  render: function(){

    
    $('#card_view').append(this.$el.html(this.template(this.model.toJSON())));
    app.cardgrid.init();
    
    return this; // enable chained calls
  },
  initialize: function(){

    var that = this;
    this.model.fetch().done(function(){
      if (that.model.get('dataCaptured') == false) {
        that.model.set('dataCaptured' , true);
        that.render();
      }
      
    });

    //this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM
  },      
  events: {
//    'dblclick label' : 'edit',
//    'keypress .edit' : 'updateOnEnter',
//    'blur .edit' : 'close',
 //   'click .toggle': 'toggleCompleted',
 //   'click .destroy': 'destroy'
  },
  destroy: function(){
    this.model.destroy();
  }
});