import React from 'react'
import { Effect, EffectsCommandMap, Model, SubscriptionsMapObject } from 'dva'
import { AnyAction, Reducer } from 'redux'
import { FormItemProps } from 'noform-json/lib/component/FormItem'
import { reducerState } from './reducer'

interface IFormItem {
  label: string
  name: string
  Cp: React.ElementType
  CpConfig: {
    [key: string]: any
  }
  ItemConfig: FormItemProps
}

export interface IHomeStateType {
  form: IFormItem[]
}

export interface IPageCompose {
  namespace: 'home'
  state: IHomeStateType
  effects: {
    createFormItem: Effect
  }
  reducers: {
    updateFormItem: Reducer<IHomeStateType>
  }
  subscriptions: SubscriptionsMapObject
}

const pageCompose: IPageCompose = {
  namespace: 'home',

  state: {
    form: []
  },

  effects: {
    *createFormItem(action, { put, select }) {
      const form = yield select((state: reducerState) => state.home.form)
      form.push(action.payload.props)
      yield put({
        type: 'updateFormItem',
        form: [...form]
      })
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  reducers: {
    updateFormItem(state, { form }) {
      return { ...state, form }
    }
  }
}
export default pageCompose
