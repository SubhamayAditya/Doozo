$(document).ready(function () {
  // Rotate announcement bar messages
  var $msgs = $(".topHeader span");
  if ($msgs.length > 1) {
    setInterval(function () {
      var $current = $msgs.filter(":visible");
      var $next = $current.next("span").length
        ? $current.next("span")
        : $msgs.first();
      $current.fadeOut(400, function () {
        $next.fadeIn(400);
      });
    }, 3500);
  }

  $(".currentYear").text(new Date().getFullYear());

  // Soft shadow under the sticky header once the page scrolls
  var $header = $("header");
  function onScroll() {
    $header.toggleClass("is-scrolled", window.scrollY > 4);
  }
  $(window).on("scroll", onScroll);
  onScroll();
});

// "Come back" tab title
var originalTitle = document.title;
var titleInterval;
var toggleMessages = ["🧢 Come back!", "Your DOOZO style is waiting 😎"];
var messageIndex = 0;

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    messageIndex = 0;
    titleInterval = setInterval(function () {
      document.title = toggleMessages[messageIndex];
      messageIndex = (messageIndex + 1) % toggleMessages.length;
    }, 1000);
  } else {
    clearInterval(titleInterval);
    document.title = originalTitle;
  }
});

// Mobile slide-in drawer
(function () {
  var drawer = document.getElementById("mainMenu");
  var scrim = document.getElementById("menuScrim");
  var openBtn = document.getElementById("menuOpen");
  var closeBtn = document.getElementById("menuClose");
  if (!drawer || !openBtn) return;

  function setOpen(open) {
    drawer.classList.toggle("is-open", open);
    scrim.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    openBtn.setAttribute("aria-expanded", open ? "true" : "false");
    openBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) closeBtn.focus();
    else openBtn.focus({ preventScroll: true });
  }

  openBtn.addEventListener("click", function () {
    setOpen(true);
  });
  closeBtn.addEventListener("click", function () {
    setOpen(false);
  });
  scrim.addEventListener("click", function () {
    setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer.classList.contains("is-open"))
      setOpen(false);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992 && drawer.classList.contains("is-open"))
      setOpen(false);
  });
})();

// Focus the search box when the mobile search modal opens
$(document).on("shown.bs.modal", "#searchBox", function () {
  $(this).find("input").trigger("focus");
});

// scroll to top
$(function () {
  const $btn = $("#scrollTopBtn");

  $(window)
    .on("scroll", function () {
      $btn.toggleClass("show", window.scrollY > 300);
    })
    .trigger("scroll");

  $btn.on("click", function () {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "instant" : "smooth",
    });
  });
});

// hero slider
$(function () {
  $(".heroSlider").slick({
    dots: true,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 750,
        settings: { arrows: false },
      },
    ],
  });
});

// Video button
$(function () {
  var $video = $(".video-section video");
  var $btn = $(".video-section .controls");

  // Check if video and button exist
  if (!$video.length || !$btn.length) return;

  var video = $video.get(0);
  var $icon = $btn.find("i");

  // Keep icon in sync with video state
  function showPause() {
    $icon.removeClass("fa-play").addClass("fa-pause");
    $btn.attr("aria-label", "Pause video");
  }

  function showPlay() {
    $icon.removeClass("fa-pause").addClass("fa-play");
    $btn.attr("aria-label", "Play video");
  }

  // Video events
  $video.on("play playing", showPause);
  $video.on("pause ended", showPlay);

  // Toggle video on button click
  $btn.on("click", function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
});

// testimonial
$(function () {
  $(".testimonial-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
    adaptiveHeight: true,
    dots: true,
    arrows: true,
    appendArrows: ".testimonial-nav",
    appendDots: ".testimonial-dots",
    prevArrow:
      '<button type="button" class="slick-prev testimonial-arrow" aria-label="Previous review"><i class="fa fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next testimonial-arrow" aria-label="Next review"><i class="fa fa-angle-right"></i></button>',
  });
});

// shorting Icon
$(document).ready(function () {
  $("#productShort").on("change", function () {
    const selectedValue = $(this).val();
    const sortIcon = $("#sortIcon");

    const icons = {
      "": "fa-arrow-down-short-wide",
      "a-z": "fa-arrow-down-a-z",
      "z-a": "fa-arrow-down-z-a",
      priceHL: "fa-arrow-down-wide-short",
      priceLH: "fa-arrow-up-wide-short",
    };

    // Remove previous icon classes
    sortIcon.removeClass(
      "fa-arrow-down-short-wide fa-arrow-down-a-z fa-arrow-down-z-a fa-arrow-down-wide-short fa-arrow-up-wide-short",
    );

    // Add selected icon
    sortIcon.addClass(icons[selectedValue] || "fa-arrow-down-short-wide");
  });
});
