//品牌管理数据模块接口
import request from '@/utils/request'
// 获取品牌列表数据接口

export const reqTradeMark = (page,limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'GET'
})
//添加品牌

export const reqAddOrUpdateTradeMark = (tradeMark) =>{
    if(tradeMark.id){
        return request({
            url:'/admin/product/baseTrademark/update',
            method:'PUT',
            data:tradeMark
        })
    }else{
        return request({
            url:'/admin/product/baseTrademark/save',
            method:'POST',
            data:tradeMark
        })
    }
}

//删除品牌
export const reqDeleteTradeMark = (id)=>request({
    url:`/admin/product/baseTrademark/remove/${id}`,
    method:'delete',
})