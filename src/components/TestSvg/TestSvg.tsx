import React from 'react'
import styles from './testSvg.module.scss'

export interface ITestSvg {
  strokeWidth: number
  strokeColor: string
  percent: number
}

type Props = ITestSvg

function getSome(strokeWidth: number, strokeColor: string, percent: number) {
  const radius = 50 - strokeWidth / 2
  let beginPositionX = 0
  let beginPositionY = -radius
  let endPositionX = 0
  let endPositionY = -2 * radius
  const gapDegree = 0
  const offset = 0
  const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
   a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
   a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`
  const len = Math.PI * 2 * radius

  const pathStyle = {
    stroke: strokeColor,
    strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
    strokeDashoffset: `-${gapDegree / 2 + (offset / 100) * (len - gapDegree)}px`,
    transition:
      'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s' // eslint-disable-line
  }
  return {
    pathString,
    pathStyle
  }
}

const TestSvg = (props: Readonly<Props>) => {
  const { strokeWidth = 20, strokeColor = 'red', percent = 100 } = props
  const a = getSome(20, 'red', 90)
  const b = getSome(20, 'green', 80)
  return (
    <div className={styles['testSvg-page']}>
      <svg viewBox="0 0 100 100">
        <path d={a.pathString} style={a.pathStyle} fillOpacity="0" strokeLinecap="round" />
        <path d={b.pathString} style={b.pathStyle} fillOpacity="0" strokeLinecap="round" />
      </svg>
    </div>
  )
}
export default TestSvg
