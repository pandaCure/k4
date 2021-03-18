import React, { useCallback } from 'react'
import styles from './left.module.scss'
import { Button, Input } from 'antd'
import { useDispatch } from 'react-redux'
export interface ILeft {}

type Props = ILeft
const randomNameFun = (size: number) => {
  const strArr = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.split('')
  let str = ''
  for (let i = 0; i < size; i++) {
    str += strArr[Math.floor(Math.random() * strArr.length)]
  }
  return str
}
const Left = (props: Readonly<Props>) => {
  const dispatch = useDispatch()
  const createInput = useCallback(() => {
    const randomName = randomNameFun(7)
    dispatch({
      type: 'home/createFormItem',
      payload: {
        type: 'input',
        props: {
          Cp: Input,
          name: randomName,
          label: randomName,
          id: String(Math.random())
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
