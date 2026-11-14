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
var toggleMessages = ["🧢 Come back!", "Your DOOZO style is waiting."];
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
