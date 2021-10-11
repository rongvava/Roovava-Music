import { createStore } from 'vuex'
import { getSongUrl } from 'network/detail'

export default createStore({
  state: {
    songsList:{},  //歌曲列表
  },
  mutations: {
    addSongList(state,playload) {
      state.songsList = playload
        console.log(state.songsList)
    }
  },
  actions: {
   async _getSongUrl(context,playload) {
      const res = await getSongUrl(playload)
       context.commit('addSongList',res.data)
    }

  },
  modules: {
  }
})
