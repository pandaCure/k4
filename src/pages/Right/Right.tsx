import React, { useMemo, useState } from 'react'
import { Drawer, Button, Input } from 'antd'
import styles from './right.module.scss'
import { Form, FormCore, FormItem } from 'noform-json'

export interface IRight {}

type Props = IRight
const Right = (props: Readonly<Props>) => {
  const [showDrawer, setShowDrawer] = useState(true)
  const footer = useMemo(() => {
    return (
      <div
        style={{
          textAlign: 'right'
        }}
      >
        <Button onClick={() => setShowDrawer(false)} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={() => setShowDrawer(false)} type="primary">
          确认
        </Button>
      </div>
    )
  }, [])
  const core = useMemo(() => {
    return new FormCore({
      autoValidate: true
    })
  }, [])
  // TODO: 默认值类型
  /**
   * 0、i 分为默认值区 ii 常规区
   * 1、当前选中的类型，调用对应的Hook，将返回值存到redux，经过center渲染出来
   * 2、怎么写文件
   */

  const form = useMemo(() => {
    return [
      {
        name: '名字',
        label: 'name',
        Cp: Input,
        CpConfig: {},
        ItemConfig: {
          required: true
        }
      },
      {
        name: '值',
        label: 'value',
        Cp: Input,
        CpConfig: {},
        ItemConfig: {
          required: true
        }
      }
    ]
  }, [])
  return (
    <div className={styles['right-page']}>
      <Drawer visible={showDrawer} footer={footer} title="编辑" onClose={() => setShowDrawer(false)}>
        <Form core={core} direction="vertical-top">
          {form.map(({ name, label, Cp, CpConfig, ItemConfig }) => (
            <div key={name + Math.random()} data-handler-id={name}>
              <FormItem className="common-form-body-item" name={name} label={label} inline {...ItemConfig}>
                {Cp && <Cp {...CpConfig} />}
              </FormItem>
            </div>
          ))}
        </Form>
      </Drawer>
    </div>
  )
}
export default Right
