import React, { useEffect, useMemo, useState } from 'react'
import { Form, FormCore, FormItem } from 'noform-json'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './center.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { reducerState } from '@src/models/reducer'
import GridLayout, { WidthProvider } from 'react-grid-layout'

export interface ICenter {}

type Props = ICenter
const WithGridLayout = WidthProvider(GridLayout)
const Center = (props: Readonly<Props>) => {
  const form = useSelector((state: reducerState) => state.home.form)
  const core = useMemo(() => {
    return new FormCore({
      autoValidate: true
    })
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    form.forEach((v) => v?.CpConfig?.defaultValue && core.setValue(v.name, v.CpConfig.defaultValue))
  }, [form, core])
  const handleEditFormItem = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.dataset)
    dispatch({
      type: 'home/updateCurrentOptId',
      currentOptId: e.currentTarget.dataset.handlerId,
      drawerStatus: true
    })
  }

  return (
    <div className={styles['center-page']}>
      <DndProvider backend={HTML5Backend}>
        <Form core={core} direction="vertical-top">
          {form.map(({ name, label, Cp, CpConfig, ItemConfig, id }) => (
            // <WithGridLayout cols={12} rowHeight={30}  width={1080}>
            <div data-handler-id={id} onClick={handleEditFormItem} key={id + Math.random()}>
              <FormItem className="common-form-body-item" name={name} label={label} inline {...ItemConfig}>
                {Cp && <Cp {...CpConfig} />}
              </FormItem>
            </div>
            // </WithGridLayout>
          ))}
        </Form>
      </DndProvider>
    </div>
  )
}
export default Center
