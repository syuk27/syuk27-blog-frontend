import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'
import store from './store/index.js'
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)