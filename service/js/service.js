document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".service_tab_btn");
  const contentDivs = document.querySelectorAll(".service_content");
  const allContentDiv = document.querySelector('[data-content="all"]');

  // 다른 모든 탭의 카드들을 '전체' 탭으로 복사
  function updateAllTab() {
    allContentDiv.innerHTML = ""; // 전체 탭 내용 초기화

    // 각 카테고리 탭의 카드들을 전체 탭으로 복사
    contentDivs.forEach((div) => {
      if (div.dataset.content !== "all") {
        // '전체' 탭 제외
        const cards = div.querySelectorAll(".service_card");
        cards.forEach((card) => {
          allContentDiv.appendChild(card.cloneNode(true));
        });
      }
    });
  }

  // 초기 로드 시 전체 탭 업데이트
  updateAllTab();

  // 탭 전환 이벤트
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.tab;

      // 탭 활성화
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 컨텐츠 표시
      contentDivs.forEach((div) => div.classList.remove("active"));
      document
        .querySelector(`[data-content="${category}"]`)
        .classList.add("active");
    });
  });
});
