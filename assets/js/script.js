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

// product area

$(function () {
  // ==========================================
  // PRODUCT IMAGE GALLERY
  // ==========================================

  const $gallery = $(".product-gallery");

  // Prevent errors on pages without a product gallery
  if (!$gallery.length) return;

  const $track = $gallery.find(".thumbnail-track");
  const $viewport = $gallery.find(".product-thumbnails");
  const $mainImage = $gallery.find("#productMainImage");
  const $prev = $gallery.find(".gallery-prev");
  const $next = $gallery.find(".gallery-next");

  const $originalThumbs = $track.children(".product-thumb");

  if (
    !$track.length ||
    !$viewport.length ||
    !$mainImage.length ||
    !$originalThumbs.length
  ) {
    return;
  }

  const totalItems = $originalThumbs.length;
  const desktopVisibleItems = 5;
  const mobileVisibleItems = 3;

  let visibleItems = desktopVisibleItems;
  const animationSpeed = 350;

  let currentIndex = totalItems;
  let itemSize = 0;
  let gap = 10;
  let isMobile = false;
  let isAnimating = false;
  let resizeTimer;

  // ==========================================
  // UPDATE MAIN PRODUCT IMAGE
  // ==========================================

  function updateMainImage($thumb) {
    const imageSrc = $thumb.data("image");
    const imageAlt = $thumb.find("img").attr("alt") || "Product image";

    if (!imageSrc) return;

    $mainImage.attr({
      src: imageSrc,
      alt: imageAlt,
    });

    $originalThumbs.removeClass("active").attr("aria-pressed", "false");

    $thumb.addClass("active").attr("aria-pressed", "true");
  }

  // ==========================================
  // RESET THUMBNAIL POSITION
  // ==========================================

  function setTrackPosition(animate = false) {
    const offset = currentIndex * (itemSize + gap);
    const direction = isMobile ? "X" : "Y";

    $track.css({
      transition: animate ? `transform ${animationSpeed}ms ease` : "none",
      transform: `translate${direction}(-${offset}px)`,
    });
  }

  // ==========================================
  // INITIALIZE GALLERY
  // ==========================================

  function initializeGallery() {
    isMobile = window.innerWidth <= 991;
    visibleItems = isMobile ? mobileVisibleItems : desktopVisibleItems;

    isAnimating = false;

    // Remove previously created clones
    $track.children(".clone").remove();

    // Reset original thumbnail styles
    $originalThumbs.css({
      width: "",
      height: "",
    });

    // Create clones for infinite scrolling
    if (totalItems > visibleItems) {
      const $leadingClones = $originalThumbs.clone().addClass("clone").attr({
        "aria-hidden": "true",
        tabindex: "-1",
      });

      const $trailingClones = $originalThumbs.clone().addClass("clone").attr({
        "aria-hidden": "true",
        tabindex: "-1",
      });

      $track.prepend($leadingClones);
      $track.append($trailingClones);
    }

    // Get thumbnail spacing
    gap =
      parseFloat(isMobile ? $track.css("column-gap") : $track.css("row-gap")) ||
      10;

    // ======================================
    // MOBILE / TABLET
    // ======================================

    if (isMobile) {
      const viewportWidth = $viewport.width();

      itemSize = (viewportWidth - gap * (visibleItems - 1)) / visibleItems;

      $track.children(".product-thumb").css({
        width: itemSize + "px",
        height: itemSize + "px",
      });

      $viewport.css({
        height: itemSize + "px",
      });

      // Change arrows to horizontal
      $prev.attr("aria-label", "Previous product images");
      $next.attr("aria-label", "Next product images");

      $prev.find("i").removeClass("fa-chevron-up").addClass("fa-chevron-left");

      $next
        .find("i")
        .removeClass("fa-chevron-down")
        .addClass("fa-chevron-right");
    }

    // ======================================
    // DESKTOP
    // ======================================
    else {
      itemSize = 73;

      $track.children(".product-thumb").css({
        width: "76px",
        height: itemSize + "px",
      });

      $viewport.css({
        width: "76px",
        height: `${itemSize * visibleItems + gap * (visibleItems - 1)}px`,
      });
      // Change arrows to vertical
      $prev.attr("aria-label", "Previous product images");
      $next.attr("aria-label", "Next product images");

      $prev.find("i").removeClass("fa-chevron-left").addClass("fa-chevron-up");

      $next
        .find("i")
        .removeClass("fa-chevron-right")
        .addClass("fa-chevron-down");
    }

    // Show arrows only when needed
    const hasNavigation = totalItems > visibleItems;

    $prev.toggle(hasNavigation);
    $next.toggle(hasNavigation);

    // Start at the original first thumbnail
    currentIndex = totalItems;

    setTrackPosition(false);
  }

  // ==========================================
  // INFINITE THUMBNAIL NAVIGATION
  // ==========================================

  function moveGallery(direction) {
    if (isAnimating || totalItems <= visibleItems || !itemSize) {
      return;
    }

    isAnimating = true;

    currentIndex += direction;

    setTrackPosition(true);
  }

  // ==========================================
  // HANDLE INFINITE LOOP
  // ==========================================

  $track.on("transitionend", function (event) {
    if (event.target !== $track[0]) return;

    if (currentIndex >= totalItems * 2) {
      currentIndex = totalItems;
      setTrackPosition(false);
    } else if (currentIndex < totalItems) {
      currentIndex = totalItems * 2 - 1;
      setTrackPosition(false);
    }

    isAnimating = false;
  });

  // ==========================================
  // THUMBNAIL CLICK
  // ==========================================

  $gallery.on("click", ".product-thumb:not(.clone)", function () {
    updateMainImage($(this));
  });

  // ==========================================
  // PREVIOUS / NEXT BUTTONS
  // ==========================================

  $prev.on("click", function () {
    moveGallery(-1);
  });

  $next.on("click", function () {
    moveGallery(1);
  });

  // ==========================================
  // INITIALIZE
  // ==========================================

  initializeGallery();

  // ==========================================
  // RESPONSIVE RESIZE
  // ==========================================

  $(window).on("resize", function () {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function () {
      initializeGallery();
    }, 150);
  });
});
