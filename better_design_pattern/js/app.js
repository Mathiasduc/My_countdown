(function(){
   window.app = {
      defaultTime: 300000, //time in ms (5min)
      timer: null,
      intervalID: null,
      isRunning: false,
      startTime: null,
      timePast: 0,

      init:function(){
         app.listeners();
      },

      listeners:function(){
         $("#start").on('click',app.start);
         $("#stop").on('click',app.stop);
         $("#reset").on('click',app.reset);
         $("#submit_time").on("click",app.getInput);
      },

      decrement:function(){
         app.timePast = (app.startTime - Date.now());
         app.timer = app.defaultTime + app.timePast; 
         app.updateView();
         if(app.timer <= 0){
            console.timeEnd('app.intervalID');
            setTimeout(function(){ alert("Dring! Time'sup!"); },1);
            app.stop();
            app.saxVidToggle(true);
         }
         if(app.timer <= 30000){
            app.flashLight();
         }
      },

      updateView:function(){
         app.saxVidToggle(false); 
         var minute = parseInt((app.timer / 1000) / 60);
         var second = parseInt((app.timer / 1000) % 60);
         minute = minute < 10 ? "0" + minute : minute;
         second = second < 10 ? "0" + second : second;
         $("#progress_bar").val(app.progressStatus());
         $("#minute_display").html(minute);
         $("#second_display").html(second);
      },

      start:function(){
         if (!app.isRunning){
            app.timer = app.timer === null ? app.defaultTime : app.timer;
            console.time('app.intervalID');
            app.startTime = Date.now();
            app.intervalID = setInterval(app.decrement,100);
            app.isRunning = true;
         }
      },

      stop:function(){
         clearInterval(app.intervalID);
         app.isRunning = false;
      },

      reset:function(){
         app.stop();
         app.timer = app.defaultTime;
         app.updateView();
      },

      getInput:function(){
         app.stop();
         var minute = parseInt($("#input_min").val(),10);
         var second = parseInt($("#input_sec").val(),10);
         if(isNaN(minute)){
            minute = 0;
         }
         if(isNaN(second)){
            second = 0;
         }
         app.defaultTime = (minute * 1000) * 60 + (second * 1000);
         app.timer = app.defaultTime;
         app.updateView();
      },

      progressStatus: function(){
         var status = (app.timer / app.defaultTime);
         return (status);
      },

      flashLight: function(){
         var displayedSecond = $("#second_display").html();
         if(displayedSecond % 2){
            $("body").css( {"background-color": "#DE6449"});
         }
         else{
            $("body").css({"background-color": "white"});
         }
      },

      saxVidToggle: function(bool){
         if(!bool){
            $("#sax").remove();
         }
         else{
            setTimeout(function(){ 
               var sax = '<iframe id="sax" width="560" height="315" src="https://www.youtube.com/embed/CoaeDyv0Cmo?autoplay=1"  frameborder="0" allowfullscreen></iframe>'
               $(".sax").prepend(sax);
            },5000);
         }
      }
   };
   app.init();
})()