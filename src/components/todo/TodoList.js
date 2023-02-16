import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFinishedTodos, setTodos } from "../../store";
import TodoInput from "./TodoInput";
import "./todolist.css";

export default function TodoList() {
  const { todos } = useSelector((state) => state.todos);
  const { finishedTodos } = useSelector((state) => state.finishedTodos);
  const dispatch = useDispatch();

  //로컬스토리지
  const getTodos = window.localStorage.getItem("todos");
  const storageTodos = JSON.parse(getTodos);
  const getFinishTodos = window.localStorage.getItem("finishTodos");
  const storageFinishTodos = JSON.parse(getFinishTodos);

  useEffect(() => {
    if (getTodos) {
      dispatch(setTodos(storageTodos));
    }
    if (getFinishTodos) {
      dispatch(setFinishedTodos(storageFinishTodos));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("finishTodos", JSON.stringify(finishedTodos));
  }, [finishedTodos]);

  return (
    <>
      <div className="progress-box">
        {todos.length + finishedTodos.length > 0 ? (
          <>
            <h2 className="complete">달성</h2>
            <progress
              className="progressbar"
              value={finishedTodos.length}
              max={todos.length + finishedTodos.length}
            ></progress>
            {finishedTodos.length === todos.length + finishedTodos.length ? (
              <span className="complete-message">
                축하합니다. 오늘의 할 일을 다 완료했어요!
              </span>
            ) : null}
          </>
        ) : null}
      </div>
      <div className="todos-container">
        <div className="todo-wrap">
          <div className="unfinished-box">
            <h2>오늘의 할 일</h2>
            <div className="unfinished-todos">
              {todos.map((todo) => {
                return (
                  <li>
                    <input
                      onClick={async () => {
                        await dispatch(
                          setTodos(todos.filter((todos) => todos !== todo))
                        );

                        dispatch(setFinishedTodos([...finishedTodos, todo]));
                      }}
                      className="checkBox"
                      checked={false}
                      type="checkbox"
                    />
                    <span>{todo}</span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        dispatch(
                          setTodos(todos.filter((todos) => todos !== todo))
                        );
                      }}
                    >
                      ❌
                    </span>
                  </li>
                );
              })}
            </div>
          </div>

          <div className="finished-box">
            <h2>완료</h2>
            <div className="finished-todos">
              {finishedTodos.length > 0
                ? finishedTodos.map((todo) => {
                    return (
                      <li>
                        <input
                          className="checkBox"
                          type="checkbox"
                          checked
                          onClick={async () => {
                            await dispatch(setTodos([...todos, todo]));
                            dispatch(
                              setFinishedTodos(
                                finishedTodos.filter((todos) => todos !== todo)
                              )
                            );
                          }}
                        />
                        <span>{todo}</span>
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            dispatch(
                              setFinishedTodos(
                                finishedTodos.filter((todos) => todos !== todo)
                              )
                            );
                          }}
                        >
                          ❌
                        </span>
                      </li>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        <TodoInput />
      </div>
    </>
  );
}
