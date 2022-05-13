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