import React, { Suspense } from 'react'
import { DvaInstance, routerRedux } from 'dva'
import { History } from 'history'
import RouteRender from '@routes/RouteRender'
import routes from '@src/routes'
import { Switch, Route, Router } from 'dva/router'
import { ConfigProvider, DatePicker, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import 'antd/dist/antd.css'
import 'noform-json/dist/index.css'
import 'nowrapper-json/dist/antd/index.css'

export interface IRoot {
  app: DvaInstance
  history: History
}

moment.locale('zh-cn')
type Props = IRoot
const { ConnectedRouter } = routerRedux
const Root = (props: Readonly<Props>) => {
  const { history } = props
  return (
    <Suspense fallback="loading">
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Router history={history}>
            <RouteRender routes={routes} />
          </Router>
        </ConnectedRouter>
      </ConfigProvider>
    </Suspense>
  )
}
export default Root
