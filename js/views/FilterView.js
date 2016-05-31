app.FilterView = Backbone.View.extend({
  el: '.navbar-controls',
  controlsTemplate: _.template($('#controls-template').html()),
  filterTemplate: _.template($('#filter-navbar-template').html()),

  render: function(eventName) {
    this.$el.append(this.controlsTemplate());
    //app.renderTemplate( '/cards/' + app.Page, this.el, this.model.toJSON());
    $('.close-search-button').fadeToggle();
    return this;
  },
/*  render: function(){
    this.$el.html(this.template());
    return this; // enable chained calls
  },*/
  initialize: function(){
   // $('#dropSource').addClass('hidden');
    $('.search-form').fadeToggle();

  //  this.model.on('change', this.render, this);
  //  this.model.on('destroy', this.remove, this); // remove: Convenience Backbone's function for removing the view from the DOM
  },      
  events: {
//    'dblclick label' : 'edit',
//    'keypress .edit' : 'updateOnEnter',
//    'blur .edit' : 'close',
    'click .sort-button': 'sortControls',
    'click .search-button': 'search',
    'click .close-search-button': 'search',
    'click .dash-button' : 'dashboard',
    'click #published-desc' : 'publishedDesc',
    'click #modified-desc' : 'modifiedDesc',
  },
  destroy: function(){
    this.model.destroy();
  },
  sortControls: function() {
    if ($('.filter-navbar').html().length == 0 ) {
      $('.filter-navbar').html(this.filterTemplate());
      $('#items').fadeIn();
    } else {
      $('#items').fadeOut("normal", $('.filter-navbar').html(''));
    }
    app.cardgrid.init();
  },
  search: function(){
    $('.navbar-controls.uk-hidden-large').addClass('hidden');
    $('.left-navbar-zone').fadeToggle();
    $('.search-form').fadeToggle();
    setTimeout(function () {
      $('.navbar-controls.uk-hidden-large').removeClass('hidden');
    }, 425);
  },
  dashboard: function(){
    var win = window.open(app.admin_dash_url, '_blank');
    win.focus();
  },
  publishedDesc: function(ev){
    alert($(ev.currentTarget).text());
    $('#published-desc').parents('li').addClass('uk-active');
  },
  modifiedDesc: function(ev){
    $(ev.currentTarget).parents('li').addClass('uk-active');
  }

});