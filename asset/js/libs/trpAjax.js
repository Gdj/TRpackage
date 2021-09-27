
/*
* trpReadTextFile : 텍스트 파일 읽기
* $file           : 불러올 파일 경로
* $callback       : 불러와서 실행될 함수
*/
function trpReadTextFile($file, $callback) {
  var readFile = new XMLHttpRequest();
    readFile.overrideMimeType("application/json");
    readFile.open("GET", $file, true);
    readFile.onreadystatechange = function() {
    if (readFile.readyState === 4 && readFile.status == "200") {
      $callback(readFile.responseText);
    }
  }
  readFile.send(null);
}