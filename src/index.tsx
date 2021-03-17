import React from 'react'
import dva from 'dva'
import { createBrowserHistory as createHistory } from 'history'
import reportWebVitals from './reportWebVitals'
import model from '@models/index'
import Root from '@pages/Root'

const app = dva({
  history: createHistory()
})
app.model(model)
// @ts-ignore
app.router((config) => <Root app={config.app} history={config.history} />)
app.start('#root')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
