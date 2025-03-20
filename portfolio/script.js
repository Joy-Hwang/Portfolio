document.addEventListener("DOMContentLoaded", function () {
  try {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Header
    const header = document.getElementById("header");
    if (header) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
          header.classList.add("on");
        } else {
          header.classList.remove("on");
        }
      });
    } else {
      console.error("Error: #header element not found!");
    }

    // Nav
    const navLinkEls = document.querySelectorAll(".nav__link");
    const sectionEls = document.querySelectorAll(".section");

    let currentSection = "about";
    window.addEventListener("scroll", () => {
      sectionEls.forEach((sectionEl) => {
        if (
          window.scrollY >=
          sectionEl.offsetTop - sectionEl.clientHeight / 3
        ) {
          currentSection = sectionEl.id;
        }
      });

      navLinkEls.forEach((navLinkEl) => {
        if (navLinkEl.href.includes(currentSection)) {
          const activeNav = document.querySelector(".active");
          if (activeNav) activeNav.classList.remove("active");
          navLinkEl.classList.add("active");
        }
      });
    });

    // Scroll
    const sections = document.querySelectorAll(".section");
    const totalSections = sections.length;
    let currentIndex = 0;
    let isScrolling = false;
    const container = document.getElementById("main");

    window.addEventListener("wheel", handleScroll, { passive: false });

    function handleScroll(e) {
      e.preventDefault();
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) {
        if (currentIndex < totalSections) {
          currentIndex++;
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
        }
      }

      container.style.transform = `translateY(-${currentIndex * 100}vh)`;

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }

    // Scroll Reveal Animation (jQuery)
    function scrollReveal() {
      var $win = $(window),
        $win_height = $win.height(),
        windowPercentage = $win_height * 0.9;

      var scrolled = $win.scrollTop();

      $(".chartBarsHorizontal .bar").each(function () {
        var $this = $(this),
          offsetTop = $this.offset().top;
        if (
          scrolled + windowPercentage > offsetTop ||
          $win_height > offsetTop
        ) {
          var percentage = $this.data("percentage");
          $this.css("width", percentage + "%");

          $this.prop("Counter", 0).animate(
            { Counter: percentage },
            {
              duration: 2000,
              easing: "swing",
              step: function (now) {
                $this.text(Math.ceil(now));
              },
            }
          );
        } else {
          $this.css("width", 0);
        }
      });
    }

    $(window).on("scroll", scrollReveal);
    scrollReveal();

    // Tabs
    function initTabs() {
      const tabNavItems = document.querySelectorAll(".tab-nav__item");
      const tabContentBoxes = document.querySelectorAll(".tab-content__box");

      if (tabNavItems.length === 0 || tabContentBoxes.length === 0) return;

      tabNavItems.forEach((tab) => {
        tab.addEventListener("click", function () {
          const tabId = this.getAttribute("data-tab");
          if (!tabId) return;

          tabNavItems.forEach((item) => item.classList.remove("active"));
          tabContentBoxes.forEach((box) => box.classList.remove("active"));

          this.classList.add("active");
          const activeContent = document.getElementById(tabId);
          if (activeContent) {
            activeContent.classList.add("active");
          }
        });
      });
    }
    initTabs();

    // Swiper
    let swiper = new Swiper(".workSwiper", {
      pagination: {
        el: ".swiper-pagination",
      },
    });
  } catch (error) {
    console.error("Script Error:", error);
  }
});
