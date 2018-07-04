var playState = {

  init:function(params){

    this.nbballfrz = 0; // nb dragon ball transformation freezer

    this.levelFrz = params.levelFrz; // current evol freezer

    this.levelID = params.levelID;  // current level ID

    this.score = params.score; // nb dragonballs attrapées

    this.actuallife = params.curpts; // cpoints de vie restant

    this.difficulty = params.difficulty;


    // nb points de vie max / niveau

    var ptsenmoins = 0;
    switch(this.levelID){
      case 1:
      this.ptslife = 100;
      break;
      case 2:
      if(params.elovfrz == 1) ptsenmoins = 100-params.curpts;
      this.ptslife = 150;
      break;
      case 3:
      if(params.elovfrz == 1) ptsenmoins = 150-params.curpts;
      this.ptslife = 200;
      break;
      case 4:
      if(params.elovfrz == 1) ptsenmoins = 200-params.curpts;
      this.ptslife = 250;
      break;
      case 5:
      if(params.elovfrz == 1) ptsenmoins = 250-params.curpts;
      this.ptslife = 300;
      break;
    }


      if(params.elovfrz == 1) this.actuallife = this.ptslife-ptsenmoins;

    //nb balles evolution freezer
    switch(this.levelID){
      case 2:
      this.nbballfrz = 4;
      break;
      case 3:
      this.nbballfrz = 0; // pas d'evolution
      break;
      case 4:
      this.nbballfrz = 3;
      break;
      case 5:
      this.nbballfrz=0; // pas d'evolution
      break;
    }

    // empeche re-evolution freezer surt le meme state
    if(params.evolfrz == 0) this.nbballfrz = 0;

  },

  preload:function(){

    //this.ratio = 1;
    //if(game.ismobile) this.ratio = .75;
    game.addDisplayLoader();

    game.load.onFileComplete.add(this.filecomplete, this);
    game.load.onLoadComplete.add(this.loadcomplete, this);

    game.load.image('level', game.pathText+'level'+this.levelID+'.png');
    game.load.image('lifepoint', game.pathText+'lifepoints.png');
    game.load.image('dragonballs', game.pathText+'dragonballs.png');
    game.load.image('points', game.pathImg+'png/ball.png');
    game.load.image('mask', game.pathImg+'png/mask.png');
    game.load.image('lifes', game.pathImg+'png/lifes.png');
    //game.load.image('freezerlt', game.pathImg+'png/freezer_lt.png');
    switch(this.levelID){
      case 1 :
        game.load.spritesheet('goku', game.pathImg+'png/goku_lt_idle.png', 130*game.mratio, 184*game.mratio);
      break;
      case 2:
        game.load.spritesheet('goku', game.pathImg+'png/Goku_2.png', 130*game.mratio, 184*game.mratio);
      break;
      case 3:
        game.load.spritesheet('goku', game.pathImg+'png/Goku_3.png', 130*game.mratio, 184*game.mratio);
      break;
      case 4:
        game.load.spritesheet('goku', game.pathImg+'png/Goku_4.png', 130*game.mratio, 184*game.mratio);
      break;
      case 5:
        game.load.spritesheet('goku', game.pathImg+'png/Goku_5.png', 130*game.mratio, 184*game.mratio);
      break;
    }

    game.load.spritesheet('fireball', game.pathImg+'png/fireball.png', 240*game.mratio, 240*game.mratio);
    game.load.spritesheet('movin1', game.pathImg+'png/move_lines1.png', 200*game.mratio, 70*game.mratio);
    game.load.spritesheet('movin2', game.pathImg+'png/move_lines2.png', 200*game.mratio, 70*game.mratio);

    switch(this.levelFrz){
      case 1:
      game.load.spritesheet('freezerlt', game.pathImg+'png/freezer_1.png', 113*game.mratio, 150*game.mratio);
      game.load.audio('music',[game.pathSnd+'Music_1_Fight1.mp3', game.pathSnd+'Music_1_Fight1.m4a', game.pathSnd+'Music_1_Fight1.ogg']);
      break;
      case 2:
      game.load.spritesheet('freezerlt', game.pathImg+'png/freezer_2.png', 113*game.mratio, 150*game.mratio);
      game.load.audio('music',[game.pathSnd+'Music_1_Fight2.mp3', game.pathSnd+'Music_1_Fight2.m4a', game.pathSnd+'Music_1_Fight2.ogg']);
      break;
      case 3:
      game.load.spritesheet('freezerlt', game.pathImg+'png/freezer_3.png', 113*game.mratio, 150*game.mratio);
      game.load.audio('music',[game.pathSnd+'Music_1_Fight3.mp3', game.pathSnd+'Music_1_Fight3.m4a', game.pathSnd+'Music_1_Fight3.ogg']);
      break;
    }

    game.load.audio('firefreezer', [  game.pathSnd+'Sound_1_Attack1.mp3', game.pathSnd+'Sound_1_Attack1.m4a', game.pathSnd+'Sound_1_Attack1.ogg']);
    game.load.audio('showball', [game.pathSnd+'Sound_1_DBAppear.mp3', game.pathSnd+'Sound_1_DBAppear.m4a', game.pathSnd+'Sound_1_DBAppear.ogg']);
    game.load.audio('catchball', [game.pathSnd+'Sound_1_DBCollect.mp3', game.pathSnd+'Sound_1_DBCollect.m4a', game.pathSnd+'Sound_1_DBCollect.ogg']);
    game.load.audio('hit', [game.pathSnd+'Sound_1_Hit.mp3', game.pathSnd+'Sound_1_Hit.m4a', game.pathSnd+'Sound_1_Hit.ogg']);
    game.load.audio('move', [game.pathSnd+'Sound_1_Move.mp3', game.pathSnd+'Sound_1_Move.m4a', game.pathSnd+'Sound_1_Move.ogg']);
    game.load.audio('evol',[ game.pathSnd+'Sound_1_EvolutionEvent.mp3', game.pathSnd+'Sound_1_EvolutionEvent.m4a', game.pathSnd+'Sound_1_EvolutionEvent.ogg']);

    game.load.image('tracking06', game.pathTrack+'pixel.gif?r=play'+this.levelID+'&f='+this.levelFrz+'&diff='+this.difficulty);

  },

  create:function(){

    this.music = game.add.audio('music');
    this.firefreezer = game.add.audio('firefreezer');
    this.firefreezer.allowMultiple=true;

    this.sndhit = game.add.audio('hit');
    this.sndhit.allowMultiple=true;

    this.sndball = game.add.audio('showball');
    this.sndball.allowMultiple=true;

    this.sndcatch = game.add.audio('catchball');
    this.sndcatch.allowMultiple=true;

    this.sndmove = game.add.audio('move');
    this.sndmove.allowMultiple=true;

    this.sndevol = game.add.audio('evol');

    this.played = false;                        // true : pointer down
    this.speedgoku = 100;                       // vitesse deplacement goku
    this.maxtime = 100;                         //  temps de deplacement de goku
    this.pointerx = game.world.centerX;         // coord pointer
    this.speedfiremin = 80*this.difficulty;    // vitesse min deplacement fireball
    this.speedfiremax = 140*this.difficulty;    // vitesse max deplacement fireball
    this.maxfire = 3;                           // nb fireball pour tirer une dragonball
    this.midgoku = 0;                           // goku width / 2
    this.maxrangefrzr = 6;                      // deplacement gauche - droite freezer (par rapport à word.centerX) max
    this.minrangefrzr = 1;                      // deplacement gauche - droite freezer (par rapport à word.centerX) min *20*game.mratio
    this.mindfrzr = Math.round(6/this.difficulty);                          // temps min de delai de deplacement de freezer
    this.maxdfrzr = Math.round(16/this.difficulty);                          // temps max de delai de deplacement de freezer
    this.rgfrzr = -1                            // range calcule freezer
    this.curfball = 0;                          // index current fireball
    this.curdball = this.score;                 // index current dragonball
    this.maxdball = 7;                          // nb max dragonball
    this.catchdball = false;                    // dragonball attrappée
    this.points = new Array();
    //this.ptslife = game.ptslifes;         // points de vie max par niveau  --> INIT
    //this.actuallife = this.ptslife;       // points de vie restants de goku  --> INIT
    this.damage = game.freezerforce;
    this.gokuanchorx = 0.5; //= game.ismobile == true ? 1 : 0.5;

    this.skylayer = game.add.group();
    var sky1 = this.skylayer.create(0,0,'sky');
    var sky2 = this.skylayer.create(0,0,'sky');
    var ground = game.add.sprite(0,0,'ground');

    game.set2Scale(sky1);
    game.set2Scale(sky2);
    sky2.x = sky1.width-1;
    if(game.testScroll) this.scrollsky();
    game.set2Scale(ground);

    // goku
    this.goku = game.add.sprite(game.world.centerX, game.height, 'goku');
    this.goku.smoothed = true;
    this.goku.anchor.setTo(.5,1);


    //freezer
    this.freezerlt = game.add.sprite(game.world.centerX, game.get1Position(80), 'freezerlt');
    this.freezerlt.smoothed = true;
    this.freezerlt.anchor.x = .5;
    this.freezerlt.anchor.y = .5;
    game.set2Scale(this.freezerlt);

    //dragonball
    this.dragonball = game.add.sprite(-100, -100, 'dballs');
    this.dragonball.anchor.x = .5;
    this.dragonball.anchor.y = 1;
    this.dragonball.smoothed = true;
    game.set2Scale(this.dragonball);
    this.dragonball.y = game.height;
    this.dragonball.animations.add('ball1',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 12, true);
    this.dragonball.animations.add('ball2',[24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47], 12, true);
    this.dragonball.animations.add('ball3',[48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71], 12, true);
    this.dragonball.animations.add('ball4',[72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95], 12, true);
    this.dragonball.animations.add('ball5',[96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119], 12, true);
    this.dragonball.animations.add('ball6',[120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143], 12, true);
    this.dragonball.animations.add('ball7',[144,145,146,,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167], 12, true);
    this.physics.enable(this.dragonball, Phaser.Physics.ARCADE);
    this.dragonball.body.collideWorldBounds = true;
    this.dragonball.body.bounce.y = 0.5;
    this.dragonball.body.gravity.y = 600;
    this.dragonball.body.velocity.y = 400;
    this.dragonball.kill();

    // anim goku
    this.goku.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,10,9,8,7,6,5,4,3,2,1], 12, true);
    this.goku.animations.add('die',[12,13,14,15,16,17,18,], 12, false);
    this.goku.animations.add('evol',[19,20,21,22,23,23,23,23,23], 12, false);
    this.goku.animations.add('catch',[19,20,21,22,23,22,21,20,19], 18, false);
    this.goku.animations.play('idle');

    // anim freezer
    this.freezerlt.animations.add('idle',[0,1,2,3,4,5,6,7,8,9,10,11,12,11,10,9,8,7,6,5,4,3,2,1], 12, true);
    this.freezerlt.animations.add('evol',[12,13,14,15,16,17,18,,19,20,21,22,23,23,23,23,23,23], 12, false);
    this.freezerlt.animations.play('idle');

    // anim lines
    this.movelined = this.goku.addChild(game.make.sprite(0,-30, 'movin1'));
    this.movelined.anchor.set(1,1);
    game.set2Scale(this.movelined);
    this.movelined.animations.add('lines',[0,0,1,3,5,7,9,11,13,15], 18, false);

    this.movelineg = this.goku.addChild(game.make.sprite(0,-30, 'movin2'));
    this.movelineg.anchor.set(0,1);
    game.set2Scale(this.movelineg);
    this.movelineg.animations.add('lines',[0,0,15,13,11,9,7,5,3,1], 18, false);
    //this.movelined.animations.play('lines');


     // fireballs
    this.fireball;
    this.fireballs = game.add.group();
    this.fireballs.enableBody = true;
    this.fireballs.physicsBodyType = Phaser.Physics.ARCADE;
    this.fireballs.createMultiple(this.maxfire, 'fireball');
    this.fireballs.setAll('anchor.x', 0.5);
    this.fireballs.setAll('anchor.y', 0.5);
    this.fireballs.setAll('outOfBoundsKill', true);
    this.fireballs.setAll('checkWorldBounds', true);
    this.fireballs.callAll('animations.add', 'animations', 'nothing', [0], 1, true, true);
    this.fireballs.callAll('animations.add', 'animations', 'fire', [1,2,3], 6, true, true);


    var level = game.add.sprite(0,0,'level');
    game.set2Scale(level);
    game.set2Position(0,10,level);    

    var lifepoint = game.add.sprite(0,0,'lifepoint');
    game.set2Scale(lifepoint);
    game.set2Position(0,70,lifepoint);

    var dragonballs = game.add.sprite(0,0,'dragonballs');
    game.set2Scale(dragonballs);
    game.set2Position(0,140,dragonballs);

    var offsetp = game.get1Position(23);
    for(var i = 0; i<this.maxdball; i++){
      this.points.push(game.add.image(dragonballs.x,dragonballs.y+dragonballs.height,'points'));
      game.set2Scale(this.points[i]);
      this.points[i].anchor.x = .5;
      this.points[i].anchor.y = 1;
      this.points[i].x=i*this.points[i].width+offsetp+this.points[i].width/2;
      this.points[i].alpha=0;
    }

    game.camera.flash(0x000000, 600, false);

    game.set2Scale(this.goku);
    this.physics.enable(this.goku, Phaser.Physics.ARCADE);
    var boundw = Math.round(this.goku.width/1.5);
    var boundh = Math.round(this.goku.height/1.5);
    var offx = (this.goku.width-boundw)/2;
    var offy = (this.goku.height-boundh)/2;
    //this.goku.body.setSize(boundw*game.mratio, boundh*game.mratio, offx*game.mratio, offy*game.mratio);
    //this.goku.body.setSize(boundw, boundh, offx, offy);
    this.goku.body.setSize(boundw, boundh, this.goku.width/game.mratio * 0.5 - boundw * 0.5, this.goku.height/game.mratio * 0.5 - boundh * 0.5);


    this.goku.y = game.height;
    this.midgoku = game.ismobile ? Math.round((this.goku.width/2/game.pratio)) : 0;//*game.mratio;
    //this.midgoku = Math.round((this.goku.width/2/game.pratio));//*game.mratio;
    this.goku.anchor.x = this.gokuanchorx; // 0.5 on desktop, 1 on mobile
    this.goku.anchor.y = 1;

    this.goku.body.collideWorldBounds = true;
    this.goku.events.onOutOfBounds.add( this.playerOutOfbounds, this );
    //this.goku.body.moves=false;
    //this.goku.body.acceleration=1;

    game.input.doubleTapRate = 200;
    //game.input.circle = 66;
    game.input.mouse.enabled = true;
    game.input.maxPointers = 1;
    game.input.touch.enabled = true;
    game.input.touch.start();

    //game.input.onMouseDown = this.downmouse;

    game.input.onDown.add(this.touchDown, this);
    game.input.onUp.add(this.touchUp, this);
    game.input.addMoveCallback(this.callbackmove,this);
    game.input.touch.callbackContext = this;
    game.input.touch.touchStartCallback = this.onTouchStart;
    //game.input.touch.touchEnterCallback = this.onTouchEnter;
    game.input.touch.touchEndCallback = this.onTouchEnd;
    //game.input.priorityID = 10;

    game.displayLifes(this.actuallife, this.ptslife);

    // reaffiche le score
    if(this.score>0){
      for (var t=0;t<this.curdball; t++){
        this.points[t].alpha=1;
      }
    }

    // demarre freezer
    //var t = Math.floor(Math.random() * (this.maxdfrzr-this.mindfrzr)) + this.mindfrzr;
    var tt=this;
    setTimeout(function(){
      tt.reMoveFreezer();
    },1000);
    //this.reMoveFreezer();

    this.music.play('', 0, .3, true, true);

    game.addMusicButton();
    game.addPauseButton();

    game.time.advancedTiming = true;

    //console.log('curdball : ' + this.curdball);
  },

  filecomplete:function(progress, cacheID, success, filesloaded, totalfiles){
    //console.log(progress);
    game.processLoader(progress)
  },

  loadcomplete:function(){
    game.destroyLoader();
    //console.log('complete');
  },

  update:function(){

    if(game.testScroll){
      if (game.time.fps < 40 && game.time.fps > 0) this.killScrollSky();
    }
    // colision goku / fireball
    game.physics.arcade.overlap(this.goku, this.fireballs, this.collidefireballCallback, null, this);

    game.physics.arcade.overlap(this.goku, this.dragonball, this.collidedragonballCallback, null, this);

    // deplacement tap / mouse
    var dist=game.physics.arcade.distanceToXY(this.goku, this.pointerx, this.goku.y);
    //if (Math.round(dist)>-.5 && Math.round(dist)<.5){
    if (dist<.5){
      //this.goku.body.velocity.x = 0;
      this.goku.body.stopMovement(true);
      this.goku.x=this.pointerx;//-this.midgoku;//-this.midgoku;
      this.movelineg.animations.stop(null,true);
      this.movelined.animations.stop(null,true);
    }else{

      game.physics.arcade.moveToXY(this.goku, this.pointerx, game.height, this.speedgoku, this.maxtime);

      if(this.played){
        if(this.goku.body.velocity.x > 1) {
          this.movelineg.animations.stop(null,true);
          this.movelined.animations.play('lines');
        }
        if(this.goku.body.velocity.x < -1) {
          this.movelined.animations.stop(null,true);
          this.movelineg.animations.play('lines');
        }
        if(this.goku.body.velocity.x > -1 && this.goku.body.velocity.x < 1){
          this.movelined.animations.stop(null,true);
          this.movelineg.animations.stop(null,true);
        }
      }
    //  console.log(this.pointerx + ' / ' + Math.round(this.goku.x));
      //game.physics.arcade.moveToXY(this.goku, this.pointerx, game.height, this.speedgoku, this.maxtime);
    }
  },

  collidefireballCallback:function(p, e){
    // p = goku
    // e = fireball
    e.kill();
    this.sndhit.play('', 0, .3, false, true);

    this.actuallife -= this.damage;
    if(this.actuallife < 0){
      this.music.destroy();
      game.displayLifes(1, this.ptslife);
      this.freezerlt.animations.play('evol');
      this.sndevol.play('', 0, .3, false, true);
      this.freezerlt.events.onAnimationComplete.addOnce(function(e,p){
        e.kill(); // kill freezer
        this.fireballs.destroy(); // kill all fireballs
        this.music.destroy();
        game.camera.fade(0xffffff, 500);
        var tt=this;
        setTimeout(function(){
          game.state.start('loose', true, false, {levelFrz:tt.levelFrz});
        },500);
      }, this);
    }else{
      p.animations.play('die');
      if(this.actuallife > 0) game.displayLifes(this.actuallife, this.ptslife);
      p.events.onAnimationComplete.addOnce(function(){p.animations.play('idle')}, this);
    }

  },

  collidedragonballCallback:function(p,e){
    // p = goku
    // e = dragonball
    e.kill(); // kill ball
    if(this.curdball < this.maxdball){
      this.sndcatch.play('', 0, .3, false, true);

      this.catchdball = false;
      p.animations.play('catch');
      p.events.onAnimationComplete.addOnce(function(){p.animations.play('idle')}, this);
      // points dragonballs
      this.points[this.curdball-1].alpha = 1;
      game.add.tween(this.points[this.curdball-1].scale).from( {x:3, y:3}, 800, Phaser.Easing.Elastic.Out, true);
      game.add.tween(this.points[this.curdball-1]).to( {alpha:1}, 800, Phaser.Easing.Elastic.Out, true);
    }else{
      // ajoute un point
      this.points[this.curdball-1].alpha = 1;
      game.add.tween(this.points[this.curdball-1].scale).from( {x:3, y:3}, 800, Phaser.Easing.Elastic.Out, true);
      game.add.tween(this.points[this.curdball-1]).to( {alpha:1}, 800, Phaser.Easing.Elastic.Out, true);
      // evolution goku
      this.levelID++;
      this.music.destroy();
      p.animations.play('evol');
      this.sndevol.play('', 0, .3, false, true);
      this.freezerlt.alive=false; // empeche freezer de tirer
      this.fireballs.destroy();
      p.events.onAnimationComplete.addOnce(function(){
        if(this.levelID == 6) {
          game.camera.fade(0xffffff, 500);
          setTimeout(function(){
            game.state.start('win', true, false);
          },600);
        }
        if(this.levelID < 6 ) {
          game.camera.fade(0xffffff, 500);
          var tt = this;
          setTimeout(function(){
            game.state.start('levels', true, false, {levelID:tt.levelID, levelFrz:tt.levelFrz, score:tt.curdball, curpts:tt.actuallife, difficulty: tt.difficulty});
          },600);
        }
      }, this);

    }
  },

  processFireballCallback:function(){
    //console.log('processFireballCallback');
    return true;
  },

  render:function(){
    //game.debug.cameraInfo(game.camera, 10, 40);
    //game.debug.spriteBounds(this.goku,'#ff0000',false);
    //game.debug.body(this.goku,'#ff0000',true);
    //  if (this.fireball) {
    //   game.debug.spriteBounds(this.fireball,'#f7de00',false);
    //   game.debug.body(this.fireball,'#ff00ea',true);
    //  }
    //game.debug.spriteCoords(this.goku, true, true);
  },

  scrollsky:function(){
    this.skylayer.x=0;
    this.tweensky = game.add.tween(this.skylayer);
    this.tweensky.to( { x: -this.skylayer.width/2}, 30000, Phaser.Easing.Linear.None, true,0,0,false);
    this.tweensky.onComplete.add(this.scrollsky, this);
  },

  killScrollSky:function(){
    this.tweensky.stop();
    game.testScroll = false;
  },

  touchDown:function(e,p){ // p = pointerEvent, e = e.Pointer
    // trick pour intercepter clic sur button
    if(e.interactiveCandidates.length>0 && (e.interactiveCandidates[0].sprite.id == 'btpause' || e.interactiveCandidates[0].sprite.id == 'btmusic')) return;
    this.played = true;
    this.sndmove.play('', 0, .3, false, true);
    //this.pointerx = e.clientX; //decalage ??!!!
    //console.log(game.input.x);
    this.pointerx = e.x; //game.input.x;
  },

  touchUp:function(){
    this.played = false;
    //console.log('up');
  },

  onTouchStart:function(){

  },

  onTouchEnd:function(){

  },

  playerOutOfbounds:function(){

  },

  fireFireballs:function(){
    this.curfball++;
    if(this.curfball >= this.maxfire) this.showBall();

    var speedfire = Math.floor(Math.random() * (this.speedfiremax-this.speedfiremin)) + this.speedfiremin;

    this.fireball = this.fireballs.getFirstExists(false); // the first firball
    //console.log('index: : ' + this.fireballs.getIndex(this.fireball));
    if(this.fireball && this.freezerlt.alive){

      this.fireball.reset(this.freezerlt.x, this.freezerlt.y);
      var rot = game.physics.arcade.angleBetween(this.fireball, this.goku);
      this.fireball.rotation = rot;

      this.fireball.body.setCircle(30*game.mratio,90*game.mratio,90*game.mratio);
      this.fireball.rotation = rot;
      this.fireball.animations.play('nothing', 6, true);
      this.fireball.scale.setTo(.1,.1);

      var mtime = 5000/(this.difficulty*this.levelFrz);
      game.physics.arcade.moveToObject(this.fireball, this.goku, speedfire, mtime);
      //game.add.tween(this.fireball.scale).to( {x:1, y:1}, 2800, Phaser.Easing.Linear.None, true);
      game.add.tween(this.fireball.scale).to( {x:game.pratio, y:game.pratio}, mtime, Phaser.Easing.Cubic.Linear, true);
      // bug moveToObject ou tween -> démarrage anim avec un délai
      var tt = this;
      setTimeout(function(){
        tt.firefreezer.play('', 0, .3, false, true);
        if(tt.fireball) tt.fireball.animations.play('fire', 6, true);
      },100);
    }
  },

  moveFreezer:function(delai,range, time){
    range = range > 0 ? -range  : Math.abs(range);
    //console.log('range : ' + range);
    var tweenfrzr = game.add.tween(this.freezerlt);
    tweenfrzr.to( { x: game.world.centerX + range}, time, Phaser.Easing.Cubic.InOut, true, delai, 0, false);
    tweenfrzr.onComplete.add(this.reMoveFreezer, this);
  },

  reMoveFreezer:function(){
    var d = Math.floor(Math.random() * (this.maxdfrzr-this.mindfrzr)) + this.mindfrzr;
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    d = (d*300)/(this.levelFrz*6); // rapidité de tir de FREEZER
    // ------------------------------------------------------------------------------------------------------------------------------------------------
    var r = Math.floor(Math.random() * (this.maxrangefrzr-this.minrangefrzr)) + this.minrangefrzr;
    r = r*20*game.mratio;
    r = this.rgfrzr > 0 ? -r : r;
    this.rgfrzr = r;
    var t = Math.floor(Math.random() * 3) + .3;
    t = t * 1000;
    //console.log('range : ' + r);
    this.moveFreezer(d, r, t);
    this.fireFireballs();
  },

  callbackmove:function(){
    if (this.played == true) this.pointerx = game.input.worldX;
  },

  showBall:function(){
    this.curfball = 0;
    if(!this.catchdball){
      if(this.curdball < this.maxdball){
        // evolution freezer
        if(this.levelID > 1  && this.curdball == this.nbballfrz && this.nbballfrz != 0){
          //game.state.start('evolfrz', true, false, {levelID:game.niveau});
          this.levelFrz++;
          this.freezerlt.animations.play('evol');
          this.fireballs.destroy();
          this.freezerlt.alive=false; // empeche freezer de tirer
          this.sndevol.play('', 0, .3, false, true);
          this.freezerlt.events.onAnimationComplete.addOnce(this.endEvolFreezer,this);
        }else{
          this.dragonball.revive();
          var xn = game.get1Position(30);
          var yn = game.world.centerY;
          this.curdball++;
          this.dragonball.x = Math.floor(Math.random() * (game.width-xn)) + xn;
          this.dragonball.y = yn;
          this.dragonball.animations.play('ball' + this.curdball);
          this.catchdball = true;

        }
      }
    }
  },

  endEvolFreezer:function(){
    this.music.destroy();
    game.camera.fade(0xffffff, 500);
    var tt = this;
    setTimeout(function(){
      game.state.start('evolfrz', true, false, {levelID:tt.levelID, levelFrz:tt.levelFrz, score:tt.curdball, curpts:tt.actuallife, difficulty:tt.difficulty});
    },600);
  }

}
