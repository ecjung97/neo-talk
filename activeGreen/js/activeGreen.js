document.addEventListener("DOMContentLoaded", function () {
  // 모달 관련 요소
  const modal = document.getElementById("transformModal");
  const modalButtons = document.querySelectorAll("[data-modal-type]");
  const closeButton = document.querySelector(".activeGreen_modal_close");
  const modalContents = document.querySelectorAll(".activeGreen_modal_inner");

  // 각주 시스템 - 통합된 로직
  function handleFootnoteNavigation(e) {
    e.preventDefault();
    const footnoteId = this.dataset.footnote;

    // 현재 클릭된 요소가 각주 버튼인지 참조 링크인지 확인
    const isFootnoteButton = this.classList.contains("btn_footnote");

    // 타겟 요소 찾기 (버튼이 클릭되면 링크를, 링크가 클릭되면 버튼을 찾음)
    const targetSelector = isFootnoteButton
      ? `.activeGreen_reference_link[data-footnote="${footnoteId}"]`
      : `.btn_footnote[data-footnote="${footnoteId}"]`;
    const targetElement = document.querySelector(targetSelector);

    if (targetElement) {
      // 스크롤 이동
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        targetElement.style.backgroundColor = "";
      }, 1000);
    }
  }

  // 각주 버튼과 참조 링크에 이벤트 리스너 추가
  document
    .querySelectorAll(".btn_footnote, .activeGreen_reference_link")
    .forEach((element) => {
      element.addEventListener("click", handleFootnoteNavigation);
    });

  // 플러스 버튼 클릭시 모달 열기
  modalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalType = this.getAttribute("data-modal-type");

      // 모든 모달 컨텐츠 숨기기
      modalContents.forEach((content) => {
        content.style.display = "none";
      });

      // 선택된 모달 컨텐츠만 보이기
      const targetContent = document.querySelector(
        `[data-modal-content="${modalType}"]`
      );
      if (targetContent) {
        targetContent.style.display = "block";
      }

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // 닫기 버튼 클릭시 모달 닫기
  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "";
  });

  // 모달 외부 클릭시 닫기
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  });
});

// 새 창 열기 함수
function openNewWindow(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}
