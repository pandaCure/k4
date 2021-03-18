import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Drawer, Button, Input, Radio } from 'antd'
import styles from './right.module.scss'
import { Form, FormCore, FormItem } from 'noform-json'
import { useDispatch, useSelector } from 'react-redux'
import { reducerState } from '@models/reducer'
import { FormItemProps } from 'noform-json/lib/component/FormItem'
import { NextDatePicker } from 'nowrapper-json/lib/antd'
import axios from 'axios'

const { Group } = Radio

export interface IRight {}

type Props = IRight
export const REQUIRE_VALIDATOR = {
  required: true,
  message: '必填'
}
const Right = (props: Readonly<Props>) => {
  const drawerStatus = useSelector((state: reducerState) => state.home.drawerStatus)
  const currentOptId = useSelector((state: reducerState) => state.home.currentOptId)
  const form = useSelector((state: reducerState) => state.home.form)
  const currentType = useSelector((state: reducerState) => state.home.currentType)
  const dispatch = useDispatch()
  const handleDrawerStatus = useCallback(() => {
    dispatch({
      type: 'home/updateCurrentOpt',
      drawerStatus: false
    })
  }, [dispatch])
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
  const handleErr = useCallback(
    async (core: FormCore) => {
      const err = await core.validate()
      if (err) {
        baseCore.scrollToError()
        return false
      }
      return true
    },
    [baseCore]
  )
  const handleEditEvent = useCallback(async () => {
    const err = await Promise.all([handleErr(baseCore), handleErr(itemCore), handleErr(configCore)])
    if (!err.every((v) => !!v)) {
      return false
    }
    const { name, label } = baseCore.getValues()
    await dispatch({
      type: 'home/handleEditEventEffect',
      name,
      label,
      id: currentOptId,
      CpConfig: configCore.getValues(),
      ItemConfig: itemCore.getValues(),
      useType: currentType
    })
    await axios.post('http://localhost:8888/create', form)
    handleDrawerStatus()
  }, [baseCore, configCore, currentOptId, currentType, dispatch, form, handleDrawerStatus, handleErr, itemCore])
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
  }, [handleDrawerStatus, handleEditEvent])

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
          placeholder: '请输入表单项名称',
          style: {
            width: '100%'
          }
        },
        ItemConfig: {
          required: true,
          validateConfig: [REQUIRE_VALIDATOR],
          layout: {
            label: 24,
            control: 24
          }
        }
      },
      {
        name: 'name',
        label: '表单项值',
        Cp: Input,
        CpConfig: {
          placeholder: '请输入表单项值',
          style: {
            width: '100%'
          }
        },
        ItemConfig: {
          required: true,
          validateConfig: [REQUIRE_VALIDATOR],
          layout: {
            label: 24,
            control: 24
          }
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
          required: true,
          validateConfig: [REQUIRE_VALIDATOR],
          layout: {
            label: 24,
            control: 24
          }
        },
        CpConfig: {
          options: [
            { label: '是', value: true },
            { label: '否', value: false }
          ],
          style: {
            width: '100%'
          }
        }
      }
    ]
  }, [])
  const componentConfig = useMemo<any[]>(() => {
    return [
      currentType === 'input' && {
        name: 'defaultValue',
        label: '默认值',
        Cp: Input,
        CpConfig: {
          placeholder: '请输入默认值'
        }
      },
      currentType === 'range-picker' && {
        name: 'defaultValue',
        label: '默认值',
        Cp: NextDatePicker.RangePicker
      }
    ].filter(Boolean)
  }, [currentType])
  console.log(componentConfig)
  console.log(currentType)
  return (
    <div className={styles['right-page']}>
      <Drawer
        visible={drawerStatus}
        footer={footer}
        title="编辑"
        onClose={handleDrawerStatus}
        mask={false}
        style={{ width: '450px' }}
      >
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
