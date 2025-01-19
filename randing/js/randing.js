 // 전역 변수
 let currentX = 0;           // translateX 값
 let speed = 1;             // 이동 속도
 let isSliding = false;      // 슬라이딩 상태 (true=움직임, false=멈춤)
 let animationFrameId = null;

 const sliderWrap = document.getElementById('carouselStory');
 const button = document.querySelector('.carousel-control');

 // (1) 애니메이션 함수
 function animate() {
   if (!isSliding) {
     // 멈춘 상태라면 더 이상 진행하지 않음
     return;
   }

   currentX -= speed;

   // 첫 번째 UL 찾기
   const firstUl = sliderWrap.querySelector('.list-story');
   const firstUlWidth = firstUl.scrollWidth;

   // 한 세트 폭만큼 이동하면 0으로 되돌림
   if (Math.abs(currentX) >= firstUlWidth) {
     currentX = 0;
   }

   // 이동 적용
   sliderWrap.style.transform = `translateX(${currentX}px)`;

   // 다음 프레임 요청
   animationFrameId = requestAnimationFrame(animate);
 }

 // (2) 버튼 클릭 시 슬라이드 토글
 button.addEventListener('click', () => {
   if (!isSliding) {
     // 슬라이드 시작
     isSliding = true;
  
     // 중복 실행 방지 위해 기존 프레임 취소
     cancelAnimationFrame(animationFrameId);
     animationFrameId = requestAnimationFrame(animate);
   } else {
     // 슬라이드 멈춤
     isSliding = false;
  
     // 멈추면 다음 프레임에서 animate()가 종료됨
     cancelAnimationFrame(animationFrameId);
   }
 });




// window.addEventListener("scroll", () => {
//   const banner = document.querySelector(".banner");
//   const bannerHeight = banner.offsetHeight; // 배너 높이

//   // 스크롤 위치가 배너 높이의 10% 이상일 때 변경
//   if (window.scrollY > bannerHeight * 0.1) {
//     banner.classList.add("resize");
//   } else {
//     banner.classList.remove("resize");
//   }
// });

window.addEventListener("scroll", () => {
  const banner = document.querySelector(".banner");
  const titleContainer = document.querySelector(".title-continer");
  const scrollNavWrap = document.querySelector(".scrollNavWrap");
  const bannerHeight = banner.offsetHeight; // 배너 높이

  // 스크롤 위치가 배너 높이의 10% 이상일 때 변경
  if (window.scrollY > bannerHeight * 0.1) {
    banner.classList.add("resize");

    // 타이틀 컨테이너 숨김
    titleContainer.style.opacity = "0";
    titleContainer.style.transform = "translateY(-20px)";
    titleContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    // 스크롤 내비게이션 숨김
    scrollNavWrap.style.opacity = "0";
    scrollNavWrap.style.transform = "translateY(-20px)";
    scrollNavWrap.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  } else {
    banner.classList.remove("resize");

    // 타이틀 컨테이너 표시
    titleContainer.style.opacity = "1";
    titleContainer.style.transform = "translateY(0)";
    titleContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    // 스크롤 내비게이션 표시
    scrollNavWrap.style.opacity = "1";
    scrollNavWrap.style.transform = "translateY(0)";
    scrollNavWrap.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  }
});
