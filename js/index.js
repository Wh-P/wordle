let answer = "APPLE";

let index = 0;

let attemps = 0;

let timer;
function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다😊";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:45vh; left:40vw; background-color:black; width:200px; height:100px; color:white;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    attemps += 1;
    index = 0;
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    clearInterval(timer);
  };
  const handleEnterKey = () => {
    //엔터 입력시 나오는  i 의 횟수를 나타내는 함수
    let count = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attemps}${i}']`
      );
      const input_text = block.innerText;
      const answer_text = answer[i];
      console.log("입력한 글자", input_text, "정답", answer_text);
      if (input_text === answer_text) {
        block.style.background = "#6AAA64";
        count += 1;
      } else if (answer.includes(input_text))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }
    if (count === 5) {
      gameover();
    } else if (nextLine());
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attemps}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeyDown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attemps}${index}']`
    );

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
    console.log(e.keyCode, e.key);
  };

  const setTimer = () => {
    const cur_time = new Date();

    function setTime() {
      const times = new Date();
      const waste_time = new Date(times - cur_time); //시작시간에서 현재시간 빼주면 타이머처럼 흘러감.
      const min = waste_time.getMinutes().toString(); //getMinutes 뒤에 반드시 () 붙여주기!
      const sec = waste_time.getSeconds().toString();
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`; //padStart 는 string 화 시켜줘야 쓸수있음.
    }

    timer = setInterval(setTime, 1000);
  };

  setTimer();
  window.addEventListener("keydown", handleKeyDown);
}

appStart();
