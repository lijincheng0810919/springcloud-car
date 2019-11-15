// Default Theme JS that will be loaded on all pages.
// Note that this is the format JS should be wrapped in.
//
// See: https://www.drupal.org/node/2269515

(function ($, Drupal) {

	Drupal.behaviors.headerMenu = {

		attach: function (context,settings){

			$(document).ready(function(){

				$('.has-menu-sub > a').each(function() {
				    $(this).on('click', function(event) {
				        $('.menu-sub').not($(this).closest('li')).hide();
				        $(this).next('ul').toggle();
				        event.stopPropagation();
				        event.preventDefault();
				    });
				});

			});
			    
			$('html').click(function(){
				$('.menu-sub').hide();
			});			    

		}
		
	};

	Drupal.behaviors.mobileMenu = {

		attach: function (context,settings){

			$('#mobileMenu .has-menu-sub-mobile > a', context).click(function(event){

			    $(this).toggleClass('menu-sub-mobile-open');
			    $(this).next('.menu-sub-mobile').toggle();
			    event.preventDefault();
			});

		}
		
	};

	Drupal.behaviors.stockChartIOSOrientationChangeFix = {

		attach: function (context,settings){

			$(document).ready(function(){

				var supportsOrientationChange="onorientationchange"in window,orientationEvent=supportsOrientationChange?"orientationchange":"resize";

				window.addEventListener(orientationEvent,function(){
					$('.nir-stock-chart').attr('src',$('.nir-stock-chart').attr('src'))},false)
			})
		}
		
	};


})(jQuery, Drupal);
;
/**
 * @file
 * Styling for the Stock Chart
 *
 */

(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.stockChartStyling = {
    attach: function (context, settings) {
      $(document).ready(function () {
        redraw();
      })
      $(window).resize(function () {
        if(this.resizeTO) clearTimeout(this.resizeTO);
          this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
          }, 500);
      });
      //redraw graph when window resize is completed
      $(window).on('resizeEnd orientationchange', function () {
        redraw();
      });
      function redraw() {
        $('.nir-stock-chart').each(function () {
          var winWidth = $(window).width();
          var frameHeight = $(this).height();
          var frameWidth = $(this).width();
          var frameRatio = frameHeight / frameWidth;
          if (winWidth < frameWidth) {
            $(this).width(winWidth);
            $(this).height(winWidth * frameRatio);
          } else {
            $(this).width($(this).attr('width'));
            $(this).height($(this).attr('height'));
          }
        })
      }
    }
  }

})(jQuery, Drupal);
;
(function ($, Drupal, DrupalSettings) {
  'use strict';
  Drupal.behaviors.nirMarketDataBlock = {
    attach: function (context, settings) {
      var ajax_flag = 'TRUE';
      if (!$(document.body).hasClass('nmdbsq')) {
        $('.block-market-data-block__stock-quote', context).once('stockQuoteBlock').each(
          function (i, obj) {
            // An ID could not exist and we'd have to set one manually.
            var id = $(this).attr('id');
            if (!id && $(this).data('uuid')) {
              id = 'nir-ipe-block_' + $(this).data('uuid')
              $(this).attr('id', id);
            }
            if (id) {
              var panel_id = $(this).attr('data-storage-id');
              if (panel_id) {
                ajax_flag = 'TRUE';
                var editTab = null;
                if (Drupal.panels_ipe && Drupal.panels_ipe.app) {
                  editTab = Drupal.panels_ipe.app.get('editTab');
                  if (editTab.get('active') && !editTab.get('loading')) {
                    ajax_flag = 'FALSE';
                  }
                }
              }
              else {
                panel_id = 'NULL';
              }
              var url = 'ajax/market-data-api/stock-quote/' + id + '/' + panel_id + '/' + ajax_flag;
              var stockLoaderAjax = Drupal.ajax({
                url: Drupal.url(url),
                type: 'GET'
              });
          
              if (!editTab || (!editTab.get('active') && !editTab.get('loading'))) {
                stockLoaderAjax.execute();
              }
            }
          }
        );
        $(document.body).addClass('nmdbsq');
      }
    }
  };
})(jQuery, Drupal, drupalSettings);
;
(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.stockQuote = {
    attach: function (context, settings) {
      $('.quote-wrap').each(function () {
        if ($('.user-toggle-on').length) {
          $(document).on('change', '.quote-wrap select', function () {
            var val = $(this).val();
            var wrap = $(this).parent();
            $('.stock-quote', wrap).css('display', 'none');
            $('.stock-quote[data-exchange="' + val + '"]', wrap).css('display', 'block');
          });
        }
      });
    }
  };
})(jQuery, Drupal);

;
(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.nirWebsiteNotices = {
    attach: function (context, settings) {

      $('.notification-modal').each(function (index) {
        var cookieLength = $(this).data('cookie-length');
        if (cookieLength === 0) {
          cookieLength = '';
        }
        var cookieId = $(this).data('id');
        var notificationType = $(this).data('notification-type');

        if (!Cookies.get('nir_notice_' + cookieId)) {
          var buttonText = 'Accept';
          if (notificationType === 'notification') {
            buttonText = 'OK';
          }
          $(this).dialog({
            modal: true,
            width: 500,
            closeOnEscape: false,
            close: function () {
              $(this).dialog('close');
              Cookies.set(
                'nir_notice_' + cookieId,
                'true',
                {expires: cookieLength});
            },
            buttons: [
              {
                text: buttonText,
                dialogClass: notificationType,
                click: function () {
                  $(this).dialog('close');
                  Cookies.set(
                    'nir_notice_' + cookieId,
                    'true',
                    {expires: cookieLength});
                }
              }
            ]
          });
          if (notificationType === 'disclaimer'){
            $('.ui-dialog-titlebar-close').hide();
          }
        }

      });
    }
  };
})(jQuery, Drupal);
;
/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  $.fn.drupalGetSummary = function () {
    var callback = this.data('summaryCallback');
    return this[0] && callback ? $.trim(callback(this[0])) : '';
  };

  $.fn.drupalSetSummary = function (callback) {
    var self = this;

    if (typeof callback !== 'function') {
      var val = callback;
      callback = function callback() {
        return val;
      };
    }

    return this.data('summaryCallback', callback).off('formUpdated.summary').on('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    }).trigger('summaryUpdated');
  };

  Drupal.behaviors.formSingleSubmit = {
    attach: function attach() {
      function onFormSubmit(e) {
        var $form = $(e.currentTarget);
        var formValues = $form.serialize();
        var previousValues = $form.attr('data-drupal-form-submit-last');
        if (previousValues === formValues) {
          e.preventDefault();
        } else {
          $form.attr('data-drupal-form-submit-last', formValues);
        }
      }

      $('body').once('form-single-submit').on('submit.singleSubmit', 'form:not([method~="GET"])', onFormSubmit);
    }
  };

  function triggerFormUpdated(element) {
    $(element).trigger('formUpdated');
  }

  function fieldsList(form) {
    var $fieldList = $(form).find('[name]').map(function (index, element) {
      return element.getAttribute('id');
    });

    return $.makeArray($fieldList);
  }

  Drupal.behaviors.formUpdated = {
    attach: function attach(context) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      var $forms = (contextIsForm ? $context : $context.find('form')).once('form-updated');
      var formFields = void 0;

      if ($forms.length) {
        $.makeArray($forms).forEach(function (form) {
          var events = 'change.formUpdated input.formUpdated ';
          var eventHandler = debounce(function (event) {
            triggerFormUpdated(event.target);
          }, 300);
          formFields = fieldsList(form).join(',');

          form.setAttribute('data-drupal-form-fields', formFields);
          $(form).on(events, eventHandler);
        });
      }

      if (contextIsForm) {
        formFields = fieldsList(context).join(',');

        var currentFields = $(context).attr('data-drupal-form-fields');

        if (formFields !== currentFields) {
          triggerFormUpdated(context);
        }
      }
    },
    detach: function detach(context, settings, trigger) {
      var $context = $(context);
      var contextIsForm = $context.is('form');
      if (trigger === 'unload') {
        var $forms = (contextIsForm ? $context : $context.find('form')).removeOnce('form-updated');
        if ($forms.length) {
          $.makeArray($forms).forEach(function (form) {
            form.removeAttribute('data-drupal-form-fields');
            $(form).off('.formUpdated');
          });
        }
      }
    }
  };

  Drupal.behaviors.fillUserInfoFromBrowser = {
    attach: function attach(context, settings) {
      var userInfo = ['name', 'mail', 'homepage'];
      var $forms = $('[data-user-info-from-browser]').once('user-info-from-browser');
      if ($forms.length) {
        userInfo.forEach(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          var browserData = localStorage.getItem('Drupal.visitor.' + info);
          var emptyOrDefault = $element.val() === '' || $element.attr('data-drupal-default-value') === $element.val();
          if ($element.length && emptyOrDefault && browserData) {
            $element.val(browserData);
          }
        });
      }
      $forms.on('submit', function () {
        userInfo.forEach(function (info) {
          var $element = $forms.find('[name=' + info + ']');
          if ($element.length) {
            localStorage.setItem('Drupal.visitor.' + info, $element.val());
          }
        });
      });
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e) {
    var url = void 0;
    if (e.type === 'click') {
      url = e.currentTarget.location ? e.currentTarget.location : e.currentTarget;
    } else {
      url = window.location;
    }
    var hash = url.hash.substr(1);
    if (hash) {
      var $target = $('#' + hash);
      $('body').trigger('formFragmentLinkClickOrHashChange', [$target]);

      setTimeout(function () {
        return $target.trigger('focus');
      }, 300);
    }
  };

  var debouncedHandleFragmentLinkClickOrHashChange = debounce(handleFragmentLinkClickOrHashChange, 300, true);

  $(window).on('hashchange.form-fragment', debouncedHandleFragmentLinkClickOrHashChange);

  $(document).on('click.form-fragment', 'a[href*="#"]', debouncedHandleFragmentLinkClickOrHashChange);
})(jQuery, Drupal, Drupal.debounce);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  Drupal.behaviors.detailsAria = {
    attach: function attach() {
      $('body').once('detailsAria').on('click.detailsAria', 'summary', function (event) {
        var $summary = $(event.currentTarget);
        var open = $(event.currentTarget.parentNode).attr('open') === 'open' ? 'false' : 'true';

        $summary.attr({
          'aria-expanded': open,
          'aria-pressed': open
        });
      });
    }
  };
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Modernizr, Drupal) {
  function CollapsibleDetails(node) {
    this.$node = $(node);
    this.$node.data('details', this);

    var anchor = window.location.hash && window.location.hash !== '#' ? ', ' + window.location.hash : '';
    if (this.$node.find('.error' + anchor).length) {
      this.$node.attr('open', true);
    }

    this.setupSummary();

    this.setupLegend();
  }

  $.extend(CollapsibleDetails, {
    instances: []
  });

  $.extend(CollapsibleDetails.prototype, {
    setupSummary: function setupSummary() {
      this.$summary = $('<span class="summary"></span>');
      this.$node.on('summaryUpdated', $.proxy(this.onSummaryUpdated, this)).trigger('summaryUpdated');
    },
    setupLegend: function setupLegend() {
      var $legend = this.$node.find('> summary');

      $('<span class="details-summary-prefix visually-hidden"></span>').append(this.$node.attr('open') ? Drupal.t('Hide') : Drupal.t('Show')).prependTo($legend).after(document.createTextNode(' '));

      $('<a class="details-title"></a>').attr('href', '#' + this.$node.attr('id')).prepend($legend.contents()).appendTo($legend);

      $legend.append(this.$summary).on('click', $.proxy(this.onLegendClick, this));
    },
    onLegendClick: function onLegendClick(e) {
      this.toggle();
      e.preventDefault();
    },
    onSummaryUpdated: function onSummaryUpdated() {
      var text = $.trim(this.$node.drupalGetSummary());
      this.$summary.html(text ? ' (' + text + ')' : '');
    },
    toggle: function toggle() {
      var _this = this;

      var isOpen = !!this.$node.attr('open');
      var $summaryPrefix = this.$node.find('> summary span.details-summary-prefix');
      if (isOpen) {
        $summaryPrefix.html(Drupal.t('Show'));
      } else {
        $summaryPrefix.html(Drupal.t('Hide'));
      }

      setTimeout(function () {
        _this.$node.attr('open', !isOpen);
      }, 0);
    }
  });

  Drupal.behaviors.collapse = {
    attach: function attach(context) {
      if (Modernizr.details) {
        return;
      }
      var $collapsibleDetails = $(context).find('details').once('collapse').addClass('collapse-processed');
      if ($collapsibleDetails.length) {
        for (var i = 0; i < $collapsibleDetails.length; i++) {
          CollapsibleDetails.instances.push(new CollapsibleDetails($collapsibleDetails[i]));
        }
      }
    }
  };

  var handleFragmentLinkClickOrHashChange = function handleFragmentLinkClickOrHashChange(e, $target) {
    $target.parents('details').not('[open]').find('> summary').trigger('click');
  };

  $('body').on('formFragmentLinkClickOrHashChange.details', handleFragmentLinkClickOrHashChange);

  Drupal.CollapsibleDetails = CollapsibleDetails;
})(jQuery, Modernizr, Drupal);;
