Fancy.$ = window.$ || window.jQuery;

if(Fancy.$ === undefined){
  Fancy.nojQuery = true;
}
else{
  Fancy.nojQuery = false;
}

/*
 * @param {String|Number} id
 * @return {Fancy.Element}
 */
Fancy.get = function(id){
  var type = Fancy.typeOf(id);

  switch(type){
    case 'string':
      return new Fancy.Element(Fancy.$('#'+id)[0]);
      break;
    case 'array':
      return new Fancy.Elements(id);
      break;
    default:
      return new Fancy.Element(id);
      break;
  }
};

/*
 * @class Fancy.Element
 */
Fancy.Element = function(dom){
  var me = this;

  me.dom = dom;
  me.$dom = Fancy.$(dom);
  me.length = 1;
};

Fancy.Element.prototype = {
  /*
   * @param {String} selector
   * @return {Fancy.Element}
   */
  closest: function(selector){
    return Fancy.get(this.$dom.closest(selector)[0]);
  },
  /*
   *
   */
  destroy: function(){
    this.$dom.remove();
  },
  /*
   *
   */
  remove: function(){
    this.$dom.remove();
  },
  //Not Used
  /*
   *
   */
  prev: function(){
    return this.$dom.prev();
  },
  /*
   * @return {Fancy.Element}
   */
  firstChild: function(){
    return Fancy.get(this.$dom.children()[0]);
  },
  /*
   * @param {String} eventName
   * @param {Function} fn
   * @param {Object} scope
   * @param {String} delegate
   */
  on: function(eventName, fn, scope, delegate) {
    var me = this;

    if(scope){
      fn = Fancy.$.proxy(fn, scope);
    }

    if(delegate){
      me.$dom.on(eventName, delegate, fn);
    }
    else{
      me.$dom.on(eventName, fn);
    }

    //bad bug fixies
    switch(eventName){
      case 'mouseenter':
        if(me.onTouchEnterEvent){
          me.onTouchEnterEvent(eventName, fn, scope, delegate);
        }
        break;
      case 'mouseleave':
        if(me.onTouchLeaveEvent){
          me.onTouchLeaveEvent(eventName, fn, scope, delegate);
        }
        break;
      case 'mousemove':
        if(me.onTouchMove){
          me.onTouchMove('touchmove', fn);
        }
        break;
    }
  },
  /*
   * @param {String} eventName
   * @param {Function} fn
   * @param {Object} scope
   * @param {String} delegate
   */
  once: function(eventName, fn, scope, delegate) {
    var me = this;

    if (scope) {
      fn = Fancy.$.proxy(fn, scope);
    }

    if(delegate){
      me.$dom.one(eventName, delegate, fn);
    }
    else{
      me.$dom.one(eventName, fn);
    }
  },
  /*
   * @param {String} name
   * @return {String}
   */
  prop: function(name){
    return this.$dom.prop(name);
  },
  /*
   * @param {String} eventName
   * @param {Function} fn
   * @param {Object} scope
   * @param {String} delegate
   */
  un: function(eventName, fn, scope, delegate) {
    var me = this;

    if (scope) {
      fn = Fancy.$.proxy(fn, scope);
    }

    if(delegate){
      me.$dom.off(eventName, delegate, fn);
    }
    else{
      me.$dom.off(eventName, fn);
    }
  },
  /*
   *
   */
  show: function(){
    this.$dom.show();
  },
  /*
   *
   */
  hide: function(){
    this.$dom.hide();
  },
  /*
   * @param {String} oldCls
   * @param {String} newCls
   */
  replaceClass: function(oldCls, newCls){
    var me = this;

    me.$dom.removeClass(oldCls);
    me.$dom.addClass(newCls);
  },
  /*
   * @param {String} tag
   * @return {Fancy.Element}
   */
  getByTag: function(tag){
    var me = this;
    return Fancy.get(me.$dom.find(tag)[0]);
  },
  getByClass: function(cls){
    var me = this;
    return me.$dom.find('.'+cls)[0];
  },
  /*
   * @param {String} cls
   */
  addClass: function(cls){
    var me = this;

    me.$dom.addClass(cls);
  },
  /*
   * @param {String} cls
   */
  removeClass: function(cls){
    var me = this;

    me.$dom.removeClass(cls);
  },
  /*
   * @param {String} cls
   * @return {Boolean}
   */
  hasClass: function(cls){
    var me = this;

    return me.$dom.hasClass(cls);
  },
  /*
   * @param {String} cls
   */
  toggleClass: function(cls){
    var me = this;

    me.$dom.toggleClass(cls);
  },
  /*
   * @param {String} selector
   * @return {Array}
   */
  select: function(selector){
    var me = this,
      founded = me.$dom.find(selector);

    if(founded.length === 1){
      return Fancy.get(founded[0]);
    }
    else if(founded.length > 1){
      return Fancy.get(founded);
    }
    else if(founded.length === 0){
      return {
        length: 0,
        dom: undefined,
        addClass: function(){},
        removeClass: function(){},
        destroy: function(){},
        css: function(){}
      };
    }

    return founded;
  },
  /*
   * @param {*} o1
   * @param {String|Number} o2
   * @return {String|Number}
   */
  css: function(o1, o2){
    if( o2 === undefined ){
      return this.$dom.css(o1);
    }
    return this.$dom.css(o1, o2);
  },
  /*
   * @param {*} attr
   * @param {String|Number} o2
   * @return {String|Number}
   */
  attr: function(o1, o2){
    if( o2 === undefined ){
      return this.$dom.attr(o1);
    }
    return this.$dom.attr(o1, o2);
  },
  /*
   * @param {String} html
   * @return {Fancy.Element}
   */
  append: function(html){
    return Fancy.get(this.$dom.append(html)[0]);
  },
  /*
   * @param {String} html
   * @return {Fancy.Element}
   */
  before: function(html){
    return this.$dom.before(html)[0];
  },
  /*
   * @param {String|Number} value
   * @return {Number}
   */
  height: function(value){
    if(value){
      this.$dom.height(value);
      return this;
    }

    return this.$dom.height();
  },
  /*
   * @param {String|Number} value
   * @return {Number}
   */
  width: function(value){
    if(value){
      this.$dom.width(value);
      return this;
    }

    return this.$dom.width();
  },
  /*
   * @param {String} selector
   * @return {Fancy.Element}
   */
  parent: function(selector){
    return Fancy.get(this.$dom.parent(selector)[0]);
  },
  /*
   * @param {String} html
   */
  update: function(html){
    this.dom.innerHTML = html;
  },
  /*
   * @param {Function} overFn
   * @param {Function} outFn
   */
  hover: function(overFn, outFn){
    if(overFn){
      this.$dom.on('mouseenter', overFn);
    }

    if(overFn){
      this.$dom.on('mouseleave', outFn);
    }
  },
  /*
   * @return {Object}
   */
  position: function(){
    return this.$dom.position();
  },
  /*
   * @return {Object}
   */
  offset: function(){
    return this.$dom.offset();
  },
  /*
   *
   */
  focus: function(){
    this.$dom.focus();
  },
  /*
   *
   */
  blur: function(){
    this.$dom.blur();
  },
  /*
   * @param {HTMLElement} child
   * @return {Boolean}
   */
  within: function(child){
    var me = this,
      childId,
      isWithin = true,
      removeId = false;

    child = Fancy.get(child);
    childId = child.attr('id');

    if(childId === undefined || childId === ''){
      childId = Fancy.id();
      removeId = true;
    }

    child.attr('id', childId);

    if( me.select('#' + childId).length === 0 ){
      isWithin = false;
    }

    if(me.dom.id === child.dom.id){
      isWithin = true;
    }

    if(removeId){
      me.removeAttr(childId);
    }

    return isWithin;
  },
  /*
   * @param {String} attr
   */
  removeAttr: function(attr){
    this.$dom.removeAttr(attr);
  },
  /*
   * @return {Fancy.Element}
   */
  item: function(){
    return this;
  },
  /*
   * @param {String} style
   * @param {Number} speed
   * @param {String} easing
   * @param {Function} callback
   */
  animate: function(style,speed,easing,callback){
    this.$dom.animate(style,speed,easing,callback);
  },
  /*
   * @return {Number}
   */
  index: function(){
    return this.$dom.index();
  },
  onTouchEnterEvent: function(eventName, fn, scope, delegate){
    var me = this,
      docEl = Fancy.get(document.body);

    var wrappedFn = function(e, target){
      var tempId = Fancy.id(),
        tempAttr = 'fancy-tempt-attr';

      me.attr(tempAttr, tempId);

      var touchXY = e.originalEvent.targetTouches[0],
        xy = [touchXY.pageX, touchXY.pageY],
        targetEl = Fancy.get( document.elementFromPoint(xy[0] - document.body.scrollLeft, xy[1] - document.body.scrollTop) ),
        isWithin = false,
        maxDepth = 10,
        parentEl = targetEl;

      while(maxDepth > 0){
        if( !parentEl.dom ){
          break;
        }

        if( parentEl.attr(tempAttr) === tempId ){
          isWithin = true;
          break;
        }
        parentEl = parentEl.parent();
        maxDepth--;
      }

      if( isWithin && !me.touchIn && !delegate){
        e.pageX = touchXY.pageX;
        e.pageY = touchXY.pageY;
        fn(e, target);
        me.touchIn = true;
      }

      if(isWithin && delegate){
        maxDepth = 10;
        parentEl = targetEl;
        var found = false,
          before = targetEl,
          arr = [],
          i = 0;

        while(maxDepth > 0){
          if(!parentEl.dom){
            break;
          }

          var delegates = parentEl.select(delegate);
          if(delegates.length !== 0){
            found = true;
            //var delegateTarget = arr[i - delegate.match(/\./g).length];
            var delegateTarget = me.getDelegateTarget(delegate, delegates, arr, i);

            if(delegateTarget){
              e.currentTarget = delegateTarget;
              e.delegateTarget = delegateTarget;
              e.pageX = touchXY.pageX;
              e.pageY = touchXY.pageY;
              me.touchIn = true;
              me.touchInDelegate = me.touchInDelegate || {};
              if(me.touchInDelegate[delegate] === undefined){
                me.touchInDelegate[delegate] = delegateTarget;
              }
              else if(me.touchInDelegate[delegate] !== delegateTarget){
                me.touchInDelegate[delegate] = [me.touchInDelegate[delegate], delegateTarget];
              }


              fn.apply(scope, [e, delegateTarget]);
            }
            break;
          }

          if(parentEl.attr(tempAttr) === tempId){
            break;
          }

          arr.push(parentEl.dom);
          before = parentEl;
          parentEl = parentEl.parent();
          maxDepth--;
          i++;
        }
      }

      me.removeAttr(tempAttr);
    };

    docEl.on('touchmove', wrappedFn);
  },
  onTouchLeaveEvent: function(eventName, fn, scope, delegate){
    var me = this,
      docEl = Fancy.get(document.body),
      arr = [];

    var wrappedFn = function(e, target){
      var tempId = Fancy.id(),
        tempAttr = 'fancy-tempt-attr';

      me.attr(tempAttr, tempId);

      if(me.touchIn !== true){
        me.removeAttr(tempAttr);
        return;
      }

      var touchXY = e.originalEvent.targetTouches[0],
        xy = [touchXY.pageX, touchXY.pageY],
        targetEl = Fancy.get( document.elementFromPoint(xy[0] - document.body.scrollLeft, xy[1] - document.body.scrollTop) );

      if(!delegate){
        var isWithin = false,
          maxDepth = 10,
          parentEl = targetEl;

        while(maxDepth > 0){
          if( !parentEl.dom ){
            break;
          }

          if( parentEl.attr(tempAttr) === tempId ){
            isWithin = true;
            break;
          }
          parentEl = parentEl.parent();
          maxDepth--;
        }

        if(isWithin === false){
          e.pageX = touchXY.pageX;
          e.pageY = touchXY.pageY;

          me.touchIn = false;
          fn(e, target);
          me.removeAttr(tempAttr);
          return;
        }
      }

      if(arr.length > 30){
        arr = arr.slice(arr.length - 5, arr.length - 1);
      }

      arr.push(targetEl.dom);

      if(delegate && me.touchInDelegate[delegate]){
        var delegateTarget,
          delegateTempId = Fancy.id();

        if(Fancy.isArray(me.touchInDelegate[delegate])){
          delegateTarget = Fancy.get(me.touchInDelegate[delegate][0]);
        }
        else{
          delegateTarget = Fancy.get(me.touchInDelegate[delegate]);
        }

        delegateTarget.attr(tempAttr, delegateTempId);

        maxDepth = 10;
        var found = false;
        parentEl = targetEl;

        while(maxDepth > 0){
          if( !parentEl.dom ){
            break;
          }

          if( parentEl.attr(tempAttr) === delegateTempId ){
            found = true;
            break;
          }

          parentEl = parentEl.parent();
          maxDepth--;
        }

        delegateTarget.removeAttr(tempAttr);

        if(!found){
          delete me.touchInDelegate[delegate];
          me.touchIn = false;

          e.currentTarget = delegateTarget.dom;
          e.delegateTarget = delegateTarget.dom;
          e.pageX = touchXY.pageX;
          e.pageY = touchXY.pageY;

          fn(e, delegateTarget.dom);
        }
      }

      me.removeAttr(tempAttr);
    };

    docEl.on('touchmove', wrappedFn);
  },
  getDelegateTarget: function(delegate, delegates, arr, _i){
    var fastGetDelegate = arr[_i - delegate.match(/\./g).length],
      i = 0,
      iL = delegates.length;

    for(;i<iL;i++){
      if(delegates.item(i).dom === fastGetDelegate){
        return fastGetDelegate;
      }
    }

    return false;
  },
  onTouchMove: function(eventName, fn, scope){
    var me = this,
      docEl = Fancy.get(document.body);

    var wrappedFn = function(e, target){
      var tempId = Fancy.id(),
        tempAttr = 'fancy-tempt-attr';

      me.attr(tempAttr, tempId);

      var touchXY = e.originalEvent.targetTouches[0],
        xy = [touchXY.pageX, touchXY.pageY],
        isWithin = false,
        maxDepth = 10,
        targetEl = Fancy.get( document.elementFromPoint(xy[0] - document.body.scrollLeft, xy[1] - document.body.scrollTop) ),
        parentEl = targetEl;

      while(maxDepth > 0){
        if( !parentEl.dom ){
          break;
        }

        if( parentEl.attr(tempAttr) === tempId ){
          isWithin = true;
          break;
        }
        parentEl = parentEl.parent();
        maxDepth--;
      }

      me.removeAttr(tempAttr);

      if(!isWithin){
        return;
      }

      e.pageX = touchXY.pageX;
      e.pageY = touchXY.pageY;

      fn(e, target);
    };

    docEl.on('touchmove', wrappedFn);
  }
};

/*
 * @class Fancy.Elements
 * @constructor
 * @param {HTMLElement|HTMLElements} dom
 */
Fancy.Elements = function(dom){
  var me = this;

  me.dom = dom;
  me.$dom = dom;
  me.length = dom.length;
};

Fancy.Elements.prototype = {
  /*
   * @param {String} cls
   */
  addClass: function(cls){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).addClass(cls);
    }
  },
  /*
   * @param {String} cls
   */
  removeClass: function(cls){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).removeClass(cls);
    }
  },
  /*
   * @param {Function} fn
   */
  hover: function(fn){
    this.$dom.on('mouseenter', fn);
  },
  /*
   *
   */
  on: Fancy.Element.prototype.on,
  /*
   *
   */
  once: Fancy.Element.prototype.once,
  /*
   * @param {Number} index
   * @return {Fancy.Element}
   */
  item: function(index){
    return Fancy.get(this.$dom[index]);
  },
  /*
   * @param {*} o1
   * @param {String|Number} o2
   * @return {String|Number}
   */
  css: function(o1, o2){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).css(o1, o2);
    }
  },
  /*
   * @param {String} cls
   */
  toggleClass: function(cls){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).toggleClass(cls);
    }
  },
  /*
   *
   */
  destroy: function(){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).destroy();
    }
  },
  /*
   *
   */
  hide: function(){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).hide();
    }
  },
  /*
   *
   */
  show: function(){
    var me = this,
      i = 0,
      iL = me.length;

    for(;i<iL;i++){
      Fancy.get(me.$dom[i]).show();
    }
  },
  /*
   * @return {Number}
   */
  index: function(){
    return this.$dom[0].index();
  }
};

/*
 * @param {String} selector
 */
Fancy.select = function(selector){
  return Fancy.get(document.body).select(selector);
};

/*
  Fancy.onReady
*/

/*
 * @param {Function} fn
 */
Fancy.onReady = function(fn){
  $(document).ready(fn);
};

/**
 * @example:
 * Fancy.Ajax({
 *   url: 'users.json',
 *   success: function(){
 *     console.log(arguments);
 *   }
 * });
 */

/*
 * @param {Object} o
 */
Fancy.Ajax = function(o){
  var _o = {};

  if( o.url ){
    _o.url = o.url;
  }

  if( o.success ){
    _o.success = o.success;
  }

  if( o.error ){
    _o.error = o.error;
  }

  if( o.method ){
    //_o.type = o.type;
    _o.type = o.method;
  }

  if( o.params ){
    _o.data = o.params;
  }

  if(o.sendJSON){
    _o.dataType = 'json';
    _o.contentType = "application/json; charset=utf-8";
    _o.data = JSON.stringify(_o.data);
  }

  if(o.getJSON){
    _o.dataType = 'json';
    _o.contentType = "application/json; charset=utf-8";
  }

  if(o.headers){
    _o.headers = o.headers;
  }

  Fancy.$.ajax(_o);
};