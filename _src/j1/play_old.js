var playState = {

    create:function(){

        this.directplayer = 0;
        this.moveplayer = true;
        this.etoiles;
        this.vamps;

        this.tap1x = 0;  // tapstart doubletap
        this.tap2x = 0;  // tapend doubletap
        this.tap1y = 0;  // tapstart y swipe
        this.tap2y = 0;  // tapend y swipe

        this.fireTimer = 0;
        this.bullet;
        this.bulletPool;
        this.curfire = false;

        // empeche un tir simultané au swipe
        this.notap1y = 0;
        this.notap2y = 0;
        this.delta = 0; // difference notap1y - notap2y
        // var curfire=false;
        this.nbtap = 0;


        // SONS ***************************************************************************************
        this.humphSnd = game.add.audio('humph');
        this.proutchSnd = game.add.audio('proutch');
        this.pouetSnd = game.add.audio('pouet');
        this.rotSnd = game.add.audio('rot');
        this.blingSnd = game.add.audio('bling');

        var layer;
        var map;
        var columns;

        console.log('camera : width : ' + game.camera.width+' height :' + game.camera.height);
        console.log('camera scale : ' + game.camera.scale);
        console.log('camera view : ' + game.camera.view);

        game.camera.width = game.width/window.devicePixelRatio;
        game.camera.height = game.height/window.devicePixelRatio;

        //game.scale.setScreenSize(true); // ##############################################################



        game.physics.setBoundsToWorld(true, true, true, true, true);

        this.middle = game.width/window.devicePixelRatio/2;


        // MAP *****************************************************************************************
        var fond = game.add.tileSprite(0, 0, 4096, 1024, 'bkg');
        fond.smoothed = false;
        fond.cacheAsBitmap=true;

        game.physics.arcade.gravity.y = 600;

        map = game.add.tilemap('level1');


        // STONES ***************************************************************************************
        this.stones = game.add.group();
        //stones.y=64;
        this.stones.enableBody = true;

        map.createFromObjects('ground', 1, 'stone', 0, true, false, this.stones, Phaser.Sprite, true);

        this.stones.forEach(function(item){
              item.body.allowGravity = false;
              item.body.immovable = true;
              item.autoCull=true;
             // game.physics.arcade.collide(player,item);
        },this);


        // ETOILES ***************************************************************************************
        this.etoiles=game.add.group();
        this.etoiles.enableBody=true;
        map.createFromObjects('etoiles',38,'etoile', 0, true, false, this.etoiles, Phaser.Sprite,true);
        this.etoiles.callAll('animations.add', 'animations', 'spin', [0,1,2,3,4,5], 12, true,true);
        this.etoiles.callAll('animations.play', 'animations', 'spin');
        this.etoiles.forEach(function(l){
            l.collid = false;
            l.body.allowGravity = false;
            l.body.immovable = true;
            l.name = l.key + l.z;
            l.autoCull=true;
            //if(vampkill.hasOwnProperty(l.name)) l.kill();
            //l.body.collideWorldBounds = true;
            //l.body.bounce.setTo(0.05, 0);
        }, this);


        // COLONNES ************************************************************************************
        map.addTilesetImage('stuf','stuff');
        layer = map.createLayer('stufs');
        columns = game.add.group();
        // ---- createFromTiles: function (tiles, replacements, key, layer, group, properties) {
        map.createFromTiles( [0,1,2,3,4,5,6], [], 'stuff',layer, columns);
        layer.renderSettings.enableScrollDelta = false;
        //layer.renderSettings.copyCanvas = true;
        layer.renderSettings.overdrawRatio=0.8;


        var vampkill;

        // recuperation etat du jeux
        if(localStorage['killedvamp']== undefined){
            vampkill = {};
        }else{
            vampkill = JSON.parse(localStorage['killedvamp']);
        }


        vampkill = {};

       // MONSTRE ********************************************************************************************
        this.vamps = game.add.group();
        this.vamps.enableBody = true;
        map.createFromObjects('vampires', 2, 'vamp', 0, true, false, this.vamps, Phaser.Sprite, true);
        this.vamps.callAll('animations.add', 'animations', 'idle', [0,1,2,3,4,5,6, 7, 8, 9, 10, 11,12,13,14,15,16,17], 12, true,true);
        this.vamps.callAll('animations.add', 'animations', 'die', [18,19,20,21,22,23,24,25,26,27,28,29], 12, false,true);
        this.vamps.callAll('animations.play', 'animations', 'idle');

        this.vamps.forEach(function(l){
            l.collid = false;
            l.body.allowGravity = false;
            l.body.immovable = true;
            l.name = l.key + l.z;
            if(vampkill.hasOwnProperty(l.name)) l.kill();
            l.autoCull=true;
            //l.body.collideWorldBounds = true;
            //l.body.bounce.setTo(0.05, 0);
        }, this);



        // BULLET ********************************************************************************************
        this.bulletPool = game.add.group();
        this.bulletPool.enableBody = true;
        this.bulletPool.createMultiple(30, 'bullet');
        // Sets anchors of all sprites
        this.bulletPool.setAll('anchor.x', 0.5);
        this.bulletPool.setAll('anchor.y', 0.5);
        this.bulletPool.callAll('animations.add', 'animations', 'roll', [0,1,2,3,4,5,6,7], 10, true);
        this.bulletPool.callAll('animations.add', 'animations', 'explode', [8,9,10,11], 6, false);



        // PLAYER *********************************************************************************************
        this.player = game.add.sprite(50, 250, 'captain');
        this.player.smoothed=false;
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.isdown = false;
        this.player.body.bounce.y = 0.3;
        // player.body.acceleration=10;
        this.player.body.collideWorldBounds = true;
        //this.player.checkWorldBounds = true;
        this.player.body.setSize(36, 64, 22, 0);
        this.player.body.gravity.y = 600;
        this.player.animations.add('right', [0,1, 2, 3, 4, 5], 12, true);
        this.player.animations.add('left', [6, 7, 8, 9, 10, 11], 12, true);
        this.player.animations.add('idler', [29,30,31,32,33,34], 12, true);
        this.player.animations.add('idlel', [35,36,37,38,39,40], 12, true);
        this.player.animations.add('explose', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], 15, true);
        this.player.animations.add('die', [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94], 20, true);
        this.player.animations.add('jumpr', [41, 42, 43, 44, 45, 46], 20, true);
        this.player.animations.add('jumpl', [47, 48, 49, 50, 51, 52], 20, true);
        this.player.animations.add('firer', [53,54,55,56,57], 20, false);
        this.player.animations.add('firel', [59,60,61,62,63], 20, false);

        game.camera.follow(this.player);

        this.player.events.onOutOfBounds.add( this.playerOutOfbounds, this );

        // INPUT *********************************************************************************************
        //game.input.onDown.add(pointerDown, this);
        game.input.doubleTapRate = 200;
        game.input.circle = 66;
        game.input.mouse.enabled = true;
        game.input.maxPointers = 1;
        game.input.touch.enabled = true;
        game.input.touch.start();

        game.input.onDown.add(this.touchDown, this);
        game.input.onUp.add(this.touchUp, this);
        game.input.onTap.add(this.tapOn, this);
        game.input.touch.callbackContext = this;
        game.input.touch.touchStartCallback = this.onTouchStart;
        //game.input.touch.touchEnterCallback = this.onTouchEnter;
        game.input.touch.touchEndCallback = this.onTouchEnd;



    },

    update:function(){
        game.physics.arcade.collide(this.player, this.stones, this.collidGroundCallback, this.processGroundCallback, this);
        game.physics.arcade.overlap(this.vamps, this.bulletPool, this.killvamps, null, this);
        game.physics.arcade.overlap(this.player, this.etoiles, this.collideEtoilesCallback, this.processEtoilesCallback, this);
        //game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);
    },

    Win:function(){
        //game.State.start('win');
    },

    render:function(){
      //game.debug.cameraInfo(game.camera, 10, 40);
    },

    tapOn:function(p,d){ // p = pointer , d = doubletape

      console.log('onTap');
      if(d) {
        console.log('doubleTap');
        this.directfire();
      }
    },

    onTouchStart:function(e){
      console.log('onTouchStart');
      //this.moveplayer=true;
      this.tap1x = game.input.pointer1.positionDown.x;
    },

    // onTouchEnter:function(p){
    //   console.log('onTouchEnter');
    // },

    onTouchEnd:function(p){

      console.log('onTouchEnd');

        this.tap2x = game.input.pointer1.positionDown.x;
        //notap2y = game.input.pointer1.positionDown.y;

        if(game.input.pointer1.justPressed(200)){
           this.bullet = this.bulletPool.getFirstExists(false);
           this.delta = Math.abs(Math.round(this.tap1y-this.tap2y));

           if(this.tap1x<this.middle && this.tap2x<this.middle && this.nbtap % 2 === 0 && this.delta<10){

                this.player.body.velocity.x = 0;
                if(game.time.now > this.fireTimer && this.bullet){
                   // curfire=true;
                    this.player.animations.play('firel');
                    this.player.events.onAnimationComplete.add(this.endFire, this);
                }
                this.nbtap = 0;
                //moveplayer=true;
           }

           if(this.tap1x>this.middle && this.tap2x>this.middle  && this.nbtap % 2 === 0 && this.delta<10){

               this.player.body.velocity.x = 0;
               if(game.time.now > this.fireTimer && this.bullet){
                  // curfire=true;
                   this.player.animations.play('firer');
                   this.player.events.onAnimationComplete.add(this.endFire, this);
               }
               this.nbtap=0;
               //moveplayer=true;
           }
        }else{
            this.nbtap++;
           //nbtap=0;
            //curfire=false;
            //moveplayer = false;
        }

         this.moveplayer = false;
         this.player.body.velocity.x = 0;
         if(this.player.animations.currentAnim.name=='right' || this.player.animations.currentAnim.name=='left' || this.player.animations.currentAnim.name=='jumpr' || this.player.animations.currentAnim.name=='jumpl'){
             if(this.directplayer == 1) this.player.animations.play('idler');
             if(this.directplayer == -1) this.player.animations.play('idlel');
         }
       //console.log('down '+game.input.pointer1.positionDown.y);
        //console.log('up '+game.input.pointer1.positionUp.y);


    },

    touchDown:function (e){ // touch is down
      this.moveplayer=true;
      console.log('touchDown');

        this.tap1y=game.input.pointer1.positionDown.y;
        console.log('isdown : ' + this.player.isdown);
        console.log('moveplayer : ' + this.moveplayer);
        console.log('velocity x : ' + this.player.body.velocity.x);
        console.log('player x : ' + this.player.x);
        // console.log('world x : ' + e.worldX);
        //console.log('screen x : ' + p.targetTouches[0].screenX);
        console.log('worldx : ' + game.input.worldX);
        console.log('currentAnim : ' + this.player.animations.currentAnim.name)

        if(this.moveplayer) {
          console.log('move');
            if(e.worldX > this.player.x && this.player.animations.currentAnim.name!='firer') {
            // if(game.input.worldX > this.player.x && this.player.animations.currentAnim.name!='firer') {
                this.directplayer = 1;
                this.player.body.setSize(36, 64, 22, 0);
                if (this.player.isdown) {
                    this.player.animations.play('right');
                    //player.scale.x *= -1;
                }
                if( !this.player.isdown) this.player.animations.play('jumpr');
                this.player.body.velocity.x = 330;
            }
            if(e.worldX < this.player.x && this.player.animations.currentAnim.name!='firel') {
                this.directplayer = -1;
                this.player.body.setSize(36, 64, 8, 0);
                if (this.player.isdown) {
                    this.player.animations.play('left');
                    //player.scale.x *= -1;
                }
                if( !this.player.isdown) this.player.animations.play('jumpl');
                this.player.body.velocity.x = -330;
            }
            if(e.worldX > this.player.x && this.player.animations.currentAnim.name=='firer') {
                this.directplayer = 1;
                this.player.body.setSize(36, 64, 22, 0);
               // player.events.onAnimationComplete.remove(endFire);
                this.player.body.velocity.x = 330;
                if (this.player.isdown) this.player.animations.play('right');
                if( !this.player.isdown) this.player.animations.play('jumpr');
                this.directfire();
                //player.animations.play('right');
                //player.body.velocity.x = 330;
            }
            if(e.worldX < this.player.x && this.player.animations.currentAnim.name=='firel') {
                this.directplayer = -1;
                this.player.body.setSize(36, 64, 8, 0);
               // player.events.onAnimationComplete.remove(endFire);
                this.player.body.velocity.x = -330;
                if (this.player.isdown) this.player.animations.play('left');
                if( !this.player.isdown) this.player.animations.play('jumpl');
                this.directfire();
                //player.animations.play('left');
                //player.body.velocity.x = -330;
            }
        }
    },

    touchUp:function(e,d){

        console.log('touchUp');

        if(this.nbtap % 2 != 0) this.nbtap = 0;

        this.tap2y=game.input.pointer1.position.y;

            //debugtext.text= tap1y + ' / ' + tap2y + ' : ' + (tap1y-tap2y) ;
        if(this.player.isdown){
            if(this.tap1y-this.tap2y >30){
                this.player.body.velocity.y = -600;
                this.player.isdown=false;
                this.nbtap=0;
                this.humphSnd.play ('', 0, .3, false, true);
            }
        }
    },

    endFire:function (e){

        var curanm=e.animations.currentAnim.name;
        var direct=0;
        var pos=0;
        if(curanm=='firer' || curanm=='jumpr' || curanm=='idler' || curanm=='right') {
            this.player.animations.play('idler');
            direct=600;
            pos=64;
        }
        if(curanm=='firel' || curanm=='jumpl' || curanm=='idlel' || curanm=='left') {
            direct=-600;
            this.player.animations.play('idlel');
        }

        //curfire=false;
        if(this.bullet && e.alive){
            //bullet.events.onKilled.add(killbullet, this);
            this.bullet.reset(this.player.x+pos, this.player.y+15);
            this.bullet.body.allowGravity =false;
            this.bullet.body.velocity.x = direct;
            this.bullet.checkWorldBounds = true;
            this.bullet.outOfBoundsKill =  true;
            this.bullet.body.immovable = true;
            this.bullet.animations.play('roll');
            this.bullet.lifespan = game.width / (direct/500);
            this.fireTimer = game.time.now + 300;
            e.events.onAnimationComplete.remove(this.endFire);
        }

    },

    directfire:function(){
       // nbtap=0;
       console.log('directfire');
        var curanm=this.player.animations.currentAnim.name;
        var direct=0;
        var pos=0;
        if(curanm=='firer' || curanm=='jumpr' || curanm=='idler' || curanm=='right') {
            //player.animations.play('idler');
            direct=600;
            pos=64;
        }
        if(curanm=='firel' || curanm=='jumpl' || curanm=='idlel' || curanm=='left') {
            direct=-600;
            //player.animations.play('idlel');
        }

        //curfire=false;
        if(this.bullet){
            //bullet.events.onKilled.add(killbullet, this);
            this.bullet.reset(this.player.x+pos, this.player.y+15);
            this.bullet.body.allowGravity =false;
            this.bullet.body.velocity.x = direct;
            this.bullet.checkWorldBounds = true;
            this.bullet.outOfBoundsKill =  true;
            this.bullet.body.immovable = true;
            this.bullet.animations.play('roll');
            this.bullet.lifespan = game.width / (direct/500);
            this.fireTimer = game.time.now + 300;
        }
    },

    playerOutOfbounds:function(p){
        console.log(p.x);
        console.log('outofbounds');
        console.log(game.width);
        //debugtext.text = 'outofbounds' + ' / ' + p.x;
        if(p.x>game.width){
            //debugtext.text='move camera '+game.camera.x;
            game.world.setBounds(1280, 0, game.width, game.height);
            game.camera.x=1280;
           // debugtext.text='move camera '+game.world.x;
        }
    },

    collidGroundCallback:function(p,d){
        if(!p.isdown && p.alive){
            p.isdown=true;
            //emitter.explode(300,10);
            if(p.animations.currentAnim.name != 'firer' && p.animations.currentAnim.name != 'firel'){
                if(this.moveplayer && this.directplayer==1) this.player.animations.play('right');
                if(this.moveplayer && this.directplayer==-1) this.player.animations.play('left');
                if(!this.moveplayer && this.directplayer==1) this.player.animations.play('idler');
                if(!this.moveplayer && this.directplayer==-1) this.player.animations.play('idlel');
            }
        }
    },

    processGroundCallback:function(){
        return true;
    },

    killvamps:function(v,b){
        if(v.collid) return;

        var obj;
        if(localStorage['killedvamp'] == undefined){
            obj={};
            var objstr=JSON.stringify(obj)
            localStorage['killedvamp']=objstr;
        }else{
            var pobj=localStorage['killedvamp'];
            obj=JSON.parse(pobj);
        }

        // var objlng = Object.getOwnPropertyNames(obj).length;
        // obj[objlng]=v.name;
        obj[v.name]=1;
        var newobjstr = JSON.stringify(obj);
        localStorage['killedvamp']=newobjstr;


        v.collid=true;
        b.kill();
        // rotSound.play ('', 0, .3, false, true);
        v.events.onAnimationComplete.add(this.onkillvampscomplete, this);
        v.animations.play('die', 12, false, true);
        //rotSnd.play ('', 0, .5, false, true);
    },

    onkillvampscomplete:function(v){
        v.kill();
        v.events.destroy();
    },

    collideEtoilesCallback:function(p, e){
        e.kill();
        this.blingSnd.play();
    },

    processEtoilesCallback:function(){
        return true;
    }


};
