import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from "react-router-dom"
import 'antd/dist/antd.css'

import App from './App'
import { ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'


ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
