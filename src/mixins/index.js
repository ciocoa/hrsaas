const mixin = {
  data() {
    /** 值只能为英文字符 */
    const checkCode = (rule, value, callback) => {
      if (/^[A-Za-z]+$/g.test(value)) callback()
      else callback(new Error('值只能为英文字符'))
    }
    /** 密码必须为 6-18 位字母、数字 */
    const checkPwd = (rule, value, callback) => {
      if (/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) callback()
      else callback(new Error('密码必须为 6-18 位字母、数字'))
    }
    /** QQ号格式校验 */
    const checkQq = (rule, value, callback) => {
      if (/^[0-9]+$/g.test(value)) callback()
      else callback(new Error('QQ号格式错误'))
    }
    /** 手机号格式校验 */
    const checkPhone = (rule, value, callback) => {
      if (/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) callback()
      else callback(new Error('手机号格式错误'))
    }
    /** 邮箱格式校验 */
    const checkEmail = (rule, value, callback) => {
      if (/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/.test(value)) callback()
      else callback(new Error('邮箱格式错误'))
    }
    /** 身份证格式校验 */
    const checkID = (rule, value, callback) => {
      if (/\d{17}[\d|x]|\d{15}/.test(value)) callback()
      else callback(new Error('身份证格式错误'))
    }
    /** 值为大于 0 的整数 */
    const upZeroInt = (rule, value, callback) => {
      if (/^\+?[1-9]\d*$/.test(value)) callback()
      else callback(new Error('值必须为大于 0 的整数'))
    }
    /** 值为大于 0 的整数，且可以为空值 */
    const upZeroIntCanNull = (rule, value, callback) => {
      if (!value) callback()
      else {
        if (/^\+?[1-9]\d*$/.test(value)) callback()
        else callback(new Error('值必须为大于 0 的整数'))
      }
    }

    return {
      formRules: {
        notNull: [{ required: true, message: '该字段不能为空', trigger: 'blur' }],
        notNullChange: [{ required: true, message: '该字段不能为空', trigger: 'change' }],
        length14: [
          { required: true, message: '该字段不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '1-4 个字符', trigger: 'blur' }
        ],
        checkPwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码至少 6 个字符', trigger: 'blur' }
          // { validator: checkPwd, trigger: 'blur' }
        ],
        checkPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        upZeroInt: [{ validator: upZeroInt, trigger: 'blur' }],
        upZeroIntCanNull: [{ validator: upZeroIntCanNull, trigger: 'blur' }]
      }
    }
  }
}

export default mixin
