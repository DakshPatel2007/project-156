AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#coin1" },    
    },
    update: function () {
      this.isCollided(this.data.elementId);
    },
  
    init: function () {
      var duration = 120;
      const timerEl = document.querySelector("#timer");
      this.startTimer(duration, timerEl);
    },
  
    startTimer: function(duration,timerEl){
        var minutes;
        var seconds;

        setInterval(()=>{
            if(duration >=0){
                minutes = parseInt(duration / 60);
                seconds = parseInt(duration % 60);

                if(minutes < 10){
                    minutes = "0" + minutes;
                }
                if(seconds < 10){
                    seconds = "0" + seconds;
                }

                timerEl.setAttribute("text",{
                    value:minutes + ":" + seconds,
                });

                duration -= 1;
            }
            else{
                this.gameOver();
            }
        },1000)
    },
        
    isCollided: function (elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", (e) => {
        if (elementId.includes("#coin")) {
          element.setAttribute("visible",false)
          this.updateScore()
          this.updateTarget()
        } else {
          this.gameOver()    
        }
      });
    },
    updateTarget: function(){
      var element = document.querySelector("#counter");
      var count = element.getAttribute("text").value
      var currentTargets = parseInt(count) 
      currentTargets -= 1 
      element.setAttribute("text",{value:currentTargets})
    },
    updateScore: function(){
      var element = document.querySelector("#score");
      var count = element.getAttribute("text").value
      var currentScore = parseInt(count) 
      currentScore += 50 
      element.setAttribute("text",{value:currentScore})
    },
    gameOver:function(){
      var planeEl = document.querySelector("#scuba_diver");
      var element = document.querySelector("#gameover");
      element.setAttribute("visible",true)
      planeEl.setAttribute("dynamic-body",{mass:1})
    }
    
  });
  