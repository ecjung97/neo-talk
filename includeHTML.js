function includeHTML(callback) {
  var z, i, elmnt, file, xhr;

  // 모든 HTML 요소를 루프 처리
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];

    // 'include-html' 속성을 가진 요소 찾기
    file = elmnt.getAttribute("include-html");
    if (file) {
      // HTTP 요청으로 파일 로드
      xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;

            // 동적으로 추가된 <script> 태그 실행
            var scripts = elmnt.getElementsByTagName("script");
            for (var j = 0; j < scripts.length; j++) {
              var newScript = document.createElement("script");
              newScript.text = scripts[j].text; // 내장된 JS 코드 복사
              if (scripts[j].src) {
                newScript.src = scripts[j].src; // 외부 JS 파일 링크 복사
              }
              document.head.appendChild(newScript); // 동적으로 <head>에 추가하여 실행
            }
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }

          // 'include-html' 속성 제거 후 재귀 호출
          elmnt.removeAttribute("include-html");
          includeHTML(callback);
        }
      };
      xhr.open("GET", file, true);
      xhr.send();
      return; // 요청이 처리되었으므로 함수 종료
    }
  }

  // 콜백 실행
  setTimeout(function () {
    if (callback) callback();
  }, 0);
}
