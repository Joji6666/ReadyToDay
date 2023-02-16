import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const todosInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

const finishedTodosInitialState = {
  finishedTodos: [],
};

const finishedTodoSlice = createSlice({
  name: "finishedTodos",
  initialState: finishedTodosInitialState,
  reducers: {
    setFinishedTodos: (state, action) => {
      state.finishedTodos = action.payload;
    },
  },
});

const chatInitialState = {
  chat: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState: chatInitialState,
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload;
    },
  },
});

const chatBotInitialState = {
  chatBotChat: [],
};

const chatBotSlice = createSlice({
  name: "chatBotChat",
  initialState: chatBotInitialState,
  reducers: {
    setChatBotChat: (state, action) => {
      state.chatBotChat = action.payload;
    },
  },
});

const speechResultInitialState = {
  speechResult: "",
};

const speechResultSlice = createSlice({
  name: "speechResult",
  initialState: speechResultInitialState,
  reducers: {
    setSpeechResult: (state, action) => {
      state.speechResult = action.payload;
    },
  },
});

export const { setTodos } = todoSlice.actions;
export const { setChat } = chatSlice.actions;
export const { setChatBotChat } = chatBotSlice.actions;
export const { setSpeechResult } = speechResultSlice.actions;
export const { setFinishedTodos } = finishedTodoSlice.actions;

export default configureStore({
  reducer: {
    todos: todoSlice.reducer,
    chat: chatSlice.reducer,
    chatBotChat: chatBotSlice.reducer,
    speechResult: speechResultSlice.reducer,
    finishedTodos: finishedTodoSlice.reducer,
  },
});
