$(".rpc-player").click(function(){
  var state = $(this).attr("state");
  var inform = $(this).find(".inform:first");
  var btn_play = $(this).find(".glyphicon-play:first");
  var btn_pause = $(this).find(".glyphicon-pause:first");
  var video = $(this).find(".rpc-video:first");
  var progress = $(this).find("progress-bar");
  if ( state.match("not") ){

    video.bind('loadeddata',function(){

      $(".alert-success").html("Audio Loaded succesfully");
      $(this).parent().find(".inform:first").html("Loaded");

      var track_length = $(this).prop('duration');
      var ttMins = parseInt(track_length/60);
      var ttSecs = parseInt(track_length - (ttMins  * 60));

      $(this).attr('track_length', track_length);
      $(this).attr('ttMins', ttMins);
      $(this).attr('ttSecs', ttSecs);

    });
    video.trigger('load');
    video.trigger('play');
    $(this).attr("state","playing");

    btn_play.hide();
    btn_pause.show();
    
    $(video).bind('timeupdate',function(){

      var track_length = $(this).prop('duration');
      var ttMins = parseInt(track_length/60);
      var ttSecs = parseInt(track_length - (ttMins  * 60));

      var secs = $.prop(this, 'currentTime');

      var tcMins = parseInt(secs/60);
      var tcSecs = parseInt(secs - (tcMins * 60));


      var cur = tcMins + ":" + tcSecs;
      var tot = ttMins + ":" + ttSecs;
      $(this).parent().find(".inform").html(cur + "/" + tot);

      var per = ( secs / track_length ) * 100 ;
      var pro = $(this).parent().find(".progress-bar");
      pro.attr('aria-valuenow', per);
      pro.css('width',per + "%");

    });
    //alert( botton.attr("class") );
  }else if ( state.match("playing") ){
    video.trigger('pause');
    $(this).attr("state","pause");
    btn_play.show();
    btn_pause.hide();

    //var t = $(this).find(".rpc-video")[0].duration;
    //var l = $(".rpc-video")[0].duration;

    //alert("1");

  }else if ( state.match("pause") ){
    video.trigger('play');
    $(this).attr("state","playing");
    btn_play.hide();
    btn_pause.show();
  }
  else {
    inform.html("error");
  }
});
