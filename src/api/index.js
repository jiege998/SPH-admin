//将product四个模块接口请求函数统一暴露
import * as trademark from './product/trademark'
import * as attr from './product/attr'
import * as sku from './product/sku'
import * as spu from './product/spu'

export default{
    trademark,
    attr,
    sku,
    spu
}