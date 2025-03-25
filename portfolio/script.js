function initApp() {
  AOS.init({
    offset: 100,
    delay: 0,
    duration: 600,
  });
  initHeaderScroll();
  initNav();
  initSmoothScroll();
  initProgressBar();
  initTabs();
  initSwiper();
}

// ⭐ 1. 헤더 스크롤 시 스타일 변경
function initHeaderScroll() {
  const header = document.getElementById("header");

  window.addEventListener("scroll", function () {
    header.classList.toggle("on", window.scrollY > 50);
  });
}

// ⭐ 2. 네비게이션 활성화 기능
function initNav() {
  const navLinkEls = document.querySelectorAll(".nav__link");
  const sectionEls = document.querySelectorAll(".section");
  let currentSection = "about";

  window.addEventListener("scroll", () => {
    sectionEls.forEach((sectionEl) => {
      if (window.scrollY >= sectionEl.offsetTop - sectionEl.clientHeight / 3) {
        currentSection = sectionEl.id;
      }
    });

    navLinkEls.forEach((navLinkEl) => {
      navLinkEl.classList.toggle(
        "active",
        navLinkEl.hash === `#${currentSection}`
      );
    });
  });
}

// ⭐ 3. 네비게이션 클릭 시 부드러운 이동 적용
function initSmoothScroll() {
  document.documentElement.style.scrollBehavior = "smooth";

  document.querySelectorAll(".nav__link").forEach((navLinkEl) => {
    navLinkEl.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = navLinkEl.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ⭐ 4. 프로그레스 바 애니메이션 (jQuery 필요)
function initProgressBar() {
  function scrollReveal() {
    var $win = $(window),
      $win_height = $win.height(),
      windowPercentage = $win_height * 0.9;

    var scrolled = $win.scrollTop();

    $(".chartBarsHorizontal .bar").each(function () {
      var $this = $(this),
        offsetTop = $this.offset().top;
      if (scrolled + windowPercentage > offsetTop || $win_height > offsetTop) {
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
}

// ⭐ 5. 탭 기능 초기화
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
      document.getElementById(tabId)?.classList.add("active");
    });
  });
}

// ⭐ 6. Swiper 슬라이드 초기화
function initSwiper() {
  new Swiper(".experienceSwiper", {
    allowTouchMove: true,
    pagination: {
      el: ".swiper-pagination",
    },
    slidesPerView: "auto",
  });
  new Swiper(".projectSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
    slidesPerView: "auto",
  });
}

// 🚀 앱 초기화 실행
initApp();
