function initApp() {
  modiFullpage();
  initTabs();
  initSwiper();
}

function modiFullpage() {
  $("#fullpage").fullpage({
    autoScrolling: true,
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: ["HOME", "ABOUT", "SKILLS", "WORKS", "CONTACT"],
    // touchSensitivity: 15, // 터치 민감도 조정 (0~100)
    responsiveWidth: 701, // 특정 너비 이상에서만 fullpage.js 사용
    // responsiveHeight: 700, // 특정 높이 이상에서만 fullpage.js 사용
    afterRender: function () {
      $(".logo a").on("click", function (e) {
        e.preventDefault();
        $.fn.fullpage.moveTo(1); // 첫 번째 섹션으로 이동
        $("body").addClass("fp-viewing-0");
      });
    },
    // afterLoad 이벤트: 섹션이 로드되면 실행
    afterLoad: function (anchorLink, index) {
      // 섹션이 3번째 (index 3)일 때만 애니메이션 실행 (예: .section--skills)
      if (index === 3) {
        revealBars();
      }
    },
  });
}

function revealBars() {
  $(".chartBarsHorizontal .bar").each(function () {
    var $this = $(this);
    if ($this.data("animated")) return;
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
        complete: function () {
          // 애니메이션 완료 후 data-animated 속성을 추가
          $this.data("animated", true);
        },
      }
    );
  });
}

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

function initSwiper() {
  new Swiper(".experienceSwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,
    spaceBetween: 30,
  });
  new Swiper(".projectSwiper", {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: "auto",
  });
}

initApp();
