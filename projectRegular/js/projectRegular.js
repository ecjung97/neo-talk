console.log("temp")

// a 클릭 이벤트 막기
const click = document.querySelectorAll("a")
click.forEach((c) => {
  c.addEventListener("click", (e) => {
    e.preventDefault()
  })
})

// sound on/off
const soundControl = () => {
  const btnMute = document.querySelector(".btn-mute")
  const txtVideo = document.querySelector(".txt-video")
  const video = document.querySelector("video")

  btnMute.addEventListener("click", () => {
    video.muted = !video.muted

    if (video.muted) {
      txtVideo.classList.add("on")
      txtVideo.textContent = "ON"
    } else {
      txtVideo.classList.remove("on")
      txtVideo.textContent = "OFF"
    }
  })
}

// project-area 탭 활성화
const showProjectContent = () => {
  const tabLinks = document.querySelectorAll(".project-area .tab-link")
  const projectContents = document.querySelectorAll(".project-box")

  // 버튼 탭 클릭 이벤트
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", (e) => {
      e.preventDefault()

      // 모든 버튼에 활성화 클래스 제거
      tabLinks.forEach((tab) => {
        tab.classList.remove("on")
      })

      // 클릭한 버튼에 활성화 클래스 추가
      tabLink.classList.add("on")

      // 관련 컨텐츠 표시
      const targetTab = tabLink.dataset.tab // 클릭한 탭의 데이터 값
      projectContents.forEach((projectContent) => {
        // 클래스에 따라 컨텐츠 표시
        projectContent.style.display = projectContent.classList.contains(targetTab) ? "block" : "none"
      })
    })
  })
}

// help-area 컨텐츠 활성화
const showEduContent = () => {
  const tabLinks = document.querySelectorAll(".help-area .tab-link")
  const helpContents = document.querySelectorAll(".help-box")

  // 버튼 탭 클릭 이벤트
  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", (e) => {
      e.preventDefault()

      // 모든 버튼에 활성화 클래스 제거
      tabLinks.forEach((tab) => {
        tab.classList.remove("on")
      })

      // 클릭한 버튼에 활성화 클래스 추가
      tabLink.classList.add("on")

      // 관련 컨텐츠 표시
      const targetTab = tabLink.dataset.tab // 클릭한 탭의 데이터 값
      helpContents.forEach((helpContent) => {
        // 클래스에 따라 컨텐츠 표시
        helpContent.style.display = helpContent.classList.contains(targetTab) ? "flex" : "none"
      })
    })
  })
}

// help-area 화면사이즈에 따라 이미지 변경
const changeHelpImg = () => {
  const helpImgs = document.querySelectorAll(".help-img")
  console.log("선택", helpImgs)

  // 화면 크기에 따라 이미지 변경
  const changeImg = () => {
    helpImgs.forEach((helpImg, index) => {
      if (window.innerWidth > 767 && window.innerWidth < 1023) {
        if (index === 0) {
          helpImg.src = "https://t1.kakaocdn.net/thumb/C630x354.fwebp.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Fkakaocorp%2Fkakaocorp%2Fservice%2Fdangol%2Fimg_help01_768.png"
        } else if (index === 1) {
          helpImg.src = "https://t1.kakaocdn.net/thumb/C630x354.fwebp.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Fkakaocorp%2Fkakaocorp%2Fservice%2Fdangol%2Fimg_help02_768.png"
        } else if (index === 2) {
          helpImg.src = "https://t1.kakaocdn.net/thumb/C630x354.fwebp.q100/?fname=https%3A%2F%2Ft1.kakaocdn.net%2Fkakaocorp%2Fkakaocorp%2Fservice%2Fdangol%2Fimg_help03_768.png"
        }
      }
    })
  }

  // 화면 크기에 따라 이미지 변경
  changeImg()

  // 화면 크기 변화 감지
  window.addEventListener("resize", changeImg)
}

// news area 화면 사이즈에 따라 보여질 뉴스 개수 변경
const showNewsCount = () => {
  document.addEventListener("DOMContentLoaded", function () {
    // 카드 뉴스 리스트
    const listItems = document.querySelectorAll(".news-card-list > li")

    // maxShowCount 변수 선언
    let maxShowCount

    // 화면 크기별 보이는 항목 개수를 설정하는 함수

    const showCountItems = () => {
      // 화면 크기 확인
      const width = window.innerWidth

      console.log("현재 화면 크기:", width)
      console.log("보여야 할 항목 개수:", maxShowCount)

      // 화면 크기별 보이는 항목 개수 설정
      if (width >= 1024) {
        maxShowCount = 3 // 1024 이상에서는 3개 보이기
      } else if (width >= 768) {
        maxShowCount = 2 // 768 이상 1024 미만에서는 2개 보이기
      } else {
        maxShowCount = 3 // 768 미만에서는 3개 보이기
      }

      console.log("보여야 할 항목 개수:", maxShowCount)

      // 설정된 개수만큼만 보이도록 설정 show 클래스 추가/삭제
      listItems.forEach((item, index) => {
        // 각 항목에 대해 인덱스가 maxShowCount보다 작으면 'show' 클래스를 추가
        if (index < maxShowCount) {
          item.classList.add("show") // 'show' 클래스를 추가하여 보이도록 설정
          console.log(`항목 ${index + 1} 보이기`)
          console.log("maxShowCount", maxShowCount)
        } else {
          item.classList.remove("show") // 'show' 클래스를 제거하여 숨김
          console.log(`항목 ${index + 1} 숨기기`)
          console.log("maxShowCount", maxShowCount)
        }
      })
    }

    // 처음 로딩 시 레이아웃 업데이트
    showCountItems()

    // 윈도우 크기 변경 시마다 레이아웃 업데이트
    window.addEventListener("resize", showCountItems)
  })
}

const showAllNews = () => {
  const btnMore = document.querySelector(".btn-more")
  const listItems = document.querySelectorAll(".news-card-list > li")

  btnMore.addEventListener("click", () => {
    listItems.forEach((item) => {
      item.classList.add("show")
      btnMore.classList.add("hide")
    })
  })
}

// news area 공유하기 버튼 클릭 이벤트
const showShareNews = () => {
  const btnShares = document.querySelectorAll(".btn-share")
  const shareLayers = document.querySelectorAll(".layer-share")

  // 공유하기 버튼 클릭 이벤트
  btnShares.forEach((btnShare) => {
    btnShare.addEventListener("click", () => {
      // 클릭된 버튼과 관련된 shareLayer 만 표시
      const associatedLayer = btnShare.closest(".item-card-new").querySelector(".layer-share")

      // 모든 shareLayer 숨기기
      shareLayers.forEach((shareLayer) => {
        shareLayer.style.display = "none"
      })

      // 해당 버튼에 연결된 shareLayer만 보이게 설정
      if (associatedLayer) {
        associatedLayer.style.display = "block"
      }
    })
  })
}

const closeShareNews = () => {
  const btnCloses = document.querySelectorAll(".btn-close")

  btnCloses.forEach((btnClose) => {
    btnClose.addEventListener("click", () => {
      const shareLayer = btnClose.closest(".layer-share")
      shareLayer.style.display = "none"
    })
  })
}

soundControl()
showProjectContent()
showEduContent()
changeHelpImg()
showShareNews()
closeShareNews()
showNewsCount()
showAllNews()
