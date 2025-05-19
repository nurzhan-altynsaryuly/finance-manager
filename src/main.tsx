import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './api/store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

const container = document.getElementById("root");
if (!container) throw new Error("Root container not found");
const root = createRoot(container as HTMLElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
