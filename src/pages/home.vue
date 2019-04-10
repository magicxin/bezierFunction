<template>
  <div class="home">
    <canvas ref="ctx" width="568" height="320" @mousedown="clickAble" @mousemove="drag" @mouseup="drop"></canvas>
    <div class="toolbar">
      <div class="left">
        <el-button type="primary" round @click="insert">insert</el-button>
        <el-button type="info" round @click="deleteCurve">delete</el-button>
      </div>
      <div class="right">
        <!--<el-button type="primary" round @click="print">print</el-button>-->
        <el-button type="primary" round @click="photo">photo</el-button>
        <el-button type="info" round @click="setting">setting</el-button>
      </div>
    </div>
    <el-card class="aside" v-show="showSetting">
      <div slot="header" class="aside-header .clearfix">
        <span>属性修改</span>
        <el-button class="card-btn" type="text" @click="closeAside">关闭</el-button>
      </div>
      <div class="aside-item">
        <span>线宽：</span>
        <el-input class="aside-input" v-model="lineWidth" placeholder="请输入线宽"></el-input>
      </div>
      <div class="aside-item">
        <span>线色：</span>
        <el-input class="aside-input" v-model="color" placeholder="请输入线的颜色"></el-input>
      </div>
      <div class="aside-item">
        <span>圆色：</span>
        <el-input class="aside-input" v-model="roundColor" placeholder="请输入圆的颜色"></el-input>
      </div>
      <div class="aside-item">
        <span>半径：</span>
        <el-input class="aside-input" v-model="roundSize" placeholder="请输入圆的半径"></el-input>
      </div>
    </el-card>
    <el-input class="pannel" type="textarea" :autosize="{ minRows: 12, maxRows: 12}" readonly
      placeholder="请输入内容" :value="JSON.stringify(curves)"></el-input>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        ctx: '',
        canvas: '',
        firstPoint: [
          [0, 30],
          [100, 50],
          [150, 30]
        ],
        points: [
          [200, 200],
          [300, 300]
        ],
        curves: [],
        dragPoint: '',
        canDrag: false,
        lineWidth: '2',
        color: 'yellow',
        roundColor: 'red',
        roundSize: '5',
        showSetting:false
      }
    },
    mounted() {
      this.canvas = this.$refs.ctx;
      this.ctx = this.canvas.getContext('2d');
    },
    methods: {
      initInfo(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
      },
      insert() {
        // 初始化绘画配置
        this.initInfo(this.ctx)
        // 如果不是第一条线
        if(this.curves.length > 0) {
          let arr = this.points.slice(0)
          // 获取上一个点
          arr.unshift(this.curves[this.curves.length - 1])
          // 画出贝塞尔曲线
          this.drawCurvePath(this.ctx, arr)
          // 点坐标集
          this.curves = this.curves.concat(this.points)
        } else {
          this.drawCurvePath(this.ctx, this.firstPoint)
          this.curves = this.curves.concat(this.firstPoint)
        }
        // 连线
        this.ctx.stroke();
        // 画出圆点
        this.curves.forEach((item, index) => {
          this.drawCircle(this.ctx, item)
        })
        console.log(this.curves)
      },
      drawCurvePath(ctx, [p0, p1, p2]) {
        ctx.moveTo(p0[0], p0[1]);
        ctx.quadraticCurveTo(
          p1[0], p1[1],
          p2[0], p2[1]
        );
      },
      drawCircle(ctx, [x, y]) {
        ctx.beginPath();
        // 圆点坐标x，圆点坐标y，半径，起始角，结束角，顺逆时针
        ctx.arc(x, y, this.roundSize, 0, 2 * Math.PI);
        ctx.fillStyle = this.roundColor;
        ctx.fill();
        ctx.stroke();
      },
      // 如果点击的是圆点，可进行拖拽
      clickAble(e) {
        let p = this.getEventPosition(e)
        this.dragPoint = this.draw(p)
        if(this.dragPoint.length > 0) {
          this.canDrag = true
        }
      },
      // 拖拽 重绘
      drag(e) {
        let p = this.getEventPosition(e)
        if(!this.canDrag) {
          return 
        }else {
          this.curves[this.dragPoint[this.dragPoint.length-1]] = [p.x, p.y]
          this.$set(this.curves,this.dragPoint[this.dragPoint.length-1],[p.x, p.y])
          this.draw(p)
        }
      },
      drop() {
        this.canDrag = false
      },
      // 获取位置坐标
      getEventPosition(ev) {
        var x, y;
        if(ev.layerX || ev.layerX == 0) {
          x = ev.layerX;
          y = ev.layerY;
        } else if(ev.offsetX || ev.offsetX == 0) { // Opera
          x = ev.offsetX;
          y = ev.offsetY;
        }
        return {
          x: x,
          y: y
        };
      },
      //注：使用上面这个函数，需要给Canvas元素的position设为absolute。
      deleteCurve() {
        // 删除后两项
        if(this.curves.length > 3) {
          this.curves.splice(this.curves.length - 2, 2)
        } else {
          this.curves = []
        }
        this.draw()
      },
      //图形绘制
      draw(p) {
        let length = ~~(this.curves.length / 2)
        var who = []; //保存点击事件包含图形的index值
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 为了使用 isPointInPath 重绘曲线
        for (var i = 0; i < length; i++) {
          this.ctx.beginPath();
          this.drawCurvePath(this.ctx, [this.curves[2*i],this.curves[2*i + 1],this.curves[2*i + 2]])
          this.ctx.stroke();
        }
        // 重绘圆
        this.curves.forEach((item, index) => {
          this.drawCircle(this.ctx, item)
          if(p && this.ctx.isPointInPath(p.x, p.y)) {
            who.push(index);
          }
        })
        return who
      },
      // 打印贝塞尔曲线数组集合
      print() {
        
      },
      // 屏幕快照
      photo() {
        let image = new Image()
        image.src = this.canvas.toDataURL("image/png")
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        a.download = 'bezier'
        a.href = image.src
        a.dispatchEvent(event)         
      },
      setting() {
        this.showSetting = true
      },
      closeAside() {
        this.showSetting = false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .home {
    text-align: center;
    canvas {
      /*width:80%;*/
      margin: 50px;
      background: #000;
    }
    .toolbar {
      width: 80%;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      padding: 0 50px;
    }
    .aside {
      position:absolute;
      width:400px;
      height:100vh;
      top:0;
      right:0;
      border: 1px solid #fff;
      /*background:#ECF5FF;*/
    }
    .aside-header {
      /*padding:.6rem 1rem;*/
      color:#fff;
      /*background:#66b1ff;*/
    }
    .el-card__header {
      background:#66b1ff;
    }
    .card-btn {
      color:#fff;
      float: right; 
      padding: 3px 0;
    }
    .aside-item {
      display:flex;
      align-items: center;
      margin-top:2rem;
    }
    .aside-input {
      width:200px;
      margin-left:2rem;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .pannel {
      padding:50px 30%;
    }
  }
</style>