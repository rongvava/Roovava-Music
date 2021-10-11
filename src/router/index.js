import { createRouter, createWebHistory } from 'vue-router'
import routes from "./routes";

// /**解决router重复报错 */
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
