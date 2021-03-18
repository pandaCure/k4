import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, Button, Input, Radio } from 'antd'
import styles from './right.module.scss'
import { Form, FormCore, FormItem } from 'noform-json'
import { useDispatch, useSelector } from 'react-redux'
import { reducerState } from '@models/reducer'
import { FormItemProps } from 'noform-json/lib/component/FormItem'

const { Group } = Radio

export interface IRight {}

type Props = IRight
const Right = (props: Readonly<Props>) => {
  const drawerStatus = useSelector((state: reducerState) => state.home.drawerStatus)
  const currentOptId = useSelector((state: reducerState) => state.home.currentOptId)
  const form = useSelector((state: reducerState) => state.home.form)
  const handleDrawerStatus = () => {
    dispatch({
      type: 'home/updateCurrentOptId',
      drawerStatus: false
    })
  }
  const baseCore = useMemo(() => {
    return new FormCore({
      autoValidate: true
    })
  }, [])
  const itemCore = useMemo(() => {
    return new FormCore({
      autoValidate: true
    })
  }, [])
  const configCore = useMemo(() => {
    return new FormCore({
      autoValidate: true
    })
  }, [])
  const oldId = useRef('')
  useEffect(() => {
    if (oldId.current !== currentOptId) {
      oldId.current = currentOptId
      baseCore.reset()
      configCore.reset()
      itemCore.reset()
    }
    const formItem = form.find((v) => v.id === currentOptId)
    if (formItem) {
      baseCore.setValues({
        name: formItem.name,
        label: formItem.label
      })
      configCore.setValues(formItem.CpConfig)
      itemCore.setValues(formItem.ItemConfig)
    }
  }, [currentOptId, form, baseCore, configCore, itemCore])
  const dispatch = useDispatch()
  const handleErr = async (core: FormCore) => {
    const err = await core.validate()
    if (err) {
      baseCore.scrollToError()
      return false
    }
    return true
  }
  const handleEditEvent = useCallback(async () => {
    const err = await Promise.all([handleErr(baseCore), handleErr(itemCore), handleErr(configCore)])
    if (!err.every((v) => v)) {
      return handleDrawerStatus()
    }
    const { name, label } = baseCore.getValues()
    await dispatch({
      type: 'home/handleEditEventEffect',
      name,
      label,
      id: currentOptId,
      CpConfig: configCore.getValues(),
      ItemConfig: itemCore.getValues()
    })
    handleDrawerStatus()
  }, [currentOptId])
  const footer = useMemo(() => {
    return (
      <div
        style={{
          textAlign: 'right'
        }}
      >
        <Button onClick={handleDrawerStatus} style={{ marginRight: 8 }}>
          取消
        </Button>
        <Button onClick={handleEditEvent} type="primary">
          确认
        </Button>
      </div>
    )
  }, [handleEditEvent])

  // TODO: 默认值类型
  /**
   * 0、i 分为默认值区 ii 常规区
   * 1、当前选中的类型，调用对应的Hook，将返回值存到redux，经过center渲染出来
   * 2、怎么写文件
   * 3、右边的配置项怎么动态生成 写脚本分析AST 根据注释去生成？？？
   */

  const formBase = useMemo(() => {
    return [
      {
        name: 'label',
        label: '表单项名称',
        Cp: Input,
        CpConfig: {
          placeholder: '请输入表单项名称'
        },
        ItemConfig: {
          required: true
        }
      },
      {
        name: 'name',
        label: '表单项值',
        Cp: Input,
        CpConfig: {
          placeholder: '请输入表单项值'
        },
        ItemConfig: {
          required: true
        }
      }
    ]
  }, [])
  const formItemConfig = useMemo(() => {
    return [
      {
        name: 'required',
        label: '是否必填',
        Cp: Group,
        ItemConfig: {
          required: true
        },
        CpConfig: {
          options: [
            { label: '是', value: true },
            { label: '否', value: false }
          ]
        }
      }
    ]
  }, [])
  const componentConfig = useMemo<any[]>(() => {
    return [
      {
        name: 'defaultValue',
        label: '默认值',
        Cp: Input,
        CpConfig: {
          placeholder: '请输入默认值'
        }
      }
    ]
  }, [])
  return (
    <div className={styles['right-page']}>
      <Drawer visible={drawerStatus} footer={footer} title="编辑" onClose={handleDrawerStatus}>
        <h3>基础信息设置</h3>
        <Form core={baseCore} direction="vertical-top">
          {formBase.map(({ name, label, Cp, CpConfig, ItemConfig }) => (
            <div key={name + Math.random()} data-handler-id={name}>
              <FormItem className="common-form-body-item" name={name} label={label} inline {...ItemConfig}>
                {Cp && <Cp {...CpConfig} />}
              </FormItem>
            </div>
          ))}
        </Form>
        <h3>表单信息设置</h3>
        <Form core={itemCore} direction="vertical-top">
          {formItemConfig.map(({ name, label, Cp, CpConfig, ItemConfig }) => (
            <div key={name + Math.random()} data-handler-id={name}>
              <FormItem className="common-form-body-item" name={name} label={label} inline {...ItemConfig}>
                {Cp && <Cp {...CpConfig} />}
              </FormItem>
            </div>
          ))}
        </Form>
        {!!componentConfig.length && (
          <>
            <h3>表单信息设置</h3>
            <Form core={configCore} direction="vertical-top">
              {componentConfig.map(({ name, label, Cp, CpConfig, ItemConfig }) => (
                <div key={name + Math.random()} data-handler-id={name}>
                  <FormItem className="common-form-body-item" name={name} label={label} inline {...ItemConfig}>
                    {Cp && <Cp {...CpConfig} />}
                  </FormItem>
                </div>
              ))}
            </Form>
          </>
        )}
      </Drawer>
    </div>
  )
}
export default Right
