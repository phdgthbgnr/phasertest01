var bootState = {
    preload:function(){
        game.load.image('splash', game.pathImg + 'jpg/splash.jpg');
        //game.load.image('jouer', 'asset/jouer.png');
        //game.load.spritesheet('jouer', 'assets/jouer.png', 124, 50);
    },
    create:function(){

        // CONFIGURATION SCREEN ************************************************************************

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.scale.forceOrientation(true, false);

        // ratio échelle des assets mobile (75%)
        game.mratio = 1;
        if(game.ismobile) game.mratio = .75;
        
        game.testScroll = true;

        game.setScale = function(ow,oh){
          var wd = Math.round(ow*game.pratio);
          var hd = Math.round(wd*oh/ow);
          return{'wdth':wd,'hgth':hd};
        }

        game.set2Scale = function(sprt){
          if (game.wdpr != 1) sprt.scale.setTo(game.wdpr,game.wdpr);
          if (game.wdpr == 1 && !game.ismobile) sprt.scale.setTo(game.pratio,game.pratio);
          if (game.wdpr == 1 && game.ismobile){
            sprt.scale.setTo(game.pratio/game.scalewh,game.pratio/game.scalewh);
          }
        }

        game.set2ButtonScale = function(sprt){
          if (game.wdpr != 1) sprt.scale.setTo(game.wdpr*game.wdpr,game.wdpr*game.wdpr);
          if (game.wdpr == 1) sprt.scale.setTo(game.pratio,game.pratio);
        }

        game.set2Position = function(x,y,sprt){
          sprt.x=x*game.pratio;
          sprt.y=y*game.pratio;
        }

        game.get1Position = function(px){
          return px*game.pratio;
        }

        game.addDisplayLoader = function(){
          var levelpr;
          var levelprx=0;
  
          levelprx = game.world.centerX-100;
          this.levelpr = game.add.graphics(levelprx, game.height/2);
          this.levelpr.lineStyle(15, 0xf7de00);
          this.levelpr.moveTo(0, 0);
  
          this.textLoad = game.add.sprite( game.world.centerX, game.height/2-20, null);
          this.loadingLabel = game.add.text(0, 0, 'loading :  0 %', {FontSize:'3px', fill:'#ffffff', align: 'center'});
          this.loadingLabel.anchor.setTo(0.5, 0.5);
          this.textLoad.addChild(this.loadingLabel);
          this.textLoad.fixedToCamera = true;
        }

        game.processLoader = function(p){
          this.loadingLabel.text='Loading : ' + p + ' %';
          this.levelpr.lineTo(p*2, 0);
        }

        game.destroyLoader = function(){
          var tt=this;
          setTimeout(function(){
            tt.loadingLabel.destroy();
            tt.levelpr.destroy();
            tt.textLoad.destroy();
          },300);
        }

        game.musiconoff = function(){
          //console.log('pause');
          //var curstate = game.state.getCurrentState();
          //console.log(curstate.key);
          game.sound.mute = !game.sound.mute;
          //console.log(game.sound.mute);
          return true;
        }

        /*
        var buttonOver = function(e){
          switch(e.id){
            case 'pause':
            break;
            case 'music':
            break;
          }
        }
        */

        var buttonOut = function(e){
          switch(e.id){
            case 'btpause':
              if(game.paused){
                e.setFrames(1,2,1,1);
              }else{
                e.setFrames(1,0,2,0);
              }
            break;

            case 'btmusic':
              if(game.sound.mute){
                e.setFrames(1,2,0,1);
              }else{
                e.setFrames(1,0,2,0);
              }
            break;
          }
        }

        var buttonUp = buttonOut; // même gestionnaire mais obligation de le dupliquer


        game.addMusicButton = function(){
          var music = game.add.button(0,0,'music', game.musiconoff, this, 1, 0, 2, 0);
          game.set2ButtonScale(music);
          game.set2Position(750,10,music);
          music.id='btmusic';
          //music.onInputOver.add(buttonOver,this);
          music.onInputOut.add(buttonOut,this);
          music.onInputUp.add(buttonUp,this);
          if(game.sound.mute) music.setFrames(1,2,0,1);;
        }

        game.pausegame = function(){
          //console.log(arguments);
          game.paused = !game.paused;
          window.pausedAtpause = game.paused;
          //return true;
        }

        game.addPauseButton = function(){
          var pause = game.add.button(0,0,'pause', game.pausegame, this, 1, 0, 2, 0); // over out down up
          game.set2ButtonScale(pause);
          game.set2Position(630,10,pause);
          pause.id='btpause';
          //pause.onInputOver.add(buttonOver,this);
          pause.onInputUp.add(buttonUp,this);
          pause.onInputOut.add(buttonOut,this);
          //this.pause.input.priorityID = 0;
        }

        game.testPauseOver = function(){
          return this.pause.onInputOver;
        }

        game.displayLifes = function(pts,ptsmax){
          // niveau vies
          if(this.blife) this.blife.destroy();
          var w = 150*game.mratio;
          var lifes = game.make.bitmapData(w, 23);
          lifes.fill(0, 209, 23);
          var ww = (pts*w)/ptsmax;
          ww = Math.floor(ww) >= 1? ww:1;
          var life = game.make.bitmapData(ww, 23);
          life.alphaMask(lifes,'mask');
          this.blife = game.add.image(0,0,life);
          game.set2Scale(this.blife);
          game.set2Position(22,94,this.blife);
        }

        game.createDialogue = function(){

          game.dialogue1 = [['0-1',1,2],[3,4,5],[6,7,8]];     // transform goku - 3 dialogues par perso
          game.dialogue2 = [[0,1],[2,3],[4,5]];           // transform freezer - 2 dialogues par perso
  
          game.persodial1 = [['perso2big.png',0], ['perso3big.png',1],['perso4big.png',2]]; // transform goku - 1 perso au hasard
          // transform freezer - 1 perso par appartion avec 1 dialogue sur 2 au hasard
          // pas de random sur le perso 
          // l'index (0,1) correspond à l'index dans dialogue2;
          game.persodial2 = [['perso4big.png',0], ['perso2big.png',1],['perso3big.png',2]];
  
          // !!!!! dialogue1.length == dialogue2.length
          for (var i = 0; i < game.dialogue1.length; i++){
            game.dialogue1[i] = game.shuffleArray(game.dialogue1[i]);
          }
  
          for (var i = 0; i < game.dialogue2.length; i++){
            game.dialogue2[i] = game.shuffleArray(game.dialogue2[i]);
          }
  
          game.persodial1 = game.shuffleArray(game.persodial1);
          
        }

        game.shuffleArray = function(a){
          var j, x, i;
          for (i = a.length; i; i--) {
              j = Math.floor(Math.random() * i);
              x = a[i - 1];
              a[i - 1] = a[j];
              a[j] = x;
          }
          return a;
        }

      
        game.state.start('load');
    },

};
