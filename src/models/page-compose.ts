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
  id: string
}

export interface IHomeStateType {
  form: IFormItem[]
  currentOptId: string
  drawerStatus: boolean
}

export interface IPageCompose {
  namespace: 'home'
  state: IHomeStateType
  effects: {
    createFormItem: Effect
    handleEditEventEffect: Effect
  }
  reducers: {
    updateFormItem: Reducer<IHomeStateType>
    updateCurrentOptId: Reducer<IHomeStateType>
  }
  subscriptions: SubscriptionsMapObject
}

const pageCompose: IPageCompose = {
  namespace: 'home',

  state: {
    form: [],
    currentOptId: '',
    drawerStatus: false
  },

  effects: {
    *createFormItem(action, { put, select }) {
      const form = yield select((state: reducerState) => state.home.form)
      form.push(action.payload.props)
      yield put({
        type: 'updateFormItem',
        form: [...form]
      })
    },
    *handleEditEventEffect(action, { put, select }) {
      const form: IFormItem[] = yield select((state: reducerState) => state.home.form)
      const id = action.id
      let index = form.findIndex((f) => f.id === id)
      const item = {
        ...form[index],
        ...action
      }
      form.splice(index, 1, item)
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
    updateFormItem(state = { ...pageCompose.state }, { form }) {
      return { ...state, form }
    },
    updateCurrentOptId(state = { ...pageCompose.state }, { currentOptId, drawerStatus }) {
      return {
        ...state,
        currentOptId: currentOptId ?? state.currentOptId,
        drawerStatus: drawerStatus ?? state.drawerStatus
      }
    }
  }
}
export default pageCompose
