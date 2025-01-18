const sliderWrap = document.getElementById('carouselStory');
let currentX = 0;
let speed = 1;

function animate() {
  // 왼쪽으로 이동
  currentX -= speed;
  // 실제 한 세트의 너비 (첫 번째 UL 폭)
  const firstUl = sliderWrap.querySelector('.list-story');
  const firstUlWidth = firstUl.scrollWidth; 
  
  // 만약 한 세트 폭만큼 이동했다면, 다시 원점으로
  if (Math.abs(currentX) >= firstUlWidth) {
    currentX = 0;
  }
  // 적용
  sliderWrap.style.transform = `translateX(${currentX}px)`;
  
  requestAnimationFrame(animate);
}
animate();