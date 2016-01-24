app.CardView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#card-template').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  },
  initialize: function(){
    this.model.on('change', this.render, this);
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