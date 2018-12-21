// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/main.js":[function(require,module,exports) {
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * jQueryオブジェクトの拡張
 *
 * @date 2018-01-30
 */
(function ($) {
  var jQueryEnhancers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (jQuery) {
    return jQuery;
  };

  /**
   * userAgent判定フラグ
   *
   * @date 2016-06-02
   */
  var ua = navigator.userAgent.toLowerCase();
  $.ua = {
    // Windows
    isWindows: /windows/.test(ua),
    // Mac
    isMac: /macintosh/.test(ua),
    // IE
    isIE: /msie (\d+)|trident/.test(ua),
    // IE9未満
    isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,
    // IE10未満
    isLtIE10: /msie (\d+)/.test(ua) && RegExp.$1 < 10,
    // Firefox
    isFirefox: /firefox/.test(ua),
    // WebKit
    isWebKit: /applewebkit/.test(ua),
    // Chrome
    isChrome: /chrome/.test(ua),
    // Safari
    isSafari: /safari/.test(ua) && !/chrome/.test(ua) && !/mobile/.test(ua),
    // iOS
    isIOS: /i(phone|pod|pad)/.test(ua),
    // iOS Chrome
    isIOSChrome: /crios/.test(ua),
    // iPhone、iPod touch
    isIPhone: /i(phone|pod)/.test(ua),
    // iPad
    isIPad: /ipad/.test(ua),
    // Android
    isAndroid: /android/.test(ua),
    // モバイル版Android
    isAndroidMobile: /android(.+)?mobile/.test(ua),
    // タッチデバイス
    isTouchDevice: 'ontouchstart' in window,
    // スマートフォン
    isMobile: /i(phone|pod)/.test(ua) || /android(.+)?mobile/.test(ua),
    // タブレット型端末
    isTablet: /ipad/.test(ua) || /android/.test(ua) && !/mobile/.test(ua)
  };
  /**
   * ロールオーバー
   *
   * @date 2012-10-01
   *
   * @example $('.rollover').rollover();
   * @example $('.rollover').rollover({ over: '-ov' });
   * @example $('.rollover').rollover({ current: '_cr', currentOver: '_cr_ov' });
   * @example $('.rollover').rollover({ down: '_click' });
   */

  $.fn.rollover = function (options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null,
      down: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    var down = settings.down;
    return this.each(function () {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = isCurrent && currentOver ? current + ext : ext;
      var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;
      $(this).mouseout(function () {
        this.src = src;
      }).mouseover(function () {
        this.src = overSrc;
      });

      if (down) {
        var downSrc = src.replace(search, down + ext);
        new Image().src = downSrc;
        $(this).mousedown(function () {
          this.src = downSrc;
        });
      }
    });
  };
  /**
   * フェードロールオーバー
   *
   * @date 2012-11-21
   *
   * @example $('.faderollover').fadeRollover();
   * @example $('.faderollover').fadeRollover({ over: '-ov' });
   * @example $('.faderollover').fadeRollover({ current: '_cr', currentOver: '_cr_ov' });
   */


  $.fn.fadeRollover = function (options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    return this.each(function () {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = isCurrent && currentOver ? current + ext : ext;
      var replace = isCurrent && currentOver ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;
      $(this).parent().css('display', 'block').css('width', $(this).attr('width')).css('height', $(this).attr('height')).css('background', 'url("' + overSrc + '") no-repeat');
      $(this).parent().hover(function () {
        $(this).find('img').stop().animate({
          opacity: 0
        }, 200);
      }, function () {
        $(this).find('img').stop().animate({
          opacity: 1
        }, 200);
      });
    });
  };
  /**
   * スムーズスクロール
   *
   * @date 2018-01-30
   *
   * @example $.scroller();
   * @example $.scroller({ cancelByMousewheel: true });
   * @example $.scroller({ scopeSelector: '#container', noScrollSelector: '.no-scroll' });
   * @example $.scroller('#content');
   * @example $.scroller('#content', { marginTop: 200, callback: function() { console.log('callback')} });
   */


  $.scroller = function () {
    var self = $.scroller.prototype;

    if (!arguments[0] || _typeof(arguments[0]) === 'object') {
      self.init.apply(self, arguments);
    } else {
      self.scroll.apply(self, arguments);
    }
  };

  $.scroller.prototype = {
    // 初期設定
    defaults: {
      callback: function callback() {},
      cancelByMousewheel: false,
      duration: 500,
      easing: 'swing',
      hashMarkEnabled: false,
      marginTop: 0,
      noScrollSelector: '.noscroll',
      scopeSelector: 'body'
    },
    // 初期化
    init: function init(options) {
      var self = this;
      var settings = this.settings = $.extend({}, this.defaults, options);
      $(settings.scopeSelector).find('a[href^="#"]').not(settings.noScrollSelector).each(function () {
        var hash = this.hash || '#';
        var eventName = 'click.scroller';

        if (hash !== '#' && !$(hash + ', a[name="' + hash.substr(1) + '"]').eq(0).length) {
          return;
        }

        $(this).off(eventName).on(eventName, function (e) {
          e.preventDefault();
          this.blur();
          self.scroll(hash, settings);
        });
      });
    },
    // スクロールを実行
    scroll: function scroll(id, options) {
      var settings = options ? $.extend({}, this.defaults, options) : this.settings ? this.settings : this.defaults;
      if (!settings.hashMarkEnabled && id === '#') return;
      var dfd = $.Deferred();
      var win = window;
      var doc = document;
      var $doc = $(doc);
      var $page = $('html, body');
      var scrollEnd = id === '#' ? 0 : $(id + ', a[name="' + id.substr(1) + '"]').eq(0).offset().top - settings.marginTop;
      var windowHeight = $.ua.isAndroidMobile ? Math.ceil(win.innerWidth / win.outerWidth * win.outerHeight) : win.innerHeight || doc.documentElement.clientHeight;
      var scrollableEnd = $doc.height() - windowHeight;
      if (scrollableEnd < 0) scrollableEnd = 0;
      if (scrollEnd > scrollableEnd) scrollEnd = scrollableEnd;
      if (scrollEnd < 0) scrollEnd = 0;
      scrollEnd = Math.floor(scrollEnd);
      $page.stop().animate({
        scrollTop: scrollEnd
      }, {
        duration: settings.duration,
        easing: settings.easing,
        complete: function complete() {
          dfd.resolve();
        }
      });
      dfd.done(function () {
        settings.callback();
        $doc.off('.scrollerMousewheel');
      });

      if (settings.cancelByMousewheel) {
        var mousewheelEvent = 'onwheel' in document ? 'wheel.scrollerMousewheel' : 'mousewheel.scrollerMousewheel';
        $doc.one(mousewheelEvent, function () {
          dfd.reject();
          $page.stop();
        });
      }
    }
  };
  /**
   * 文字列からオブジェクトに変換したクエリを取得
   *
   * @example $.getQuery();
   * @example $.getQuery('a=foo&b=bar&c=foobar');
   */

  $.getQuery = function (str) {
    if (!str) str = location.search;
    str = str.replace(/^.*?\?/, '');
    var query = {};
    var temp = str.split(/&/);

    for (var i = 0, l = temp.length; i < l; i++) {
      var param = temp[i].split(/=/);
      query[param[0]] = decodeURIComponent(param[1]);
    }

    return query;
  };
  /**
   * 画像をプリロード
   *
   * @date 2012-09-12
   *
   * @example $.preLoadImages('/img/01.jpg');
   */


  var cache = [];

  $.preLoadImages = function () {
    var args_len = arguments.length;

    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }; // jQueryEnhancersの有効化
  // もし、なにも拡張したくなかったら、コメントアウト


  jQueryEnhancers($);
})(jQuery,
/**
* jQueryEnhancers
**/
function () {
  var $ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : jQuery;

  var jQueryOffEventHelper = function jQueryOffEventHelper() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var $instance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : $;

    /*
      ■目的
      従来のoff()関数を改修して、特定のイベントを決して削除しないoff()関数に拡張する
      ■前提
      ・jQueryを利用する
      ・jQueryのイベント系APIを利用
    */
    var settings = Object.assign({}, {
      namespace: '.unt',
      // 削除禁止イベントの名前空間
      events: 'touchstart mouseenter touchend mouseleave',
      // 削除禁止イベント名リスト
      alias: '_off' // off()関数の退避先の関数名

    }, options);
    var namespace = settings.namespace,
        events = settings.events,
        alias = settings.alias; // 名前空間付きの削除禁止イベント名リストを作成（配列）

    var _events = typeof events === 'string' ? events.split(' ') : _events;

    var NEVER_REMOVE_EVENTS = _events.map(function (e) {
      return "".concat(e).concat(namespace);
    }); // jQuery.off()関数を別名でコピー。退避させる


    var isjQueryInstance = typeof $instance.fn === 'undefined';

    if (isjQueryInstance) {
      $instance.__proto__[alias] = $.fn.off;
    } else if (typeof $instance.fn[alias] === 'undefined') {
      $instance.fn[alias] = $.fn.off;
    } // jQuery.off()のデコレータ（ヘルパ）関数を作成
    // 参照 jQuery at src/event.js on github（ソースコード）
    // https://github.com/jquery/jquery/blob/master/src/event.js


    var off = function off(types, selector, fn) {
      var _this = this;

      var useOriginalAPI = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      // 第４引数がBoolean型でtrueを指定した場合は、オリジナルのoff()関数を実行
      if (typeof useOriginalAPI === 'boolean' && useOriginalAPI) {
        // alert('従来のoff()関数を実行し、イベントを削除します');
        this[alias](types, selector, fn);
        return this;
      } // 削除してはダメなリストとoff()の引数で送られてきたイベント名の照合
      // 照合して削除禁止イベント名に該当した場合、trueを返す関数


      var compareEventNameWithList = function compareEventNameWithList(type) {
        return NEVER_REMOVE_EVENTS.filter(function (_eventName) {
          return _eventName === type;
        }).length > 0;
      };

      var type; // 引数のtypesがjQueryイベントインスタンスだった場合の処理。ソースコードより一部改修
      // ※通常、あまり使われない引数のパターン

      if (types && types.preventDefault && types.handleObj) {
        var _types$handleObj = types.handleObj,
            _namespace = _types$handleObj.namespace,
            origType = _types$handleObj.origType,
            handler = _types$handleObj.handler;
        type = _namespace ? "".concat(origType, ".").concat(_namespace) : origType; // 禁止リストに含まれてなければ、イベント削除

        if (!compareEventNameWithList(type)) {
          this[alias](type, selector, handler);
        }

        return this;
      } // 引数のtypesの型がString型だった場合の処理。ソースコードより大幅改修
      // 一番利用される引数の型。ここがメインとなる処理


      if (typeof types === 'string') {
        // 禁止リストに含まれていないイベントを抽出
        var _filteredEvents = function (types) {
          // jQueryコアが独自に持つ、jQueryインスタンスごとのイベントリストを参照
          // $._data([jQueryインスタンスのDOM]).events
          var _events = $._data(_this.get(0)).events;

          var origTypes = []; // イベントリストを平たくする（この後のフィルタ処理を実行しやすくする）

          var _arr = Object.keys(_events);

          for (var _i = 0; _i < _arr.length; _i++) {
            var _key = _arr[_i];
            origTypes.push.apply(origTypes, _toConsumableArray(_events[_key]));
          } // 平たくしたイベントリストから削除禁止イベント以外のイベントを抽出


          return origTypes.filter(function (_type) {
            var origType = _type.origType,
                type = _type.type,
                namespace = _type.namespace;
            return (types.match(origType) != null || types.match(type) != null) && (types.match(/\./g) == null || types.match(namespace) != null && namespace != '') && !compareEventNameWithList("".concat(origType, ".").concat(namespace)) && !compareEventNameWithList("".concat(type, ".").concat(namespace));
          });
        }(types); // 削除対象イベントを削除


        _filteredEvents.forEach(function (_event) {
          var type = _event.type,
              origType = _event.origType,
              namespace = _event.namespace,
              selector = _event.selector,
              handler = _event.handler;

          _this[alias]("".concat(type, ".").concat(namespace), selector, handler);

          _this[alias]("".concat(origType, ".").concat(namespace), selector, handler);
        });

        return this;
      }
    }; // jQuery.off()関数ヘルパー 終了


    $instance[isjQueryInstance ? '__proto__' : 'fn'].off = off; // jQueryインスタンスのoffプロパティにヘルパ関数をアサイン

    return $instance;
  };
  /**
   * タッチデバイスにタッチイベント追加
   *
   * @date 2018-10-03
   *
   * @example $.enableTouchOver();
   * @example $.enableTouchOver('.touchhover');
   */


  $.enableTouchOver = function (target) {
    // 準備
    var namespace = '.unt';
    var events = 'touchstart mouseenter touchend mouseleave';
    var NEVER_REMOVE_EVENTS = events.split(' ').map(function (event) {
      return "".concat(event + namespace);
    });

    var _NEVER_REMOVE_EVENTS = _slicedToArray(NEVER_REMOVE_EVENTS, 4),
        touchstart = _NEVER_REMOVE_EVENTS[0],
        mouseenter = _NEVER_REMOVE_EVENTS[1],
        touchend = _NEVER_REMOVE_EVENTS[2],
        mouseleave = _NEVER_REMOVE_EVENTS[3];

    jQueryOffEventHelper({}, $); // off()関数ヘルパを適用（jQuery自体を拡張）
    // 準備ここまで

    if (target === undefined) {
      target = 'a, button, .js-touchHover';
    }

    if (!$.ua.isTouchDevice) {
      $('html').addClass('no-touchevents');
    } else {
      $('html').addClass('touchevents');
    }

    $(target).each(function (index, _target) {
      var _$$on;

      // jQueryOffEventHelper({}, $(_target)); // jQueryオブジェクト（インスタンス）ごとにoff()関数ヘルパを適用
      $(_target).on((_$$on = {}, _defineProperty(_$$on, "".concat(touchstart, " ").concat(mouseenter), function _() {
        $(this).addClass('is-touched');
      }), _defineProperty(_$$on, "".concat(touchend, " ").concat(mouseleave), function _() {
        $(this).removeClass('is-touched');
      }), _$$on));
    });
  };
});
/**
 * __PROJECT_NAME__
 *
 * @date 2017-04-07
 */


var __NAMESPACE__ = function ($) {
  // 初期化
  var _init = function _init() {
    console.log('main');
    $(function () {
      if (!$.ua.isTouchDevice) {
        $('.rollover').rollover();
      }

      if (!$.ua.isMobile) {
        $('a[href^="tel:"]').on('click', function (e) {
          e.preventDefault();
        });
      }

      $.scroller(); // ここから$.enableTouchOver()の検証用コード
      // 278行目あたりのjQueryEnhancers()関数を有効化していないと、$.enableTouchOver()関数が使用できずにエラーになる（※デフォルト有効になっています）

      $.enableTouchOver(); // 引数に何も入れないと、a要素, button要素, .js-touchHoverセレクタが対象となる
    });
  };

  return {
    init: function init() {
      window.console = window.console || {
        log: function log() {}
      };

      _init();
    }
  };
}(jQuery);

__NAMESPACE__.init();
},{}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59954" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.map