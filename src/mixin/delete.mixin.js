import Vue from 'vue'
Vue.mixin({
  methods:{
    deleteMsg(message) {
      return new Promise((resolve,reject)=>{
        this.$confirm(message, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      })
    }
  }
})