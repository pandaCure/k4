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
  useType: 'input' | 'range-picker'
}

export interface IHomeStateType {
  form: IFormItem[]
  currentOptId: string
  drawerStatus: boolean
  currentType?: 'input' | 'range-picker'
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
    updateCurrentOpt: Reducer<IHomeStateType>
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
      yield put({
        type: 'updateCurrentOpt',
        currentType: action.payload.props.type
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
    updateCurrentOpt(state = { ...pageCompose.state }, { currentOptId, drawerStatus, currentType }) {
      return {
        ...state,
        currentOptId: currentOptId ?? state.currentOptId,
        currentType: currentType ?? state.currentType,
        drawerStatus: drawerStatus ?? state.drawerStatus
      }
    }
  }
}
export default pageCompose
