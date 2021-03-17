import React, { useMemo } from 'react'
import { Form, FormCore, FormItem } from 'noform-json'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './center.module.scss'
import { useSelector } from 'react-redux'
import { reducerState } from '@src/models/reducer'

export interface ICenter {}

type Props = ICenter
const Center = (props: Readonly<Props>) => {
  const core = useMemo(() => {
    return new FormCore({
      autoValidate: true
    })
  }, [])
  const form = useSelector((state: reducerState) => state.home.form)

  const handleEditFormItem = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.currentTarget.dataset)
  }

  return (
    <div className={styles['center-page']}>
      <DndProvider backend={HTML5Backend}>
        <Form core={core} direction="vertical-top">
          {form.map(({ name, label, Cp, CpConfig, ItemConfig }) => (
            <div key={name + Math.random()} data-handler-id={name} onClick={handleEditFormItem}>
              <FormItem className="common-form-body-item" name={name} label={label} inline {...ItemConfig}>
                {Cp && <Cp {...CpConfig} />}
              </FormItem>
            </div>
          ))}
        </Form>
      </DndProvider>
    </div>
  )
}
export default Center
