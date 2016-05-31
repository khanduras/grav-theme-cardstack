app.AppView = Backbone.View.extend({
  el: '#card_app',
  initialize: function () {
    app.cardList.on('add', this.addOne, this);
    app.cardList.on('reset', this.reset, this);
    app.cardList.on('filter_keyword', this.filterKeyword, this);
    app.cardList.on('filter_category', this.filterCategory, this);
    app.cardList.on('select_page', this.selectPage, this);
    app.cardList.on('search_keyword', this.searchTerm, this);
    app.cardList.on('author', this.author, this);
  },
  events: {
   // 'keypress #new-todo': 'createTodoOnEnter'
  },
  addOne: function(card){
    var view = new app.CardView({model: card});
    view.model.set('dataToBeRendered', true);
    view.initialize();
    
  },
  addAll: function(){
    this.$('#card_view').html('');
    app.cardList.sortByField('lastmodified_ticks','descending');
    app.cardList.each(this.addOne, this);
  },
  reset: function(){
    var that = this;
    this.$('#card_view').html(''); 
    this.$('#card_page').html('');
    app.cardList.sortByField('lastmodified_ticks','descending');
    app.cardList.each(function(model) {
        that.addOne(model);
    });
    app.eventAggregator.trigger('domchange:title', app.site_title);
  },
  filterKeyword: function(){
    this.$('#card_view').html('');
    this.$('#card_page').html('');
    app.cardList.sortByField('lastmodified_ticks','descending');
    var KeywordsFiltered = app.cardList.filter(function(model) {
        return _.any(model.attributes, function(val, attr) {
            if (attr == 'tags_clean') {
              return ~val.indexOf(app.Keyword.replace(/_/g, ' '));
            }
        }); 
    });
    _.each(KeywordsFiltered, this.addOne);
    app.eventAggregator.trigger('domchange:title', app.Keyword.replace(/_/g, ' ') + ' - ' + app.site_title);
    app.cardgrid.init();
  },
  filterCategory: function(){
    this.$('#card_view').html(''); 
    this.$('#card_page').html('');
    app.cardList.sortByField('lastmodified_ticks','descending');
    var CategoriesFiltered = app.cardList.filter(function(model) {
        return _.any(model.attributes, function(val, attr) {
            if (attr == 'category_clean') {
                if (val.toUpperCase().replace(app.Category.toUpperCase(), "").length == 0 ) {
                    return true;
                }
            }
        });
    });
    _.each(CategoriesFiltered, this.addOne);
    app.eventAggregator.trigger('domchange:title', app.Category.replace(/_/g, ' ') + ' - ' + app.site_title);
    app.cardgrid.init();
  },
  selectPage: function(){
    this.$('#card_view').html(''); 
    this.$('#card_page').html('');
    var RouteToModel = app.cardList.find(function(model) { return model.get('url') == app.Page; });
    var view = new app.PageView({model: RouteToModel});
    $('#card_page').html(view.render().el);
    app.router.setActiveEntry( '/#' + RouteToModel.get('category_clean') );
    app.cardgrid.init();
    view = '';
    $('.loading').html('<p>&nbsp;</p>');
    app.eventAggregator.trigger('domchange:title', RouteToModel.get('title') + ' - ' + app.site_title);
    app.cardgrid.init();
  },
  searchTerm: function(){
    this.$('#card_view').html(''); 
    this.$('#card_page').html('');
    app.cardList.sortByField('lastmodified_ticks','descending');
    var TermsSearched = app.cardList.filter(function(model) {
        return _.any(model.attributes, function(val, attr) {
          if ( 'slug title subtitle summary category category_clean category_slug tags tags_clean'.indexOf(attr) > -1 ) {
              return ~val.toUpperCase().indexOf(app.SearchTerm.toUpperCase());
          }
        });
    });
    _.each(TermsSearched, this.addOne);
    app.eventAggregator.trigger('domchange:title', app.SearchTerm + ' - ' + app.site_title);
    app.cardgrid.init();

  },
  author: function(){
    this.$('#card_view').html(''); 
    this.$('#card_page').html('');
    var view = new app.AuthorView({});
    $('#card_page').html(view.render().el);
    var PrettyAuthor;
    app.cardList.sortByField('lastmodified_ticks','descending');
    var AuthorCards = app.cardList.filter(function(model) {
        return _.any(model.attributes, function(val, attr) {
          var Author = app.Author.toUpperCase().replace(/_/g,' ');
          if ( 'author_name'.indexOf(attr) > -1 ) {
              if ( ~val.toUpperCase().indexOf( Author ) ) {
                  if (val.toUpperCase().replace(Author, "").length == 0 ) {
                      PrettyAuthor = val;
                      return true;
                  }
              }
          } 

          return false;
              
        });
    });
    _.each(AuthorCards, this.addOne);
    app.eventAggregator.trigger('domchange:title', PrettyAuthor + ' - ' + app.site_title);
    app.cardgrid.init();
  }
});