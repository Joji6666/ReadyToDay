import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFinishedTodos, setTodos } from "../../store";
import { handelKeyPress } from "../../utils/enterkeypress";
import SpeechInput from "../SpeechInput";
import "./todolist.css";

export default function TodoInput() {
  const todoInputRef = useRef(null);
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [speechResult, setSpeechResult] = useState("");

  const addTodo = async () => {
    await dispatch(setTodos([...todos, todoInputRef.current.value]));
    todoInputRef.current.value = "";
  };

  useEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <div className="input-box">
        <input
          onKeyPress={(e) => {
            handelKeyPress(e, addTodo);
          }}
          className="text-input"
          ref={todoInputRef}
          type="text"
        ></input>
        <button className="send-btn" onClick={addTodo}>
          작성
        </button>
        <SpeechInput
          setState={setTodos}
          state={todos}
          setSpeechResult={setSpeechResult}
        />
        <button
          className="clear-btn"
          onClick={() => {
            window.localStorage.removeItem("todos");
            window.localStorage.removeItem("finishTodos");

            dispatch(setTodos([]));
            dispatch(setFinishedTodos([]));
          }}
        >
          초기화
        </button>
      </div>
    </>
  );
}
