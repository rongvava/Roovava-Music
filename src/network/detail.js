import {request} from "./request";
import {formatDate} from 'common/Utils'
//获取歌单详情 及该歌单下的歌曲列表id
export function getMusicListDetail(id) {
    return request({
        url: "/playlist/detail",
        params: {
            id
        }
    })
}
//获取歌曲详情
export function getSongDetail(...ids) {
    return request({
        url: `/song/detail?ids=${ids}`
    })
}
export class _getSongDetailImg {
    constructor(songs) {
        this.pic = songs.map(item => {
            return item.al
        })
        this.name = songs.map(item => {
            return item.name
        })
        this.album = songs.map(item => {
            return item.ar[0].name
        })
    }
}
//对歌曲数据进行封装
export class songDetail{
    constructor(songs) {
       this.time = songs.map(item => {
           return formatDate(new Date(item.dt),'mm:ss')
        })
        this.id = songs.map(item => {
            return item.id
        })
        this.name = songs.map(item => {
            return item.name
        })
        this.album = songs.map(item => {
            return item.ar[0].name
        })
        this.pic = songs.map(item => {
            return item.al.picUrl
        })
    }
}
//根据歌曲id请求url
export function getSongUrl(...id) {
    return request({
        url:`/song/url?id=${id}`
    })
}
// //获取歌曲详情
// export function getSongDetail(...id) {
//     return request({
//         url: `/song/detail?ids=${id}`
//     })
// }