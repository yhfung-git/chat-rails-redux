import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './components/app';
import messagesReducer from './reducers/messages_reducer';

const chatContainer = document.getElementById('chat_app');

const initialState = {
  messages: [],
  channels: JSON.parse(chatContainer.dataset.channels).map(c => c.name)
};

const store = configureStore({
  reducer: {
    messages: messagesReducer,
    channels: (state = null, action) => state
  },
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(ReduxPromise),
});

const root = createRoot(chatContainer);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/channels/:channel" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
