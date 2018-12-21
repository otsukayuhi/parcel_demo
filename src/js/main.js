/**
 * jQueryオブジェクトの拡張
 *
 * @date 2018-01-30
 */
(function($, jQueryEnhancers = (jQuery) => { return jQuery; }) {
  /**
   * userAgent判定フラグ
   *
   * @date 2016-06-02
   */
  const ua = navigator.userAgent.toLowerCase();
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
    isSafari: /safari/.test(ua)&&(!/chrome/.test(ua))&&(!/mobile/.test(ua)),
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
    isMobile: /i(phone|pod)/.test(ua)||/android(.+)?mobile/.test(ua),
    // タブレット型端末
    isTablet: /ipad/.test(ua)||/android/.test(ua)&&(!/mobile/.test(ua))
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
  $.fn.rollover = function(options) {
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
    return this.each(function() {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = (isCurrent && currentOver) ? current + ext : ext;
      var replace = (isCurrent && currentOver) ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;
      $(this).mouseout(function() {
        this.src = src;
      }).mouseover(function() {
        this.src = overSrc;
      });

      if (down) {
        var downSrc = src.replace(search, down + ext);
        new Image().src = downSrc;
        $(this).mousedown(function() {
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
  $.fn.fadeRollover = function(options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    return this.each(function() {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = (isCurrent && currentOver) ? current + ext : ext;
      var replace = (isCurrent && currentOver) ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;

      $(this).parent()
        .css('display','block')
        .css('width',$(this).attr('width'))
        .css('height',$(this).attr('height'))
        .css('background','url("'+overSrc+'") no-repeat');

      $(this).parent().hover(function() {
        $(this).find('img').stop().animate({opacity: 0}, 200);
      }, function() {
        $(this).find('img').stop().animate({opacity: 1}, 200);
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
  $.scroller = function() {
    const self = $.scroller.prototype;
    if (!arguments[0] || typeof arguments[0] === 'object') {
      self.init.apply(self, arguments);
    } else {
      self.scroll.apply(self, arguments);
    }
  };

  $.scroller.prototype = {
    // 初期設定
    defaults: {
      callback: function() {},
      cancelByMousewheel: false,
      duration: 500,
      easing: 'swing',
      hashMarkEnabled: false,
      marginTop: 0,
      noScrollSelector: '.noscroll',
      scopeSelector: 'body'
    },

    // 初期化
    init: function(options) {
      const self = this;
      const settings = this.settings = $.extend({}, this.defaults, options);
      $(settings.scopeSelector).find('a[href^="#"]').not(settings.noScrollSelector).each(function() {
        const hash = this.hash || '#';
        const eventName = 'click.scroller';

        if (hash !== '#' && !$(hash + ', a[name="' + hash.substr(1) + '"]').eq(0).length) {
          return;
        }

        $(this).off(eventName).on(eventName, function(e) {
          e.preventDefault();
          this.blur();
          self.scroll(hash, settings);
        });
      });
    },

    // スクロールを実行
    scroll: function(id, options) {
      const settings = (options) ? $.extend({}, this.defaults, options) : (this.settings) ? this.settings : this.defaults;
      if (!settings.hashMarkEnabled && id === '#') return;

      const dfd = $.Deferred();
      const win = window;
      const doc = document;
      const $doc = $(doc);
      const $page = $('html, body');
      let scrollEnd = (id === '#') ? 0 : $(id + ', a[name="' + id.substr(1) + '"]').eq(0).offset().top - settings.marginTop;
      const windowHeight = ($.ua.isAndroidMobile) ? Math.ceil(win.innerWidth / win.outerWidth * win.outerHeight) : win.innerHeight || doc.documentElement.clientHeight;
      let scrollableEnd = $doc.height() - windowHeight;
      if (scrollableEnd < 0) scrollableEnd = 0;
      if (scrollEnd > scrollableEnd) scrollEnd = scrollableEnd;
      if (scrollEnd < 0) scrollEnd = 0;
      scrollEnd = Math.floor(scrollEnd);

      $page.stop().animate({scrollTop: scrollEnd}, {
        duration: settings.duration,
        easing: settings.easing,
        complete: function() {
          dfd.resolve();
        }
      });

      dfd.done(function() {
        settings.callback();
        $doc.off('.scrollerMousewheel');
      });

      if (settings.cancelByMousewheel) {
        const mousewheelEvent = 'onwheel' in document ? 'wheel.scrollerMousewheel' : 'mousewheel.scrollerMousewheel';
        $doc.one(mousewheelEvent, function() {
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
  $.getQuery = function(str) {
    if (!str) str = location.search;
    str = str.replace(/^.*?\?/, '');
    let query = {};
    const temp = str.split(/&/);
    for (var i = 0, l = temp.length; i < l; i++) {
      let param = temp[i].split(/=/);
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
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  };

  // jQueryEnhancersの有効化
  // もし、なにも拡張したくなかったら、コメントアウト
  jQueryEnhancers($);

})(jQuery,
/**
* jQueryEnhancers
**/
  ($ = jQuery) => {
    const jQueryOffEventHelper = (options = {}, $instance = $) => {
      /*
        ■目的
        従来のoff()関数を改修して、特定のイベントを決して削除しないoff()関数に拡張する
        ■前提
        ・jQueryを利用する
        ・jQueryのイベント系APIを利用
      */
      const settings = Object.assign({}, {
        namespace: '.unt', // 削除禁止イベントの名前空間
        events: 'touchstart mouseenter touchend mouseleave', // 削除禁止イベント名リスト
        alias: '_off' // off()関数の退避先の関数名
      }, options);
      const { namespace, events, alias } = settings;
      // 名前空間付きの削除禁止イベント名リストを作成（配列）
      const _events = typeof events === 'string' ? events.split(' ') : _events;
      const NEVER_REMOVE_EVENTS = _events.map(e => `${e}${namespace}`);

      // jQuery.off()関数を別名でコピー。退避させる
      const isjQueryInstance = typeof $instance.fn === 'undefined';
      if(isjQueryInstance) {
        $instance.__proto__[alias] = $.fn.off;
      } else if(typeof $instance.fn[alias] === 'undefined'){
        $instance.fn[alias] = $.fn.off;
      }
      // jQuery.off()のデコレータ（ヘルパ）関数を作成
      // 参照 jQuery at src/event.js on github（ソースコード）
      // https://github.com/jquery/jquery/blob/master/src/event.js
      const off = function(types, selector, fn, useOriginalAPI = false) {
        // 第４引数がBoolean型でtrueを指定した場合は、オリジナルのoff()関数を実行
        if(typeof useOriginalAPI === 'boolean' && useOriginalAPI) {
          // alert('従来のoff()関数を実行し、イベントを削除します');
          this[alias](types, selector, fn);
          return this;
        }
        // 削除してはダメなリストとoff()の引数で送られてきたイベント名の照合
        // 照合して削除禁止イベント名に該当した場合、trueを返す関数
        const compareEventNameWithList = type => NEVER_REMOVE_EVENTS.filter(_eventName => _eventName === type).length > 0;
        let type;
        // 引数のtypesがjQueryイベントインスタンスだった場合の処理。ソースコードより一部改修
        // ※通常、あまり使われない引数のパターン
        if(types && types.preventDefault && types.handleObj) {
          const { namespace, origType, handler } = types.handleObj;
          type =	namespace ? `${origType}.${namespace}` : origType;
          // 禁止リストに含まれてなければ、イベント削除
          if(!compareEventNameWithList(type)){
            this[alias](type, selector, handler);
          }
          return this;
        }
        // 引数のtypesの型がString型だった場合の処理。ソースコードより大幅改修
        // 一番利用される引数の型。ここがメインとなる処理
        if(typeof types === 'string') {
          // 禁止リストに含まれていないイベントを抽出
          const _filteredEvents = (types => {
            // jQueryコアが独自に持つ、jQueryインスタンスごとのイベントリストを参照
            // $._data([jQueryインスタンスのDOM]).events
            const _events = $._data(this.get(0)).events;
            let origTypes = [];
            // イベントリストを平たくする（この後のフィルタ処理を実行しやすくする）
            for(let _key of Object.keys(_events)){
              origTypes.push(..._events[_key]);
            }
            // 平たくしたイベントリストから削除禁止イベント以外のイベントを抽出
            return origTypes.filter(_type => {
              const { origType, type, namespace } = _type;
              return (types.match(origType) != null || types.match(type) != null)
                && (types.match(/\./g) == null || (types.match(namespace) != null && namespace != ''))
                && !compareEventNameWithList(`${origType}.${namespace}`)
                && !compareEventNameWithList(`${type}.${namespace}`);
            });
          })(types);
          // 削除対象イベントを削除
          _filteredEvents.forEach(_event => {
            const { type, origType, namespace, selector, handler } = _event;
            this[alias](`${type}.${namespace}`, selector, handler);
            this[alias](`${origType}.${namespace}`, selector, handler);
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
    $.enableTouchOver = function(target) {
      // 準備
      const namespace = '.unt';
      const events = 'touchstart mouseenter touchend mouseleave';
      const NEVER_REMOVE_EVENTS = events.split(' ').map(event => `${event + namespace}`);
      const [ touchstart, mouseenter, touchend, mouseleave ] = NEVER_REMOVE_EVENTS;
      jQueryOffEventHelper({}, $); // off()関数ヘルパを適用（jQuery自体を拡張）
      // 準備ここまで

      if(target === undefined){
        target = 'a, button, .js-touchHover';
      }
      if(!$.ua.isTouchDevice) {
        $('html').addClass('no-touchevents');
      } else {
        $('html').addClass('touchevents');
      }
      $(target).each((index, _target) => {
        // jQueryOffEventHelper({}, $(_target)); // jQueryオブジェクト（インスタンス）ごとにoff()関数ヘルパを適用
        $(_target).on({
          [`${touchstart} ${mouseenter}`]() {
            $(this).addClass('is-touched');
          },
          [`${touchend} ${mouseleave}`]() {
            $(this).removeClass('is-touched');
          }
        });
      });
    };

  }
);


/**
 * __PROJECT_NAME__
 *
 * @date 2017-04-07
 */
const __NAMESPACE__ = function($) {
  // 初期化
  const _init = function() {
    console.log('main');

    $(function() {
      if(!$.ua.isTouchDevice) {
        $('.rollover').rollover();
      }
      if(!$.ua.isMobile) {
        $('a[href^="tel:"]').on('click', function(e) {
          e.preventDefault();
        });
      }
      $.scroller();

      // ここから$.enableTouchOver()の検証用コード
      // 278行目あたりのjQueryEnhancers()関数を有効化していないと、$.enableTouchOver()関数が使用できずにエラーになる（※デフォルト有効になっています）
      $.enableTouchOver(); // 引数に何も入れないと、a要素, button要素, .js-touchHoverセレクタが対象となる

    });
  };

  return {
    init: function() {
      window.console = window.console || {
        log: function() {}
      };
      _init();
    }
  };
}(jQuery);

__NAMESPACE__.init();
