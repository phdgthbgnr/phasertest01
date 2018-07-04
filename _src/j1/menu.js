var menuState = {

    preload:function(){
        game.load.audio('clicf', [game.pathSnd+'Sound_clicforwards.mp3', game.pathSnd+'Sound_clicforwards.ogg', game.pathSnd+'Sound_clicforwards.m4a']);
    },

    create: function(){

        this.music = game.add.audio('musicmenu');
        this.clicf = game.add.audio('clicf');

        //this.sdecoded=false;
        //game.sound.setDecodedCallback([ this.clicf ], this.soundIsDecoded, this);


        var splash = game.add.sprite(0,0,'bkg');
        var perso2 = game.add.sprite(0,0,'perso2');
        var perso3 = game.add.sprite(0,0,'perso3');
        var perso4 = game.add.sprite(0,0,'perso4');
        //var perso1 = game.add.sprite(0,0,'perso1');
        var perso1 = game.add.sprite(0,0,'perso1');
        //var persoidle = perso1.animations.add('idle');

        var toei = game.add.sprite(0,0,'toei_logo');
        var buttonp = game.add.button(0,0,'play', this.start, this, 1, 0, 2);
        var howto = game.add.button(0,0,'howto', this.howto, this, 1, 0, 2);
        var copyright = game.add.sprite(0,0,'copyright');

        //var music = game.add.button(0,0,'music', game.musiconoff, this, 1, 0, 2);

        var logo = game.add.sprite(0,0,'logo');
        logo.y=-300;

        splash.y = 0;
        game.set2Scale(splash);

        game.set2Scale(logo);

        game.set2Scale(perso1);
        game.set2Position(440,225,perso1);

        game.set2Scale(perso2);
        game.set2Position(game.width+perso2.width*2,274,perso2);

        game.set2Scale(perso3);
        game.set2Position(game.width+perso3.width*2,340,perso3);

        game.set2Scale(perso4);
        game.set2Position(game.width+perso4.width*2,330,perso4);

        game.set2Scale(toei);
        game.set2Position(705,525,toei);

        game.set2ButtonScale(buttonp);
        game.set2Position(-30,316,buttonp);

        game.set2ButtonScale(howto);
        game.set2Position(-30,385,howto);

        game.set2Scale(copyright);
        game.set2Position(5,575,copyright);

        splash.smoothed = true;
        buttonp.smoothed = true;
        buttonp.input.useHandCursor = true;
        logo.smoothed = true;
        perso1.smoothed = perso2.smoothed = perso3.smoothed = perso4.smoothed = true;

        //game.camera.setBoundsToWorld();
        var duree = 800;
        game.camera.flash(0x000000, duree, false);

        //perso1.animations.play('idle', 12, true);

        var tween1 = game.add.tween(perso1).from( { x: game.width }, 300, "Sine.easeInOut");
        var tween2 = game.add.tween(perso2).to( { x: game.get1Position(335) }, 250, "Sine.easeInOut");
        var tween3 = game.add.tween(perso3).to( { x: game.get1Position(417) }, 200, "Sine.easeInOut");
        var tween4 = game.add.tween(perso4).to( { x: game.get1Position(640) }, 150, "Sine.easeInOut");
        tween1.start();
        tween1.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween4);

        //setTimeout(function(){
        game.add.tween(logo).to( { y: 15 }, 800, Phaser.Easing.Bounce.Out, true, duree/3);
        //},(duree/3));

        game.add.tween(buttonp).from( { x: -500 }, 300, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(howto).from( { x: -500 }, 300, Phaser.Easing.Circular.Out, true, duree+200);

        game.input.doubleTapRate = 200;
        //game.input.circle = 66;
        game.input.mouse.enabled = true;
        game.input.maxPointers = 1;
        game.input.touch.enabled = true;
        game.input.touch.start();

        //game.input.onMouseDown = this.downmouse;

        //game.input.onDown.add(this.touchDown, this);
        //game.input.onUp.add(this.touchUp, this);
        //game.input.addMoveCallback(this.callbackmove,this);
        game.input.touch.callbackContext = this;
        //game.input.touch.touchStartCallback = this.onTouchStart;
        //game.input.touch.touchEnterCallback = this.onTouchEnter;
        //game.input.touch.touchEndCallback = this.onTouchEnd;

        this.music.play('', 0, .3, true, true);

        game.addMusicButton();
        game.addPauseButton();

        //game.sound.play('musicmenu');

        //var nameLabel = game.add.text(80, 80, 'xxx', {font:'50px Arial', fill:'#ffffff'});
        // var startLabel = game.add.text(80, game.world.height-80,'Press the "W" key to start',{font:'25px Arial',fill:'#ffffff'});
        // var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // wkey.onDown.addOnce(this.start,this);
    },
    start: function(){
        //game.scale.setUserScale(.75, .75);
        //game.scale.refresh();
        this.music.destroy();
        this.clicf.play('', 0, .3, false, true);
        game.createDialogue();
        game.state.start('beforeplay');
    },
    howto:function(){
        this.music.destroy();
        this.clicf.play('', 0, .5, false, true);
        game.state.start('howto');
    },
    render:function(){
       // game.debug.soundInfo(this.clicf, 32, 32);
        //game.debug.cameraInfo(game.camera, 10, 40);
        //game.debug.spriteBounds(this.goku,'#ff0000',false);
       // game.debug.body(this.goku,'#ff0000',true);
      //  if (this.fireball) {
      //   game.debug.spriteBounds(this.fireball,'#f7de00',false);
      //   game.debug.body(this.fireball,'#ff00ea',true);
      //  }
        //game.debug.spriteCoords(this.goku, true, true);
      },

      update:function(){

      },

      touchDown:function(e,p){ // p = pointerEvent, e = e.Pointer
        // trick pour intercepter clic sur button
        console.log(e);
        if(e.interactiveCandidates.length>0 && (e.interactiveCandidates[0].sprite.id == 'btpause' || e.interactiveCandidates[0].sprite.id == 'btmusic')) return;

      },

      soundIsDecoded:function(e){
          this.sdecoded=true;
      }

};
