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


