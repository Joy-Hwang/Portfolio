function initApp() {
  AOS.init({
    duration: 1000,
    once: true,
  });

  initHeaderScroll();
  initNav();
  initSmoothScroll();
  initFullPageScroll();
  initProgressBar();
  initTabs();
  initSwiper();
}

// ⭐ 1. 헤더 스크롤 시 스타일 변경
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) {
    console.error("Error: #header element not found!");
    return;
  }

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
      navLinkEl.classList.toggle("active", navLinkEl.hash === `#${currentSection}`);
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

// ⭐ 4. 전체 페이지 스크롤 제어 (마우스 휠 & 키보드 & 터치 지원)
function initFullPageScroll() {
  const sections = document.querySelectorAll(".section");
  let isScrolling = false;
  let currentIndex = 0;
  let lastScrollTime = 0;

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isScrolling = true;

    sections[index].scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }

  // 마우스 휠 스크롤 이벤트
  window.addEventListener(
    "wheel",
    (event) => {
      const now = new Date().getTime();
      if (isScrolling || now - lastScrollTime < 800) return;

      currentIndex += event.deltaY > 0 ? 1 : -1;
      scrollToSection(currentIndex);
      lastScrollTime = now;
    },
    { passive: false }
  );

  // 키보드 방향키 이벤트
  window.addEventListener("keydown", (event) => {
    if (isScrolling) return;
    if (event.key === "ArrowDown") currentIndex++;
    else if (event.key === "ArrowUp") currentIndex--;

    scrollToSection(currentIndex);
  });

  // 터치패드(트랙패드) 지원
  let touchStartY = 0;
  window.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0].clientY;
  });
  window.addEventListener("touchmove", (event) => {
    if (isScrolling) return;
    let deltaY = touchStartY - event.touches[0].clientY;

    if (Math.abs(deltaY) > 50) {
      currentIndex += deltaY > 0 ? 1 : -1;
      scrollToSection(currentIndex);
    }
  });
}

// ⭐ 5. 프로그레스 바 애니메이션 (jQuery 필요)
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

// ⭐ 6. 탭 기능 초기화
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

// ⭐ 7. Swiper 슬라이드 초기화
function initSwiper() {
  new Swiper(".workSwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
  });
}

// 🚀 앱 초기화 실행
initApp();
