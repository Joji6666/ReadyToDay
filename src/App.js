import React from "react";
import ChatBot from "./components/chatbot/ChatBot";
import TodoList from "./components/todo/TodoList";
import Weather from "./components/weather/Weather";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Ready To Day</h1>
      <Weather />
      <TodoList />
      <ChatBot />
    </div>
  );
}

export default App;
