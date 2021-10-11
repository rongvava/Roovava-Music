const Recommendation = () => import('views/recommendation/Recommendation')
const MusicListDetail = () => import('views/listdetail/MusicListDetail')
const routes = [
    {
        path: '/',
        component:Recommendation
    },
    {
        path: '/musiclistdetail/:id/:time',
        component:MusicListDetail
    }
]
export default routes