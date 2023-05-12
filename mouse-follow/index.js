    // 复用池
    class Pool{
      constructor(creatItem){
        this.creatItem = creatItem
      }
      creatItem = null
      total = 0
      save = []
      // 有剩余 则返回 ，没剩余 新增 并返回
      get(){
        //有剩余
        if(this.save.length){
          return this.save.shift()
        }else{
          this.total++
          return this.creatItem()
        }
      }
      recovery(item){
        this.save.push(item)
      }
    }
    
    // 随机数
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    }

    // 事件侦听函数复用
    let last = null
    function tranEnd(){
      if(last === this){
        return
      }
      last = this
      document.body.removeChild(this)
      pool.recovery(this)
    }

    //生成一个小圆球
    const offsetX = 35
    const offsetY = 35
    const diameter = [10,30]
    const spendTime = [0.5, 2]
    function createRotundity(){
      const rotundity = document.createElement("div")
      rotundity.style.borderRadius = "100px";
      rotundity.style.position = "fixed";
      rotundity.style.zIndex = "9999"
      rotundity.style.pointerEvents = " none"
      // rotundity.classList.add("run")
      // 随机大小
      rotundity.style.height = rotundity.style.width = getRandomIntInclusive(diameter[0],diameter[1]) + "px"
      // 随机颜色
      rotundity.style.backgroundColor = `rgb(${getRandomIntInclusive(0,255)},${getRandomIntInclusive(0,255)},${getRandomIntInclusive(0,255)})`
      // 随机速度
      rotundity.style.transition = `all ${getRandomIntInclusive(spendTime[0], spendTime[1])}s`
      // 添加侦听器
      rotundity.addEventListener("transitionend", tranEnd)

      return rotundity
    }

    const pool = new Pool(createRotundity)
    
    // 事件监听
    let data = Date.now()
    const interval = 25
    let run = true
    document.addEventListener("mousemove",function(e){
      if(!run){
        return
      }
      const now = Date.now()
      if(now - data > interval){
        const dom = pool.get()
        const startX = e.clientX
        const startY = e.clientY
        // 初始
        dom.style.opacity = 1
        dom.style.left = startX+"px"
        dom.style.top = startY+"px"

        document.body.appendChild(dom)
        requestAnimationFrame(()=>{
          // 结束
          dom.style.opacity = 0
          dom.style.left = (getRandomIntInclusive(offsetX,-offsetX)+startX)+"px"
          dom.style.top = (getRandomIntInclusive(offsetY,-offsetY)+startY)+"px"

        })

        data = now
      }
    })
    document.addEventListener("mousedown",function(){
      run = false
    })
    document.addEventListener("mouseup",function(){
      run = true
    })
