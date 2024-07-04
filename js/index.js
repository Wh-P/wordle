let answer = "APPLE"; // 정답 단어

let index = 0; // 현재 글자 위치 인덱스
let attempts = 0; // 시도 횟수

let timer;

function appStart() {
  const displayGameOver = () => {
    // 게임 종료 메시지 표시
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다😊";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:45vh; left:40vw; background-color:black; width:200px; height:100px; color:white;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    // 다음 줄로 이동
    attempts += 1;
    index = 0;
  };

  const gameover = () => {
    // 게임 종료 처리
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    // 엔터 키 입력 시 동작
    let correctCount = 0; // 맞춘 글자 수
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputText = block.innerText;
      const answerText = answer[i];
      if (inputText === answerText) {
        block.style.background = "#6AAA64"; // 정답인 경우
        correctCount += 1;
      } else if (answer.includes(inputText)) {
        block.style.background = "#C9B458"; // 정답에 포함되지만 위치가 다른 경우
      } else {
        block.style.background = "#787C7E"; // 정답에 포함되지 않는 경우
      }
      block.style.color = "white";
    }
    if (correctCount === 5) {
      gameover(); // 5글자 모두 맞춘 경우 게임 종료
    } else if (attempts === 5) {
      gameover(); // 시도 횟수 6번인 경우 게임 종료
    } else {
      nextLine(); // 다음 줄로 이동
    }
  };

  const handleBackspace = () => {
    // 백스페이스 키 입력 시 동작
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };

  const handleKeyDown = (e) => {
    // 키 입력 처리
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") {
      handleBackspace();
    } else if (index === 5 && e.key === "Enter") {
      handleEnterKey();
    } else if (65 <= keyCode && keyCode <= 90 && index < 5) {
      thisBlock.innerText = key;
      index += 1;
    }
    console.log(e.keyCode, e.key);
  };

  const setTimer = () => {
    const startTime = new Date();

    const updateTimer = () => {
      const currentTime = new Date();
      const elapsedTime = new Date(currentTime - startTime);
      const minutes = elapsedTime.getMinutes().toString().padStart(2, "0");
      const seconds = elapsedTime.getSeconds().toString().padStart(2, "0");
      const timerDisplay = document.querySelector("#timer");
      timerDisplay.innerText = `${minutes}:${seconds}`;
    };

    timer = setInterval(updateTimer, 1000);
  };

  setTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
