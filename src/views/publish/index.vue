<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>{{$route.query.id?'修改文章' : '发布文章'}}</my-Breadcrumb>
      </div>
      <el-form label-width="120px">
        <el-form-item label="标题:">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 封面图片组件 -->
          <div v-if="articleForm.cover.type===1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type===3">
            <my-image v-model="articleForm.cover.images[index-1]" v-for="index of 3" :key="index"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button type="primary" @click="updata(false)">修改</el-button>
          <el-button @click="updata(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="published(false)">发布</el-button>
          <el-button @click="published(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 富文本组件
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']
          ]
        }
      },
      // 文章id
      articleId: null
    }
  },
  methods: {
    // 点击发布还是存入草稿
    async published (draft) {
      await this.$axios.post(`articles?draft=${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发布成功')
      this.$router.push('/article')
    },
    // 文章列表
    async getArticles (id) {
      const {
        data: { data }
      } = await this.$axios.get(`articles/${id}`)
      this.articleForm = data
    },
    // 点击修改
    async updata (draft) {
      await this.$axios.put(
        `articles/${this.articleForm.id}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    }
  },
  created () {
    const articleId = this.$route.query.id
    if (articleId) {
      // 面包屑修改
      // 内容填充
      this.getArticles(articleId)
    }
  },
  // 监听路由参数
  watch: {
    '$route.query.id': function (newVal, oldVal) {
      if (newVal) {
        // 填充列表
        this.getArticles()
      } else {
        // 重置列表
        this.articleForm = {
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
</style>
