/** 全局的类型定义文件 */

type Key = string | number | Array

/** 查询卡片 */
interface QueryCard {
  title?: string
  icon?: string
  type?: 'input' | 'select' | 'date-picker' | 'rank' | 'cascader'
  /** 传递给element组件的属性 */
  attrs?: object
  /** card 样式 */
  style?: CSSProperties
  props?: object
  /** select 类型才有 options 属性 */
  options?: Array<{ label: string, value: string }>
  /** 组件绑定值 */
  value?: Key
  /** 组件占位比例 */
  span?: number
  //  对比卡片用
  titleRender?: (scope: QueryCard) => VNode
  itemRender?: (scope: QueryCard) => VNode
  isMultiple?: boolean
  filterMethod?: Function
  remoteMethod?: Function
  change?: Function
}
