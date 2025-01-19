document.addEventListener("DOMContentLoaded", () => {
  includeHTML();
});

const wrap = document.getElementsByClassName("wrap")[0]; // 보일 영역
const container = document.getElementsByClassName("container");
let page = 0; // 영역 포지션 초기값
const lastPage = container.length - 1; // 마지막 페이지

// let scrollEnabled = false; // 기본 스크롤 허용 여부
// window.addEventListener(
//   "wheel",
//   (e) => {
//     if (!scrollEnabled) {
//       e.preventDefault(); // 기본 스크롤 막음

//       if (e.deltaY > 0) {
//         page++;
//       } else if (e.deltaY < 0) {
//         page--;
//       }

//       if (page < 0) {
//         page = 0;
//       } else if (page > lastPage) {
//         page = lastPage;
//         scrollEnabled = true; // 마지막 페이지에 도달하면 기본 스크롤 허용
//       }

//       console.log(`DeltaY: ${e.deltaY}, Current Page: ${page}`);
//       wrap.style.top = page * -100 + "vh";
//     }
//   },
//   { passive: false }
// );

// scrollToTopBtn 클릭 시 페이지 맨 위로 이동
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
scrollToTopBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 기본 앵커 동작 방지
  page = 0; // 페이지 초기화

  // 부드럽게 페이지 맨 위로 이동
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 부드러운 스크롤 동작 설정
  });
});

// section1 media-query
function updateMissionContent() {
  const missionContent = document.querySelector(".mission-content strong");
  missionContent.innerHTML =
    window.innerWidth <= 767
      ? "사람을 이해하는 기술로 <br /> 필요한 미래를 더 가깝게"
      : "사람을 이해하는 기술로<br />필요한 미래를 더 가깝게 만듭니다";
}

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
  let currentIndex = 0;
  let isScrolling = false;
  let isFirstItemCollapsed = false;
  let isLastItemExpanded = false;

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

  function expandItem(index) {
    const items = document.querySelectorAll(".goal-ul li");
    if (index >= 0 && index < items.length) {
      const targetLi = items[index];
      const targetDiv = targetLi.querySelector("div");
      const targetSpan = targetDiv.querySelector("span");
      const targetButton = targetDiv.querySelector("button");

      // Reset all items
      items.forEach((li) => {
        const div = li.querySelector("div");
        const span = div.querySelector("span");
        li.style.height = "";
        div.style.backgroundColor = "";
        div.style.alignItems = "center";
        if (span) span.style.display = "none";
      });

      // Expand target item
      targetLi.style.height = "300px";
      targetDiv.style.backgroundColor = colors[index % colors.length];
      targetDiv.style.alignItems = "flex-start";
      if (targetSpan) targetSpan.style.display = "block";

      // Move neo-img
      if (neoImg && targetButton) {
        const buttonRect = targetButton.getBoundingClientRect();
        const goalUlRect = goalUl.getBoundingClientRect();
        const scrollOffset = goalUl.scrollTop;

        neoImg.style.left = `${buttonRect.right - 30}%`;
        neoImg.style.top = `${buttonRect.top + scrollOffset - 5}%`;
      }

      // Update scroll control flags
      isLastItemExpanded = index === items.length - 1;
      isFirstItemCollapsed = index > 0;
    }
  }

  // Handle wheel event on goalUl
  goalUl.addEventListener(
    "wheel",
    (e) => {
      if (isScrolling) return;

      const items = document.querySelectorAll(".goal-ul li");

      // Allow parent scroll only when scrolling down at last item or up at first item
      if (
        (e.deltaY > 0 && !isLastItemExpanded) ||
        (e.deltaY < 0 && isFirstItemCollapsed)
      ) {
        e.preventDefault();

        // Determine scroll direction
        if (e.deltaY > 0 && currentIndex < items.length - 1) {
          // Scrolling down
          currentIndex++;
        } else if (e.deltaY < 0 && currentIndex > 0) {
          // Scrolling up
          currentIndex--;
        }

        isScrolling = true;
        expandItem(currentIndex);

        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrolling = false;
        }, 500);
      }
    },
    { passive: false }
  );

  // Keep existing button click handlers
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;
      expandItem(index);
    });
  });
});

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
      // Clone items twice to ensure smooth infinite scroll
      for (let i = 0; i < 2; i++) {
        workItems.forEach((item) => {
          const clone = item.cloneNode(true);
          workUl.appendChild(clone);
          clonedItems.push(clone);
        });
      }

      // Calculate dimensions
      const itemWidth = workItems[0].offsetWidth;
      const totalWidth = itemWidth * workItems.length;
      const containerWidth =
        document.querySelector(".work-container").offsetWidth;
      let currentPosition = containerWidth * 0.2;

      // Animation function
      function animate() {
        currentPosition -= 1;

        // Reset position when first set of items has scrolled past
        if (Math.abs(currentPosition) >= totalWidth) {
          currentPosition += totalWidth;
        }

        workUl.style.transform = `translateX(${currentPosition}px)`;
        animationFrameId = requestAnimationFrame(animate);
      }

      // Start animation
      animate();
    }
  }

  // Initialize on load
  initInfiniteScroll();

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    resizeTimer = setTimeout(() => {
      initInfiniteScroll();
    }, 250);
  });

  // // Optional: Pause animation on hover
  // workUl.addEventListener("mouseenter", () => {
  //   if (animationFrameId) {
  //     cancelAnimationFrame(animationFrameId);
  //   }
  // });

  // workUl.addEventListener("mouseleave", () => {
  //   initInfiniteScroll();
  // });
});
