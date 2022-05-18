import request from '@/utils/request'

//获取sku
export const reqSkuList=(page,limit)=>request({
    url:`/admin/product/list/${page}/${limit}`
})
//上架
export const reqSale = (skuId)=>request({
    url:`/admin/product/onSale/${skuId}`
})
//下架
export const reqCancelSale = (skuId)=>request({
    url:`/admin/product/cancelSale/${skuId}`
})
//sku详情
export const reqSkuById  = (skuId)=>request({
    url:`admin/product/getSkuById/${skuId}`
})
export const reqDeleteSKu = (skuId)=>request({
    url:`admin/product/deleteSku/${skuId}`
})