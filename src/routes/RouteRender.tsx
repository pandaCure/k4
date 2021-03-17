import React from 'react'
import { Switch, Route } from 'dva/router'

export interface IRouteOptions {
  exact?: boolean
  path: string
  routes?: IRouteOptions[]
  component: React.ElementType
}

interface IRouteRender {
  routes: IRouteOptions[]
}

type Props = IRouteRender
const RouteRender = (props: Readonly<Props>) => {
  const { routes } = props
  return (
    <Switch>
      {routes.map((route) => {
        return (
          <Route
            exact={route.exact}
            path={route.path}
            render={(props) => <route.component routes={route.routes} {...props} />}
            key={route.path}
          />
        )
      })}
    </Switch>
  )
}
export default RouteRender
