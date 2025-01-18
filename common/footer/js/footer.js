document.addEventListener("DOMContentLoaded", function () {
  let isAccordionEnabled = false;

  function setupAccordion() {
    const columns = document.querySelectorAll(".activeGreen_footer_column");

    columns.forEach((column) => {
      const title = column.querySelector(".activeGreen_footer_title");
      const content = column.querySelector("ul");

      function handleClick(e) {
        if (!isAccordionEnabled) return;

        e.preventDefault();

        title.classList.toggle("active");
        content.classList.toggle("active");

        columns.forEach((otherColumn) => {
          if (otherColumn !== column) {
            const otherTitle = otherColumn.querySelector(
              ".activeGreen_footer_title"
            );
            const otherContent = otherColumn.querySelector("ul");
            otherTitle.classList.remove("active");
            otherContent.classList.remove("active");
          }
        });
      }

      title.addEventListener("click", handleClick);
    });
  }

  function enableAccordion() {
    isAccordionEnabled = true;
  }

  function disableAccordion() {
    isAccordionEnabled = false;
    const titles = document.querySelectorAll(".activeGreen_footer_title");
    const contents = document.querySelectorAll(".activeGreen_footer_column ul");

    titles.forEach((title) => title.classList.remove("active"));
    contents.forEach((content) => content.classList.remove("active"));
  }

  function handleResize() {
    if (window.innerWidth <= 1024) {
      enableAccordion();
    } else {
      disableAccordion();
    }
  }

  setupAccordion();
  handleResize();

  window.addEventListener("resize", handleResize);
});
