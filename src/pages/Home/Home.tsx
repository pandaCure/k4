import React from 'react'
import Right from '@pages/Right'
import Left from '@pages/Left'
import Center from '@pages/Center'
import styles from './home.module.scss'

export interface IHome {}

type Props = IHome

const Home = (props: Readonly<Props>) => {
  return (
    <div className={styles['home-page']}>
      <div className={styles['home-left']}>
        <Left />
      </div>
      <div className={styles['home-center']}>
        <Center />
      </div>
      <div className={styles['home-right']}>
        <Right />
      </div>
    </div>
  )
}
export default Home
