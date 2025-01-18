console.log("temp");

// script.js
document.addEventListener("DOMContentLoaded", () => {
  const section1 = document.getElementById("s1");
  const section2 = document.getElementById("s2");
  const section3 = document.getElementById("s3");
  const section4 = document.getElementById("s4");

  let isScrolling = false;

  window.addEventListener("wheel", (event) => {
    if (!isScrolling) {
      isScrolling = true;

      if (event.deltaY > 0) {
        // 아래로 스크롤
        if (
          window.scrollY >= section1.offsetTop &&
          window.scrollY < section2.offsetTop
        ) {
          section2.scrollIntoView({ behavior: "smooth" });
        } else if (
          window.scrollY >= section2.offsetTop &&
          window.scrollY < section3.offsetTop
        ) {
          section3.scrollIntoView({ behavior: "smooth" });
        } else if (
          window.scrollY >= section3.offsetTop &&
          window.scrollY < section4.offsetTop
        ) {
          section4.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // 위로 스크롤
        if (
          window.scrollY < section2.offsetTop &&
          window.scrollY >= section1.offsetTop
        ) {
          section1.scrollIntoView({ behavior: "smooth" });
        } else if (
          window.scrollY < section3.offsetTop &&
          window.scrollY >= section2.offsetTop
        ) {
          section2.scrollIntoView({ behavior: "smooth" });
        } else if (
          window.scrollY < section4.offsetTop &&
          window.scrollY >= section3.offsetTop
        ) {
          section3.scrollIntoView({ behavior: "smooth" });
        }
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }

    // 기본 스크롤 동작 방지
    event.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 페이지가 로드될 때 스크롤을 맨 위로 이동
  window.scrollTo(0, 0);
  const links = document.querySelectorAll(".left-ul li");
  const sections = document.querySelectorAll("section");

  // 초기 상태로 첫 번째 섹션에 active 클래스 설정
  links[0].classList.add("active");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // 섹션이 50% 이상 보일 때 활성화
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const link = document.querySelector(
        `.left-ul li a[href="#${entry.target.id}"]`
      );

      if (entry.isIntersecting) {
        // 현재 섹션이 보일 때 active 클래스 추가
        links.forEach((item) => item.classList.remove("active"));
        link.parentElement.classList.add("active");
      } else {
        // 현재 섹션이 보이지 않을 때 active 클래스 제거
        link.parentElement.classList.remove("active");
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".goal-ul div button");
  const colors = ["#FAC6AC", "#FFE596", "#C7FBC4", "#B7ECFF"];

  // 초기에 모든 div 가운데 정렬 및 span 숨기기
  document.querySelectorAll(".goal-ul div").forEach((div) => {
    const span = div.querySelector("span");
    if (span) {
      span.style.display = "none";
    }
    div.style.alignItems = "center";
  });

  // 첫 번째 li를 펼친 상태로 초기화
  const firstLi = document.querySelector(".goal-ul li");
  if (firstLi) {
    const firstDiv = firstLi.querySelector("div");
    const firstSpan = firstDiv.querySelector("span");

    firstLi.style.height = "300px";
    firstDiv.style.backgroundColor = colors[0];
    firstDiv.style.alignItems = "flex-start";
    if (firstSpan) {
      firstSpan.style.display = "block";
    }
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const li = button.closest("li");
      const div = button.parentElement;
      const span = div.querySelector("span");

      // 다른 모든 li 초기화
      document.querySelectorAll(".goal-ul li").forEach((otherLi) => {
        if (otherLi !== li) {
          otherLi.style.height = "";
          const otherDiv = otherLi.querySelector("div");
          otherDiv.style.backgroundColor = "";
          otherDiv.style.alignItems = "center";
          const otherSpan = otherDiv.querySelector("span");
          if (otherSpan) {
            otherSpan.style.display = "none";
          }
        }
      });

      // 현재 클릭된 요소 스타일 적용
      const colorIndex = index % colors.length;
      div.style.backgroundColor = colors[colorIndex];
      div.style.alignItems = "flex-start";
      li.style.height = "300px";
      if (span) {
        span.style.display = "block";
      }
    });
  });
});
