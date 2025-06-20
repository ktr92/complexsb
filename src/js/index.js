function initFE() {
  /*  cardImagesSlider() */
  /*   menuInit() */
  mainSliderInit()
  detailsliderInit()
  imgSliderInit()
  recipeSliderInit()
  productSliderInit()
  /*  mobileAccordeon() */
  closeByOutsideSelect()
  closeByClickOutside(".mainmenu", '[data-action="mainmenu"]', checkMenuExpand('mainmenu'))
  closeByClickOutside(".catalogpage__aside", ".js-mobilefilter")
  fixElement(false, 750, "mobpriceFixed", "fixed")
  fixElement(300, false, "headermain", "fixed")
  fixElement(300, false, "headercontainer", "fixed")
  /*  fixElement(false, 0, "mobilenav", "fixed") */
  blockSliderInit()
  /*   productListImgLisder()
   */
  moreNewsSliderInit()
  lazyLoadSrc("iframe")
  lazyLoadSrc("img")
}

const checkMenuExpand = (menu) => {
    if ($(menu).hasClass('active')) {
      $(".jsbackdrop").addClass("active")
    } else {
      $(".jsbackdrop").removeClass("active")
    }
  }

function lazyLoadSrc(selector) {
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const source = entry.target
      if (entry.intersectionRatio > 0) {
        if (!source.getAttribute("src")) {
          source.setAttribute("src", source.dataset.src)
          observer.unobserve(source)
        }
      }
    })
  }
  const target = document.querySelectorAll(selector)
  const options = {
    threshold: 0.4,
  }
  let obs = new IntersectionObserver(callback, options)
  target.forEach((item) => {
    obs.observe(item)
  })
}

$(document).ready(function () {
  $('.searchinput input').on("focus",  (e) => { 
     $('.searchinput').addClass('active')
  });
  $('.searchinput input').on("blur",  (e) => { 
     $('.searchinput').removeClass('active')
  });

  $("[data-toggleclick]").on("click", function (e) {
    $(this).toggleClass("active")
    $(this).closest("[data-toggleitem]").addClass('active')
    e.preventDefault()
    let dropdown = $(this).data("toggleclick")
    $("[data-toggle].active")
      .not($(`[data-toggle=${dropdown}]`))
      .removeClass("active")
    $("[data-toggleclick].active")
      .not($(`[data-toggleclick=${dropdown}]`))
      .removeClass("active")
    $("[data-toggleitem].active")
      .not($(`[data-toggleitem=${dropdown}]`))
      .removeClass("active")
    $(`[data-toggle=${dropdown}]`).toggleClass("active")
    $(`[data-toggleactive=${dropdown}]`).toggleClass("active")
  })

  /**
     * кастомные select - выбор элемента из выпадающего списка, вывод значения в связанный с ним инпут
     */
    $("[data-togglevalue]").on("click", function (e) {
      e.preventDefault()
      $(this).toggleClass("active")
      // get value
      let val = $(this).data("togglevalue")

      // get wrapper leement
      const $wrapper = $(this).closest("[data-toggleitem]")
      // get dropdown ID
      let id = $wrapper.data("toggleitem")
      // close dropdown
      $(`[data-toggle=${id}]`).toggleClass("active")
      // set value
      $(`[data-value=${id}]`).text(val)
      $(`[data-inputvalue=${id}]`).val(val).trigger('change')
      $(`[data-inputfor=${id}]`).val('')
      if ($(this).data("togglevalue2")) {
        let val2 = $(this).data("togglevalue2")
        $(`[data-value2=${id}]`).text(val2)
      }
      if ($(this).data("icon")) {
        let icon = $(this).data("icon")
        $(this).closest('[data-toggleitem]').find(`[data-toggleicon]`).attr('src', icon)
      }
    })

  document.querySelectorAll("form .stars").forEach((element) => {
    element.addEventListener("click", function (e) {
      let action = "add"
      for (const span of this.children) {
        span.classList[action]("active")
        if (span === e.target) action = "remove"
      }
      var $inp = this.closest(".formrating").querySelector(
        'input[name="formrating"]'
      )
      $inp.value = this.closest(".formrating").querySelectorAll(
        "form .stars span.active"
      ).length
    })
  })

  $(document).on("click", "[data-action='changeShops_list']", (e) => {
    $(".changeShops_list").removeClass("active")
    $(".changeShops_map").addClass("active")
  })


  $(document).on("click", "[data-action='changeShops_map']", (e) => {
    $(".changeShops_map").removeClass("active")
    $(".changeShops_list").addClass("active")
  })

  $(document).on("click", "[data-toggleclass]", (e) => {
    e.stopPropagation()
    e.preventDefault()
    $(e.target).addClass("active")
  })

  $(".arrowmenu").on("click", function () {
    console.log(1)
    $(".headermenu__wrapper").animate({
      scrollLeft: "+=126px",
    })
  })

  /*     flatpickr("#js-flatpickr", {
        minDate: "today",
    }); */

  document.querySelectorAll('[data-toggle="password"]').forEach((item) => {
    item.addEventListener("click", (event) => {
      let inp = item.previousElementSibling
      if (inp.type === "password") {
        inp.type = "text"
      } else {
        inp.type = "password"
      }
    })
  })

  /*  $(function() {
        $("iframe[data-src]").each(function() {
            $(this).Lazy();
        })
    }); */
  $(".js-mobilefilter").on("click", function (e) {
    e.preventDefault()
    $(this).toggleClass("active")
    $(".catalogpage__aside").toggleClass("active")
  })

  /*  $('.headermain__contacts').on('click', function(e) {
      e.preventDefault()
      $(this).toggleClass('active')
      $('.contacts__dropdown').slideToggle()
  }) */

  $(".jscatalog .js-toggler").on("click", function (e) {
    slideSubmenu($(this))
  })

  $('[data-action="opencatalogmenu"]').on("click", function (e) {
    if (!$(".mobilemenu").hasClass("active")) {
      $(".mobilemenu").addClass("active")
    }

    toggleCatalogMenu($(this))
  })
  $('[data-action="closecatalog"]').on("click", function (e) {
    closeMainMenu($(this))
  })
  $('[data-action="closemenu"]').on("click", function (e) {
    closeMainMenu($(this))
  })

  function closeMainMenu(element) {
    element.removeClass("active")
    $(".mobilemenu").removeClass("active")
    $(".menubutton").removeClass("active")
    $(".mobilemenu__level2").removeClass("active")
    $(".mobilemenu__content").removeClass("active")
    $(".jsbackdrop").removeClass("active")
    $(".mobilemenu").removeClass("catalogexpand")
  }

  function closeCatalogMenu(element) {
    $(".mobilemenu").removeClass("catalogexpand")
    $(".mobilemenu__submenu.mobilemenu__level2.active").removeClass("active")
  }

  function toggleCatalogMenu(element) {
    $(".mobilemenu").toggleClass("catalogexpand")
    $(".jstoggler")
      .closest(".jscatalog")
      .siblings(".mobilemenu__level2")
      .toggleClass("active")
  }

  function slideSubmenu(element) {
    element.closest(".jscatalog").toggleClass("active")
    element
      .closest(".jscatalog")
      .siblings(".mobilemenu__level2")
      .toggleClass("active")
  }

  $('[data-action="mainmenu"]').on("click", function (e) {
    $(this).toggleClass("active")
    $(".mainmenu").toggleClass("active")
 checkMenuExpand('mainmenu')
    
  })

  $(".mobilemenu__level2 .js-toggler").on("click", function (e) {
    $(this).closest(".mobilemenu__content").toggleClass("active")
    $(this)
      .closest(".mobilemenu__item")
      .find(".mobilemenu__level3")
      .slideToggle()
  })

  $(".menubutton").on("click", function (e) {
    $(this).toggleClass("active")
    $(".mobilemenu").toggleClass("active")
     checkMenuExpand('.mobilemenu')
    $(".mobilemenu__level2").removeClass("active")
    $(".mobilemenu__content").removeClass("active")
  })
  $('[data-action="mobilemenu]').on("click", function (e) {
    $(this).toggleClass("active")
    $(".mobilemenu").toggleClass("active")
    $(".jsbackdrop").toggleClass("active")
    $(".mobilemenu__level2").removeClass("active")
    $(".mobilemenu__content").removeClass("active")
  })
  $(".jsbackdrop").on("click", function (e) {
    $(this).removeClass("active")
    $(".mobilemenu").removeClass("active")
    $(".menubutton").removeClass("active")
    $(".mobilemenu__level2").removeClass("active")
    $(".mobilemenu__content").removeClass("active")
  })
  $(".haederbanner__close").on("click", function (e) {
    e.preventDefault()
    $(this).closest(".haederbanner").hide()
  })
  if ($(".cardrating").length > 0) {
    $(".cardrating .score-wrap").each(function () {
      let wrapper = $(this)
      wrapper.find(".fa").each(function (index) {
        let fa = $(this)
        let rating = fa.closest("[data-rating]").data("rating")
        if (index < rating) {
          $(this).addClass("active")
        } else {
          return false
        }
      })
    })

    /* $(".productcard .cardrating").each(function () {
      $(this)
        .find("span.stars-active")
        .css("width", $(this).find(".cardrating__value").text() * 11.6)
    }) */
  }
  if ($(".detailinfo__reviews .cardrating").length > 0) {
    /* if ($(window).width() < 1024) {
      $(".detailinfo__reviews .cardrating").each(function () {
        $(this)
          .find("span.stars-active")
          .css("width", +$(this).find(".cardrating__value").text() * 15)
      })
    } else {
      $(".detailinfo__reviews .cardrating").each(function () {
        $(this)
          .find("span.stars-active")
          .css("width", +$(this).find(".cardrating__value").text() * 18)
      })
    } */
  }
  if ($("reviews__rating .cardrating").length > 0) {
    /*  $(".reviews__rating .cardrating").each(function () {
      $(this)
        .find("span.stars-active")
        .css("width", $(this).find(".cardrating__value").text() * 18)
    }) */
  }
  if ($("input[type=tel]").length > 0) {
    $("input[type=tel]").mask("7 (999) 999-99-99")
  }

  lightbox.option({
    resizeDuration: 0,
  })

  MathUtils = {
    roundToPrecision: function (subject, precision) {
      return +(+subject).toFixed(precision)
    },
  }

  function decrementValue(e, step) {
    e.preventDefault()
    let $el = $(e.target)
    if (!$el.data("field")) {
      $el = $el.parent()
    }
    var fieldName = $el.data("field")
    var parent = $el.closest("div")
    var currentVal = +parseFloat(
      parent.find("input[name=" + fieldName + "]").val()
    ).toFixed(1)
    var minValue =
      +parseFloat(
        parent.find("input[name=" + fieldName + "]").attr("min")
      ).toFixed(1) || 0

    if (!isNaN(currentVal) && currentVal > minValue) {
      parent
        .find("input[name=" + fieldName + "]")
        .val(
          Math.max(MathUtils.roundToPrecision(currentVal - step, 1), minValue)
        )
    } else {
      parent.find("input[name=" + fieldName + "]").val(minValue)
    }
    parent.find("input[name=" + fieldName + "]").trigger("change")
  }

  function incrementValue(e, step) {
    e.preventDefault()
    let $el = $(e.target)
    if (!$el.data("field")) {
      $el = $el.parent()
    }
    var fieldName = $el.data("field")
    var parent = $el.closest("div")
    var currentVal = +parseFloat(
      parent.find("input[name=" + fieldName + "]").val()
    ).toFixed(1)
    var maxValue = parent.find("input[name=" + fieldName + "]").attr("max")
    maxValue = maxValue ? +parseFloat(maxValue).toFixed(1) : Infinity

    if (!isNaN(currentVal) && currentVal + step <= maxValue) {
      parent
        .find("input[name=" + fieldName + "]")
        .val(MathUtils.roundToPrecision(currentVal + step, 1))
    } else {
      parent.find("input[name=" + fieldName + "]").val(maxValue)
    }
    parent.find("input[name=" + fieldName + "]").trigger("change")
  }

  $(document).on("click", ".quantity-plus", function (e) {
    e.preventDefault()
    e.stopPropagation()
    let step = +parseFloat(
      $(this).siblings('[type="number"]').attr("step")
    ).toFixed(1)
    incrementValue(e, step)
  })

  $(document).on("click", ".quantity-minus", function (e) {
    e.preventDefault()
    e.stopPropagation()
    let step = +parseFloat(
      $(this).siblings('[type="number"]').attr("step")
    ).toFixed(1)
    decrementValue(e, step)
  })
  ;(function ($) {
    $(function () {
      $(".js-tabsheader").on("click", "li:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("div.js-tabs")
          .find("div.js-tabscontent")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active")
      })
    })
  })(jQuery)
  ;(function ($) {
    $(function () {
      $("[data-headertabs]").on("click", "li:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("[data-tabs]")
          .find("[data-contenttabs]")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active")
      })
    })
  })(jQuery)
  ;(function ($) {
    $(function () {
      $(".sitetabs__header ul").on("click", "li:not(.active)", function () {
        $(this)
          .addClass("active")
          .siblings()
          .removeClass("active")
          .closest("div.sitetabs")
          .find("div.sitetabs__content")
          .removeClass("active")
          .eq($(this).index())
          .addClass("active")
      })
    })
  })(jQuery)
})

function mainSliderInit() {
  if ($(".mainswiper").length > 0) {
    const swiper = new Swiper(".mainswiperpreview", {
      lazy: true,

      spaceBetween: 9,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      slidesPerView: "auto",
      mousewheel: true,
      direction: "vertical",
      freeMode: true,
      watchSlidesProgress: true,
      on: {
        init: function () {
          $("#mainslider_placeholder").hide()
        },
      },
    })
    const swiper2 = new Swiper(".mainswiper", {
      lazy: true,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
      pagination: {
        el: ".mainslider-pagination",
        clickable: true,
      },
    })
  }
}

function detailsliderInit() {
  if ($(".detailswiperpreview").length > 0) {
    const swiper = new Swiper(".detailswiperpreview", {
      spaceBetween: 9,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      slidesPerView: "auto",
      mousewheel: true,
      direction: "vertical",
      freeMode: true,
      watchSlidesProgress: true,
    })
    const swiper2 = new Swiper(".detailswiper", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
      },
      pagination: {
        el: ".detailslider-pagination",
        clickable: true,
      },
    })
  }

  $(function () {
    $(".zoom-box").each(function () {
      $(this).zoom()
    })
  })
}

function productSliderInit() {
  if ($(".productslider__slider").length > 0) {
    $(".productslider__slider").each(function () {
      $(this).slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        /*  autoplay: true,
            autoplaySpeed: 3000, */
        swipe: false,
        nextArrow: $(this)
          .closest(".productslider")
          .find(".sliderarrows__right"),
        prevArrow: $(this)
          .closest(".productslider")
          .find(".sliderarrows__left"),
        responsive: [
          {
            breakpoint: 1530,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },

          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
        ],
      })
    })
  }
  if ($(".productslider__modalslider").length > 0) {
    $(".productslider__modalslider").each(function () {
      $(this).slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        autoplay: true,
        autoplaySpeed: 3000,
        swipe: false,
        nextArrow: $(this)
          .closest(".productslider")
          .find(".sliderarrows__right"),
        prevArrow: $(this)
          .closest(".productslider")
          .find(".sliderarrows__left"),
        responsive: [
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      })
    })
  }
}

function recipeSliderInit() {
  if ($(".recipeslider__slider").length > 0) {
    $(".recipeslider__slider").each(function () {
      $(this).slick({
        dots: false,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 1,

        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        swipe: false,
        nextArrow: $(this)
          .closest(".recipeslider")
          .find(".sliderarrows__right"),
        prevArrow: $(this).closest(".recipeslider").find(".sliderarrows__left"),
        responsive: [
          {
            breakpoint: 1530,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      })
    })
  }
}
function moreNewsSliderInit() {
  if ($(".morenews__slider").length > 0) {
    $(".morenews__slider").each(function () {
      $(this).slick({
        dots: false,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,

        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        swipe: false,
        nextArrow: $(this)
          .closest(".morenewsslider")
          .find(".sliderarrows__right"),
        prevArrow: $(this)
          .closest(".morenewsslider")
          .find(".sliderarrows__left"),
        responsive: [
          {
            breakpoint: 1530,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      })
    })
  }
}

function imgSliderInit() {
  if ($(".imgslider__slider").length > 0) {
    $(".imgslider__slider").each(function () {
      $(this).slick({
        dots: false,
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 1,

        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        nextArrow: $(this).closest(".imgslider").find(".beyond-button-next"),
        prevArrow: $(this).closest(".imgslider").find(".beyond-button-prev"),
        responsive: [
          {
            breakpoint: 1530,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 767,
            settings: {
              dots: true,
              slidesToShow: 3,
              slidesToScroll: 1,
            },
          },
        ],
      })
    })
  }
}

function fixElement(topDesktop, topMobile, elementId, className) {
  if (document.getElementById(elementId)) {
    if (window.innerWidth >= 1023) {
      if (topDesktop === 0) {
        document.getElementById(elementId).classList.add(className)
      } else {
        if (topDesktop) {
          window.addEventListener("scroll", (event) => {
            scroll = window.scrollY
            if (scroll >= topDesktop) {
              document.getElementById(elementId).classList.add(className)
            } else {
              document.getElementById(elementId).classList.remove(className)
            }
          })
        }
      }
    } else {
      if (topMobile === 0) {
        document.getElementById(elementId).classList.add(className)
      } else {
        if (topMobile) {
          window.addEventListener("scroll", (event) => {
            scroll = window.scrollY
            if (scroll >= topMobile) {
              document.getElementById(elementId).classList.add(className)
            } else {
              document.getElementById(elementId).classList.remove(className)
            }
          })
        }
      }
    }
  }
}

function blockSliderInit() {
  if ($(".blockslider__container").length > 0) {
    const blockslider = new Swiper(".blockslider__container", {
      pagination: {
        el: ".blockslider-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".blockslider-button-next",
        prevEl: ".blockslider-button-prev",
      },
    })
  }
}

function mobileAccordeon() {
  if ($(".infobadge__main").length > 0) {
    if ($(window).width() < 1024) {
      $(".infobadge__main").on("click", function () {
        $(this).toggleClass("active")
        $(this)
          .closest(".infobadge")
          .find(".infobadge__accordeon")
          .slideToggle()
      })
    }
  }
}

function closeByClickOutside(element, button, fn = () => {}) {
  $(document).click(function (event) {
    if (!$(event.target).closest(`${element},${button}`).length) {
      $(button).removeClass("active")
      $(element).removeClass("active")

      if (fn) {
        fn()
      }
    }
  })

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(button).removeClass("active")
      $(element).removeClass("active")

       if (fn) {
        fn()
      }
    }
  })
}
function closeByOutsideSelect() {
  $(document).click(function (event) {
    if (
      !$(event.target).closest(`.dropdown-select__list,.dropdown-select__title`)
        .length
    ) {
      $(".dropdown-select__list").hide()
    }
  })

  $(document).keyup(function (e) {
    if (e.key === "Escape") {
      // escape key maps to keycode `27`
      $(".dropdown-select__list").hide()
    }
  })
}

/* function productListImgLisder() {
  if ($(window).width() < 1024) {
    $(".productcard__images_mobile .productcard__img").each(function (e) {
      $(this).slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
      })
    })
  }
} */

window.addEventListener("load", () => {
  initFE()
})
