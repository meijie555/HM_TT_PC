import myBreadcrumb from '@/components/my_Breadcrumb'
import myChannel from '@/components/channel'
export default {
  install (Vue) {
    Vue.component(myBreadcrumb.name, myBreadcrumb)
    Vue.component(myChannel.name, myChannel)
  }
}
