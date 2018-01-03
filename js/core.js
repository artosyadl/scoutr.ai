'use strict';
// fixed svg show
//-----------------------------------------------------------------------------
svg4everybody();

// checking if element for page
//-----------------------------------------------------------------------------------
function isOnPage(selector) {
    return ($(selector).length) ? $(selector) : false;
}

if (isOnPage($('.js-img-listing-slide'))){
  $('.js-img-listing-slide').each(function (e) {
    $(this).slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      arrows: false,
      draggable: false,
      cssEase: 'linear'
    });
  });
}


// search page
function pageWidget(pages) {
  var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
  widgetWrap.prependTo("body");
  for (var i = 0; i < pages.length; i++) {
    if (pages[i][0] === '#') {
      $('<li class="widget_item"><a class="widget_link" href="' + pages[i] +'">' + pages[i] + '</a></li>').appendTo('.widget_list');
    } else {
      $('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
    }
  }
  var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:fixed;top:0;left:0;z-index:9999;padding:20px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
  widgetStilization.prependTo(".widget_wrap");
}

$(document).ready(function($) {
  pageWidget(['index', 'listings', 'home']);
});


// slider-learn
//-----------------------------------------------------------------------------------
$(document).ready(function () {
  slider();
  $(window).resize(function () {
    slider();
  });
});
function slider() {
  var sliderListings = $('.js-slider-listings');

  if (isOnPage(sliderListings)) {
    if ($(window).width() <= 768) {
      $('.is-hide-mob').remove();
      sliderListings.slick({
        dots: false,
        infinite: false,
        arrow: false,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    } else {
      if (sliderListings.hasClass('slick-initialized')) {
        sliderListings.slick('unslick');
      }
    }
  }
}

$(document).on('click', '.btn-show-map', function (e) {
    e.preventDefault();
    $('body').toggleClass('mod-map')
});



// custom jQuery validation
//-----------------------------------------------------------------------------------
var validator = {
    init: function() {
        $('form').each(function() {
            var name = $(this).attr('name');
            if (valitatorRules.hasOwnProperty(name)) {
                var rules = valitatorRules[name];
                $(this).validate({
                    rules: rules,
                    errorElement: 'b',
                    errorClass: 'error',
                    focusInvalid: false,
                    focusCleanup: false,
                    onfocusout: function(element) {
                        var $el = validator.defineElement($(element));
                        $el.valid();
                    },
                    errorPlacement: function(error, element) {
                        validator.setError($(element), error);
                    },
                    highlight: function(element, errorClass, validClass) {
                        var $el = validator.defineElement($(element)),
                            $elWrap = $el.closest('.el-field');
                        if ($el) {
                            $el.removeClass(validClass).addClass(errorClass);
                            $elWrap.removeClass('show-check');
                            if ($el.closest('.ui.dropdown').length) {
                                $el.closest('.ui.dropdown').addClass('error');
                            }
                        }
                    },
                    unhighlight: function(element, errorClass, validClass) {
                        var $el = validator.defineElement($(element)),
                            $elWrap = $el.closest('.el-field');
                        if ($el) {
                            $el.removeClass(errorClass).addClass(validClass);
                            if ($elWrap.hasClass('check-valid')) {
                                $elWrap.addClass('show-check');
                            }
                            $el.closest('el-field').addClass('show-check');
                            if ($el.val() == '') {
                                $el.removeClass('valid');
                            }
                            if ($el.closest('.ui.dropdown').length) {
                                $el.closest('.ui.dropdown').removeClass('error');
                            }
                        }
                    },
                    messages: {
                        'user_email': {
                            required: 'Поле обязательное',
                            email: 'Неправильный формат E-mail'
                        },
                        'user_name': {
                            required: 'Поле обязательное',
                            letters: 'Неправильный формат имени',
                            minlength: 'Не меньше 2 символов'
                        },
                        'user_login': {
                            required: 'Поле обязательное',
                            email: 'Неправильный формат E-mail'
                        },
                        'user_password': {
                            required: 'Поле обязательное',
                            minlength: 'Не менее 6-ти символов'
                        },
                        'user_password_confirm': {
                            required: 'Вы не подтвердили пароль',
                            minlength: 'Не менее 6-ти символов',
                            equalTo: 'Пароли должны совпадать'
                        },
                        'user_phone': {
                            required: 'Поле обязательное',
                            digits: 'Неправильный формат номера'
                        }
                    }
                });
            }
        });
    },
    setError: function($el, message) {
        $el = this.defineElement($el);
        if ($el) this.domWorker.error($el, message);
    },
    defineElement: function($el) {
        return $el;
    },
    domWorker: {
        error: function($el, message) {
            if ($el.attr('type') == 'file') $el.parent().addClass('file-error');
            $el.addClass('error');
            $el.after(message);
        }
    }
};


// rule for form namespace
//-----------------------------------------------------------------------------------
var valitatorRules = {
    'form_one': {
        'user_login': {
            required: true,
            email: true
        },
        'user_name': {
            required: true,
            minlength: 2
        },
        'user_email': {
            required: true,
            email: true
        },
        'user_phone': {
            required: true,
            digits: true
        },
        'user_password': {
            required: true,
            minlength: 6
        },
        'user_password_confirm': {
            required: true,
            minlength: 6,
            equalTo: "#user_password"
        }
    }

};

// custom rules
//-----------------------------------------------------------------------------------
$.validator.addMethod("email", function(value) {
    if (value == '') return true;
    var regexp = /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regexp.test(value);
});

$.validator.addMethod("letters", function(value, element) {
    return this.optional(element) || /^[^1-9!@#\$%\^&\*\(\)\[\]:;,.?=+_<>`~\\\/"]+$/i.test(value);
});

$.validator.addMethod("digits", function(value, element) {
    return this.optional(element) || /^(\+?\d+)?\s*(\(\d+\))?[\s-]*([\d-]*)$/i.test(value);
});

$.validator.addMethod("valueNotEquals", function(value, element) {
    if (value == "") return false
    else return true
});

//  validator init
//-----------------------------------------------------------------------------------
validator.init();
