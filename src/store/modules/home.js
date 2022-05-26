import mockRequest from '@/utils/mockRequest'
const state ={
    homeDate:[]
}
const mutations = {
    GETFDATE(state,data){
        state.homeDate = data
    }
}
const actions ={
 async getData({commit}){
    let res = await  mockRequest.get('/home/list')
    if(res.code == 200){
        commit('GETFDATE',res.data)
    }
  }
}
const getters ={}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}