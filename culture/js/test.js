const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const container = document.getElementsByClassName("container");
let page = 0; // 영역 포지션 초기값
const lastPage = container.length - 1; // 마지막 페이지

// 디폴트 기능 제거 - 스크롤
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
);

// scrollToTopBtn 클릭 시 페이지 맨 위로 이동
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
scrollToTopBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 앵커 동작 방지
  page = 0; // 페이지 초기화
  wrap.style.top = "0vh"; // 페이지 위치를 맨 위로 설정
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
  const goalUl = document.querySelector(".goal-ul");
  const neoImg = document.querySelector(".neo-img");

  // 초기 이미지 위치 설정
  if (neoImg) {
    const firstButton = document.querySelector(".goal-ul div button");
    if (firstButton) {
      const firstButtonRect = firstButton.getBoundingClientRect();
      neoImg.style.position = "absolute";
      neoImg.style.transition = "all 0.5s ease";
      neoImg.style.left = `${firstButtonRect.right - 300}%`; // 왼쪽으로 더 이동
      neoImg.style.top = `${firstButtonRect.top - 1500}%`; // top offset 조정
    }
  }

  // Prevent parent scrolling when mouse is over ul
  if (goalUl) {
    goalUl.addEventListener(
      "wheel",
      (event) => {
        const delta = event.deltaY;
        const contentHeight = goalUl.scrollHeight;
        const visibleHeight = goalUl.clientHeight;
        const scrollTop = goalUl.scrollTop;

        const scrollingUp = delta < 0;
        const scrollingDown = delta > 0;
        const atTop = scrollTop === 0;
        const atBottom = scrollTop + visibleHeight >= contentHeight;

        if ((scrollingUp && atTop) || (scrollingDown && atBottom)) {
          event.preventDefault();
        } else {
          goalUl.scrollTop += delta;
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }

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

      // Move neo-img to clicked button position
      if (neoImg) {
        const buttonRect = button.getBoundingClientRect();
        const goalUlRect = goalUl.getBoundingClientRect();
        const scrollOffset = goalUl.scrollTop;

        neoImg.style.left = `${buttonRect.right - 30}%`; // 왼쪽으로 더 이동
        neoImg.style.top = `${buttonRect.top + scrollOffset - 5}%`; // top offset 조정
      }

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

// section1 media-query
function updateMissionContent() {
  const missionContent = document.querySelector(".mission-content strong");
  missionContent.innerHTML =
    window.innerWidth <= 767
      ? "사람을 이해하는 기술로 <br /> 필요한 미래를 더 가깝게"
      : "사람을 이해하는 기술로<br />필요한 미래를 더 가깝게 만듭니다"; // 삼항 연산자 사용
}

// 초기 실행
updateMissionContent();

// 윈도우 리사이즈 이벤트 리스너
window.addEventListener("resize", updateMissionContent);

document.addEventListener("DOMContentLoaded", () => {
  const workUl = document.querySelector(".work-ul");
  const workItems = document.querySelectorAll(".work-ul li");
  let animationFrameId = null;
  let clonedItems = [];

  function initInfiniteScroll() {
    // Clear existing clones
    clonedItems.forEach((clone) => clone.remove());
    clonedItems = [];

    // Reset styles
    workUl.style.transform = "";

    // Only initialize if screen is wide enough
    if (window.innerWidth > 766) {
      // 태블릿/모바일 기준점
      // Clone items for infinite scroll
      workItems.forEach((item) => {
        const clone = item.cloneNode(true);
        workUl.appendChild(clone);
        clonedItems.push(clone);
      });

      // Calculate total width
      const itemWidth = workItems[0].offsetWidth;
      const totalWidth = itemWidth * workItems.length;

      // Set initial position at 20% from the left
      const containerWidth =
        document.querySelector(".work-container").offsetWidth;
      let currentPosition = containerWidth * 0.2;

      // Animation function
      function animate() {
        currentPosition -= 1;

        if (Math.abs(currentPosition) >= totalWidth) {
          currentPosition = -(containerWidth * 0.2);
        }

        workUl.style.transform = `translateX(${currentPosition}px)`;
        animationFrameId = requestAnimationFrame(animate);
      }

      // Start animation
      animate();
    }
  }

  // Handle resize events
  let resizeTimer;
  window.addEventListener("resize", () => {
    // Clear previous animation
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    // Debounce resize event
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initInfiniteScroll();
    }, 250);
  });

  // Initial setup
  initInfiniteScroll();
});

// Draggable element functionality
const draggableChild = document.querySelector(".draggable-child");
const parent = document.querySelector(".common_content");
const ulElement = document.querySelector(".left-ul");
const liItems = ulElement.querySelectorAll("li");
let isDragging = false;
let offsetX, offsetY;
let scrollThreshold = 100; // Threshold for opening the next li element

draggableChild.addEventListener("mousedown", (e) => {
  offsetX = e.clientX - draggableChild.offsetLeft;
  offsetY = e.clientY - draggableChild.offsetTop;
  isDragging = true;

  // Disable parent scrolling when dragging starts
  parent.style.overflow = "hidden";

  // Listen for mousemove and mouseup events
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  if (!isDragging) return;

  const x = e.clientX - offsetX;
  const y = e.clientY - offsetY;

  draggableChild.style.left = `${x}px`;
  draggableChild.style.top = `${y}px`;

  // Check if scrolling down the draggable content is enough to show next li
  const scrollDistance = Math.abs(y);
  revealLiBasedOnScroll(scrollDistance);
}

function onMouseUp() {
  isDragging = false;

  // Enable parent scrolling when dragging stops
  parent.style.overflow = "auto";

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

function revealLiBasedOnScroll(scrollDistance) {
  // Reveal next li item based on the scroll threshold
  liItems.forEach((li, index) => {
    if (scrollDistance > scrollThreshold * (index + 1)) {
      li.style.display = "block"; // Make the <li> visible
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const workContainer = document.querySelector(".work-container");
  const workUl = document.querySelector(".work-ul");

  // work-ul 내부에서 휠 이벤트 발생 시 부모로 전달
  workUl.addEventListener(
    "wheel",
    (e) => {
      // Prevent scrolling within work-ul
      e.preventDefault();
      // Scroll the parent container
      workContainer.scrollTop += e.deltaY;
    },
    { passive: false }
  );
});
