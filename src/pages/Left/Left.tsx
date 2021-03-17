import React, { useCallback } from 'react'
import styles from './left.module.scss'
import { Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
export interface ILeft {}

type Props = ILeft
const Left = (props: Readonly<Props>) => {
  const dispatch = useDispatch()
  const createInput = useCallback(() => {
    dispatch({
      type: 'home/createFormItem',
      payload: {
        type: 'input',
        props: {
          Cp: Input,
          name: 'dadnaj',
          label: 'asjdbnaks'
        }
      }
    })
  }, [])
  return (
    <div className={styles['left-page']}>
      <Button onClick={createInput}>创建input</Button>
    </div>
  )
}
export default Left
