/*
 * @class Fancy.grid.plugin.Search
 */
Fancy.define('Fancy.grid.plugin.Search', {
  extend: Fancy.Plugin,
  ptype: 'grid.search',
  inWidgetName: 'searching',
  autoEnterDelay: 500,
  /*
   * @constructor
   * @param {Object} config
   */
  constructor: function(config){
    var me = this;

    me.searches = {};
    me.Super('const', arguments);
  },
  /*
   *
   */
  init: function(){
    var me = this;

    me.Super('init', arguments);

    //me.generateKeys();
    me.ons();
  },
  /*
   *
   */
  ons: function(){
    var me = this,
      w = me.widget,
      s = w.store;
    
    w.once('init', function(){
      //me.render();
      me.generateKeys();
    });
  },
  /*
   * @param {*} keys
   * @param {*} values
   */
  search: function(keys, values){
    var me = this;

    me.searches = {};

    if(!keys && !values ){
      me.clear();
      me.updateStoreSearches();
      return;
    }

    if(Fancy.isArray(keys) === false && !values){
      me.searches = keys;
    }

    me.setFilters();
    me.updateStoreSearches();
  },
  /*
   *
   */
  updateStoreSearches: function(){
    var me = this,
      w = me.widget,
      s = w.store;

    s.changeDataView();
    w.update();
  },
  /*
   * @param {*} keys
   */
  setKeys: function(keys){
    var me = this;

    me.keys = keys;
    me.setFilters();
    me.updateStoreSearches();
  },
  /*
   * @return {Object}
   */
  generateKeys: function(){
    var me = this,
      w = me.widget,
      s = w.store;

    if(!me.keys){
      me.keys = {};

      var columns = [];

      if(w.columns){
        columns = columns.concat(w.columns);
      }

      if(w.leftColumns){
        columns = columns.concat(w.leftColumns);
      }

      if(w.rightColumns){
        columns = columns.concat(w.rightColumns);
      }

      var fields = [],
        i = 0,
        iL = columns.length;

      for(;i<iL;i++){
        var column = columns[i],
          index = column.index || column.key;

        if(column.searchable === false){
          continue;
        }

        switch(column.type){
          case 'color':
          case 'combo':
          case 'date':
          case 'number':
          case 'string':
          case 'text':
          case 'currency':
            break;
          default:
            continue;
        }

        if(index){
          fields.push(index);
        }
      }

      i = 0;
      iL = fields.length;

      for(;i<iL;i++){
        if(fields[i] === '$selected'){
          continue;
        }

        me.keys[fields[i]] = true;
      }
    }

    return me.keys;
  },
  /*
   *
   */
  setFilters: function(){
    var me = this,
      w = me.widget,
      s = w.store,
      filters = s.filters || {};

    if(me.searches === undefined || Fancy.isObject(me.searches)){
      me.clear();
      return;
    }

    for(var p in me.keys){
      if(me.keys[p] === false){
        if(filters[p]){
          delete filters[p]['*'];
        }
        continue;
      }

      filters[p] = filters[p] || {};

      filters[p]['*'] = me.searches;
    }

    me.filters = filters;
    s.filters = filters;
  },
  /*
   *
   */
  clear: function(){
    var me = this,
      w = me.widget,
      s = w.store,
      filters = s.filters || {};

    for(var p in me.keys){
      if(filters[p] === undefined){
        continue;
      }

      delete filters[p]['*'];
    }

    me.filters = filters;
    s.filters = filters;
    delete me.searches;
  }
});