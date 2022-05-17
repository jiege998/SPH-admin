import request from '@/utils/request'

export const reqSpuList = (page,limit,category3Id)=> request({
    url:`admin/product/${page}/${limit}`,
    method:'get',
    params:{category3Id}
})
export const reqSpu = (spuId)=> request({
    url:`admin/product/getSpuById/${spuId}`,
    method:'get',
})
export const reqtradeMark = ()=> request({
    url:`admin/product/baseTrademark/getTrademarkList`,
    method:'get',
})
export const reqSpuImage = (spuId)=> request({
    url:`admin/product/spuImageList/${spuId}`,
    method:'get',
})

export const reqBaseSaleAttrList = ()=> request({
    url:`admin/product/baseSaleAttrList`,
    method:'get',
})

//修改或者添加spu
export const reqAddOrUpdateSpu=(spuInfo)=>{
    if(spuInfo.id){
      return  request({
            url:'/admin/product/updateSpuInfo',
            data:spuInfo,
            method:'post'
        })
    }else{
        return  request({
            url:'/admin/product/saveSpuInfo',
            data:spuInfo,
            method:'post'
        })
    }
}
export const reqDeleteSpu = (spuId) =>request({
    url:`/admin/product/deleteSpu/${spuId}`,
    method:'delete'
})
//获取图片接口
export const reqSpuImageList = (spuId)=>request({
    url:`/admin/product/spuImageList/${spuId}`
})
//获取销售属性
export const reqSpuSaleAttrList  = (spuId)=>request({
    url: `/admin/product/spuSaleAttrList/${spuId}`
})
//获取平台属性
export const reqAttrInfoList=(categroy1Id,categroy2Id,categroy3Id)=>request({
    url:`/admin/product/attrInfoList/${categroy1Id}/${categroy2Id}/${categroy3Id}`
})
//添加sku
export const reqAddSku = (skuInfo)=>request({
    url:'/admin/product/saveSkuInfo',
    data:skuInfo,
    method:'post'
})
//获取sku列表
export const reqSkuList = (spuId) =>request({
    url:`/admin/product/findBySpuId/${spuId}`
})