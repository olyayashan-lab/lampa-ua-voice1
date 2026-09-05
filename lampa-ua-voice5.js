(function() {
  'use strict';

  if (window.ua_voice_source_plugin) return;
  window.ua_voice_source_plugin = true;

  function component(object) {
    var html = $(
      '<div class="ua-voice-source">' +
        '<div style="padding:2em">' +
          '<div style="font-size:2em;margin-bottom:.5em">🇺🇦 UA Voice</div>' +
          '<div style="font-size:1.2em;line-height:1.5">' +
            'Джерело UA Voice підключено правильно.<br>' +
            'Наступним кроком тут буде список українських озвучок.' +
          '</div>' +
        '</div>' +
      '</div>'
    );

    this.create = function() {
      return this.render();
    };

    this.start = function() {
      try {
        Lampa.Controller.enable('content');
      } catch (e) {}
    };

    this.render = function() {
      return html;
    };

    this.pause = function() {};
    this.stop = function() {};

    this.destroy = function() {
      try { html.remove(); } catch (e) {}
    };
  }

  function startPlugin() {
    Lampa.Component.add('ua_voice', component);

    var manifst = {
      type: 'video',
      version: '0.5',
      name: 'UA Voice 🇺🇦',
      description: 'Українські озвучки',
      component: 'ua_voice',

      onContextMenu: function(object) {
        return {
          name: 'UA Voice 🇺🇦',
          description: 'Українські озвучки'
        };
      },

      onContextLauch: function(object) {
        Lampa.Component.add('ua_voice', component);

        Lampa.Activity.push({
          url: '',
          title: 'UA Voice 🇺🇦',
          component: 'ua_voice',
          movie: object,
          page: 1
        });
      }
    };

    Lampa.Manifest.plugins = manifst;

    var button =
      '<div class="full-start__button selector view--online ua-voice--button" data-subtitle="UA Voice v0.5">' +
        '<svg viewBox="0 0 24 24" fill="currentColor">' +
          '<path d="M3 10v4h4l5 5V5L7 10H3zm13.5 2A4.5 4.5 0 0 0 14 7.97v8.06A4.5 4.5 0 0 0 16.5 12z"/>' +
        '</svg>' +
        '<span>🇺🇦 UA Voice</span>' +
      '</div>';

    function launch(movie) {
      Lampa.Component.add('ua_voice', component);

      Lampa.Activity.push({
        url: '',
        title: 'UA Voice 🇺🇦',
        component: 'ua_voice',
        movie: movie,
        page: 1
      });
    }

    function addButton(e) {
      if (!e || !e.render || !e.render.length) return;
      if (e.render.parent().find('.ua-voice--button').length) return;

      var btn = $(button);

      btn.on('hover:enter', function() {
        launch(e.movie);
      });

      e.render.after(btn);
    }

    Lampa.Listener.follow('full', function(e) {
      if (e.type == 'complite') {
        addButton({
          render: e.object.activity.render().find('.view--torrent'),
          movie: e.data.movie
        });
      }
    });

    try {
      if (Lampa.Activity.active().component == 'full') {
        addButton({
          render: Lampa.Activity.active().activity.render().find('.view--torrent'),
          movie: Lampa.Activity.active().card
        });
      }
    } catch (e) {}

    console.log('[UA Voice] SOURCE TEST v0.5 loaded');
  }

  startPlugin();

})();
