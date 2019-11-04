import myBreadcrumb from '@/components/my_Breadcrumb'
import myChannel from '@/components/channel'
import myImage from '@/components/myImage'
export default {
  install (Vue) {
    Vue.component(myBreadcrumb.name, myBreadcrumb)
    Vue.component(myChannel.name, myChannel)
    Vue.component(myImage.name, myImage)
  }
}
