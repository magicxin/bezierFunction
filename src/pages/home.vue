<template>
  <div class="home">
    <canvas ref="ctx" width="1448" height="728" @mousedown="clickAble" @mousemove="drag"></canvas>
    <div class="toolbar">
      <div class="left">
        <el-button type="primary" round @click="insert">insert</el-button>
        <el-button type="info" round @click="deleteCurve">delete</el-button>
      </div>
      <div class="right">

      </div>
    </div>
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
          [300, 100],
          [700, 30],
          [1000, 100]
        ],
        points: [
          [1100, 50],
          [1200, 60]
        ],
        curves: []
      }
    },
    mounted() {
      this.canvas = this.$refs.ctx;
      this.ctx = this.canvas.getContext('2d');
    },
    methods: {
      initInfo(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
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
        this.curves.forEach((item,index)=>{
          this.drawCircle(this.ctx,item)
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
      drawCircle(ctx,[x,y]) {
        ctx.beginPath();
        // 圆点坐标x，圆点坐标y，半径，起始角，结束角，顺逆时针
        ctx.arc(x,y,10,0,2*Math.PI);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.stroke();
      },
      // 如果点击的是圆点，可进行拖拽
      clickAble(e) {
        let p = this.getEventPosition(e)
        console.log(this.ctx.isPointInPath(p.x,p.y))
      },
      // 拖拽 重绘
      drag() {
        
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
        if(this.curves.length>3) {
          this.curves.splice(this.curves.length-2,2)
        }else {
          this.curves = []
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .home {
    text-align: center;
    canvas {
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
  }
</style>