/**
 *
 *  This is used to trigger the page exit
 *
 */

export default function TriggerPageExit() {
  document.querySelectorAll(".page").forEach((page) => {
    page.style.overflowY = "hidden";
    page.style.pointerEvents = "none";
    // page.style.opacity = 0;
    // page.style.visibility = "hidden";
  });

  setTimeout(() => {
    if (document.querySelector(".page-fade")) {
      document.querySelectorAll(".page-fade").forEach((fade) => {
        fade.style.opacity = 0;
      });
    }
  }, 600);

  setTimeout(() => {
    if (document.querySelector(".fade-up")) {
      document.querySelectorAll(".fade-up").forEach((fade) => {
        fade.style.transform = "translateY(-50px)";

        setTimeout(() => {
          fade.style.opacity = 0;
        }, 100);
      });
    }
  }, 600);

  setTimeout(() => {
    if (document.querySelector(".fade-down")) {
      document.querySelectorAll(".fade-down").forEach((fade) => {
        fade.style.transform = "translateY(50px)";

        setTimeout(() => {
          fade.style.opacity = 0;
        }, 100);
      });
    }
  }, 600);

  setTimeout(() => {
    if (document.querySelector(".fade-left")) {
      document.querySelectorAll(".fade-left").forEach((fade) => {
        fade.style.transform = "translateX(-50px)";

        setTimeout(() => {
          fade.style.opacity = 0;
        }, 100);
      });
    }
  }, 600);

  setTimeout(() => {
    if (document.querySelector(".fade-right")) {
      document.querySelectorAll(".fade-right").forEach((fade) => {
        fade.style.transform = "translateX(50px)";

        setTimeout(() => {
          fade.style.opacity = 0;
        }, 100);
      });
    }
  }, 600);
}
