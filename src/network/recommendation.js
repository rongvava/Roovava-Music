import { request } from './request'
//获取轮播图数据
export function getBannerList(type) {
    return request({
        url:'banner',
        params:{
            type
        }
    })
}
//推荐歌单
export function getPersonalized(limit) {
    return request({
        url: "/personalized",
        params: {
            limit
        }
    })
}
//独家放送
export function getPrivatecontent() {
    return request({
        url: "/personalized/privatecontent"
    })
}
//最新音乐
export function getNewSong() {
    return request({
        url: '/personalized/newsong',
    })
}