var arObjectAutoFiling = {
  json: false,
  now: 0,
  delay: 150,
  letters: 1,
  source: 0,
  dest: "",
  timer:false,
  len:false,
  listIter:0,
  stop:false,
  stopAuto: function () {
      arObjectAutoFiling.stop=true;
  },
  show_text: function (text) {
      this.source=text;
      this.len = this.source.length;

      this.show();
  },
  nextText:function(){
      arObjectAutoFiling.listIter++;
      if(arObjectAutoFiling.listIter>=arObjectAutoFiling.json.LIST_TITLE.length)
      {
          arObjectAutoFiling.listIter=0;
      }
      arObjectAutoFiling.dest="";
      arObjectAutoFiling.now=0;
      arObjectAutoFiling.show_text(arObjectAutoFiling.json.LIST_TITLE[arObjectAutoFiling.listIter])
  },

  show: function () {
      if(!arObjectAutoFiling.stop)
      {


      arObjectAutoFiling.dest+=  arObjectAutoFiling.source.substr(arObjectAutoFiling.now, arObjectAutoFiling.letters);
      $(arObjectAutoFiling.json.SELECTOR_INPUT).attr("placeholder",arObjectAutoFiling.dest);
      arObjectAutoFiling.now += arObjectAutoFiling.letters;

      if (arObjectAutoFiling.now < arObjectAutoFiling.len)
          arObjectAutoFiling.timer=setTimeout(arObjectAutoFiling.show, arObjectAutoFiling.delay);
      else{
          setTimeout(arObjectAutoFiling.nextText,3000);
      }

      }
  },
  bind: function () {
      arObjectAutoFiling.show_text(this.json.LIST_TITLE[this.listIter]);
      $(document).on("keyup", this.json.SELECTOR_INPUT, function () {
          arObjectAutoFiling.stopAuto()
      })
     
  },
  init: (function () {
      $(function () {
          arObjectAutoFiling.bind();
      });
  })()
}