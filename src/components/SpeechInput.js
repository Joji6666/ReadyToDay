import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import speaking from "../images/speaking.png";
import "./speechInput.css";

export default function SpeechInput(props) {
  const dispatch = useDispatch();

  //Speech Api
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  const checkBrowser = () => {
    if (!recognition) {
      alert("해당 브라우저에서는 지원하지 않습니다. Chrome을 이용해주세요.");
    }
  };

  useEffect(() => {
    checkBrowser();
    recognition.lang = "ko-KR" || "en-US"; // 사용 할 언어
    recognition.interimResults = false; // 인식 된 결과 값 확인 false로 작성할 시 최종 인식 값만 받음
    recognition.continuous = false; // true로 설정 할 경우 익식된 문장을 하나로 합쳐줌
    recognition.maxAlternatives = 1;
  }, []);

  //SpeechSynthesis

  const speechAddChat = async () => {
    await recognition.start(); // 음성 듣기 시작

    //음성 인식 결과 값
    recognition.onresult = async (e) => {
      const text = e.results[0][0].transcript;
      await props.setSpeechResult(text);

      dispatch(props.setState([...props.state, text]));
    };
  };

  return (
    <>
      <button className="speaking-btn" onClick={speechAddChat}>
        <img className="speaking-icon" src={speaking} />
        음성 인식
      </button>
    </>
  );
}
