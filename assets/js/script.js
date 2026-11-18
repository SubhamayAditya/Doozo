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

$(function () {
  var $video = $(".video-section video");
  var $btn = $(".video-section .controls");
  var $icon = $btn.find("i");
  var video = $video.get(0);

  // keep the icon in sync with the real video state
  function showPause() {
    $icon.removeClass("fa-play").addClass("fa-pause");
    $btn.attr("aria-label", "Pause video");
  }

  function showPlay() {
    $icon.removeClass("fa-pause").addClass("fa-play");
    $btn.attr("aria-label", "Play video");
  }

  $video.on("play playing", showPause);
  $video.on("pause", showPlay);

  // toggle on button click
  $btn.on("click", function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  // if the browser blocks autoplay, show the play icon instead
  var attempt = video.play();
  if (attempt !== undefined) {
    attempt.catch(showPlay);
  }
});

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
