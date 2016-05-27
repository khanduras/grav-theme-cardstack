app.Router = Backbone.Router.extend({
  routes: {
    'search/:terms' : 'search',
    'page/*slug' : 'page',
    'category/:slug' : 'category',
    'keyword/:slug' : 'keyword',
    'author/:author' : 'author',
    '*slug' : 'index'
  },
  index: function(slug) { 
    if (null != slug) {
      app.Category = slug;
      app.cardList.trigger('filter_category');
      $('.nav_menu_child_menu').removeClass('hidden');
      this.setActiveEntry('/#' + slug);
    } else {
      app.cardList.trigger('reset',{ init: true });
      this.setActiveEntry(null);
      $('.nav_menu_child_menu').addClass('hidden');
    }
    $('[data-search-input]').val("");
    app.cardgrid.init();

  },
  page: function(slug) {
    $('[data-search-input]').val("");
    app.Page = slug;
    app.cardList.trigger('select_page');
    $('.nav_menu_child_menu').removeClass('hidden');
  },
  category: function(category) {
    $('[data-search-input]').val("");
    app.Category = category;
    app.cardList.trigger('filter_category');
    app.cardgrid.init();
    $('.nav_menu_child_menu').removeClass('hidden');
    this.setActiveEntry('/#' + category);
  },
  keyword: function(keyword) {
    $('[data-search-input]').val("");
    app.Keyword = keyword;
    app.cardList.trigger('filter_keyword');
    app.cardgrid.init();
    this.setActiveEntry(null);
    $('.nav_menu_child_menu').removeClass('hidden');
  },
  search: function(keyword) {
    app.SearchTerm = keyword;
    app.cardList.trigger('search_keyword');
    $('[data-search-input]').val(keyword);
    this.setActiveEntry(null);
    $('.nav_menu_child_menu').removeClass('hidden');
  },
  author: function(author) {
    app.Author = author;
    app.cardList.trigger('author');
    $('[data-search-input]').val("");
    this.setActiveEntry(null);
    $('.nav_menu_child_menu').removeClass('hidden');
  },
  current : function() {
      var Router = this,
          fragment = Backbone.history.fragment,
          routes = _.pairs(Router.routes),
          route = null, params = null, matched;

      matched = _.find(routes, function(handler) {
          route = _.isRegExp(handler[0]) ? handler[0] : Router._routeToRegExp(handler[0]);
          return route.test(fragment);
      });

      if(matched) {
          // NEW: Extracts the params using the internal
          // function _extractParameters 
          params = Router._extractParameters(route, fragment);
          route = matched[1];
      }

      return {
          route : route,
          fragment : fragment,
          params : params
      };
  },
  /*
   * Change the active element in the topbar
   */
  setActiveEntry: function(url) {
    // Unmark all entries
    $('li.nav_menu_child_menu').removeClass('uk-active');
    $('li.nav_menu_front_page').removeClass('uk-active');

    // Mark active entry
    $("li.nav_menu_child_menu a[href='" + app.base_url + url + "']").parents('li').addClass('uk-active');
    $("li.nav_menu_front_page a[href='" + app.base_url + url + "']").parents('li').addClass('uk-active');
  },
}); 