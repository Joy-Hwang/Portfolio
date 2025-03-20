AOS.init();

const wrap = document.getElementById("main"); // 보일 영역
const container = document.getElementsByClassName("section");
let page = 0; // 영역 포지션 초기값
const lastPage = container.length - 1; // 마지막 페이지

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      page++;
    } else if (e.deltaY < 0) {
      page--;
    }
    if (page < 0) {
      page = 0;
    } else if (page > lastPage) {
      page = lastPage;
    }
    console.log(e.deltaY);
    wrap.style.top = page * -100 + "vh";
  },
  { passive: false }
); // 디폴트 기능 제거 - 스크롤

var piesiteFired = 0;
$(document).ready(function () {
  var $win = $(window),
    $win_height = $(window).height(),
    // - A multiple of viewport height - The higher this number the sooner triggered.
    windowPercentage = $(window).height() * 0.9;
  $win.on("scroll", scrollReveal);
  function scrollReveal() {
    var scrolled = $win.scrollTop();

    ///////////////////////////////////////
    // Horizontal Chart
    $(".chartBarsHorizontal .bar").each(function () {
      var $this = $(this),
        offsetTop = $this.offset().top;
      if (scrolled + windowPercentage > offsetTop || $win_height > offsetTop) {
        $(this).each(function (key, bar) {
          var percentage = $(this).data("percentage");
          $(this).css("width", percentage + "%");
          ///////////////////////////////////////
          //        Animated numbers
          $(this)
            .prop("Counter", 0)
            .animate(
              {
                Counter: $(this).data("percentage"),
              },
              {
                duration: 2000,
                easing: "swing",
                step: function (now) {
                  $(this).text(Math.ceil(now));
                },
              }
            );
          //        Animated numbers
          ///////////////////////////////////////
        });
      } else {
        ///////////////////////////////////////
        // To keep them triggered, lose this block.
        $(this).each(function (key, bar) {
          $(this).css("width", 0);
        });
      }
    });
  }
  scrollReveal();
});
