import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChat, setChatBotChat } from "../../store";
import { Configuration, OpenAIApi } from "openai";
import SpeechInput from "../SpeechInput";
import "./chatbot.css";
import me from "../../images/businessman.png";
import bot from "../../images/robot.png";
import mute from "../../images/silent.png";
import voiceOn from "../../images/sound.png";
import { handelKeyPress } from "../../utils/enterkeypress";
import ThreeBot from "../three/ThreeBot";

export default function ChatBot() {
  const dispatch = useDispatch();
  const { chat } = useSelector((state) => state.chat);
  const { chatBotChat } = useSelector((state) => state.chatBotChat);
  const chatInputRef = useRef(null);
  const scrollRef = useRef();
  const [speakSwich, setSpeakSwich] = useState(true);
  const [speechResult, setSpeechResult] = useState("");
  const APIKEY = process.env.REACT_APP_OPEN_AI_KEY;

  const getChat = window.localStorage.getItem("chat");
  const storageChat = JSON.parse(getChat);
  const getChatBotChat = window.localStorage.getItem("chatBotChat");
  const storageChatBotChat = JSON.parse(getChatBotChat);
  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  const sendChat = async () => {
    await dispatch(setChat([...chat, chatInputRef.current.value]));
    await chatBot(chatInputRef.current.value);

    chatInputRef.current.value = "";
  };

  //Open Ai chatGpt Api
  const configuration = new Configuration({
    apiKey: APIKEY,
  });
  const openai = new OpenAIApi(configuration);

  const chatBot = (text) => {
    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: text,
        temperature: 0.7,
        max_tokens: 610,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then(async (data) => {
        console.log(data.data.choices[0].text);
        const result = data.data.choices[0].text;
        await dispatch(setChatBotChat([...chatBotChat, result]));
        if (speakSwich) {
          //SppechSynthesis Api
          const speakSpeech = new SpeechSynthesisUtterance(result);
          // resulit에 담긴 text를 voice로 읽어준다.
          speechSynthesis.speak(speakSpeech);
        }
      })
      .catch(() => {
        console.log("통신실패");
        dispatch(setChatBotChat([...chatBotChat, "통신 실패"]));
      });
  };

  useEffect(() => {
    if (getChat) {
      dispatch(setChat(storageChat));
    }
    if (getChatBotChat) {
      dispatch(setChatBotChat(storageChatBotChat));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("chat", JSON.stringify(chat));
    scrollToBottom();
  }, [chat]);

  useEffect(() => {
    window.localStorage.setItem("chatBotChat", JSON.stringify(chatBotChat));
    scrollToBottom();
  }, [chatBotChat]);

  useEffect(() => {
    if (speechResult === "") {
      return;
    } else {
      chatBot(speechResult);
    }
  }, [speechResult]);

  return (
    <div className="chatbot-template">
      <div ref={scrollRef} className="chatbot-container">
        <div className="chat-area">
          <div className="threebot">
            <ThreeBot />
          </div>

          {chat.map((contents, index) => {
            return (
              <>
                <div className="chat-box">
                  <div className="chat-content">
                    <img src={me} />
                    <span>{contents}</span>
                  </div>
                </div>
                {/* chatBotChat 배열에 index에 해당하는 값이 존재할 경우 봇 메시지를 화면에 표시 */}
                {chatBotChat[index] && (
                  <div className="chatBotChat-box">
                    <div className="chatbot-content">
                      {/* chatBotChat 배열에 index에 해당하는 값 */}
                      <span>{chatBotChat[index]}</span>
                      <img src={bot} />
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="form-box">
        <input
          onKeyPress={(e) => {
            handelKeyPress(e, sendChat);
          }}
          id="chatInput"
          ref={chatInputRef}
          type="text"
        ></input>

        <button className="send-btn" onClick={sendChat}>
          작성
        </button>
        <SpeechInput
          setState={setChat}
          state={chat}
          setSpeechResult={setSpeechResult}
        />
        <button
          className="speaking-btn"
          onClick={() => {
            setSpeakSwich(!speakSwich);
            console.log(speakSwich);
          }}
        >
          {speakSwich ? (
            <>
              <img className="mute-icon" src={mute} />
              챗봇 음성 끄기
            </>
          ) : (
            <>
              <img className="voice-icon" src={voiceOn} /> 챗봇 음성 켜기{" "}
            </>
          )}
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            window.localStorage.removeItem("chat");
            window.localStorage.removeItem("chatBotChat");
            dispatch(setChat([]));
            dispatch(setChatBotChat([]));
          }}
        >
          초기화
        </button>
      </div>
    </div>
  );
}
