var howtoState = {
    
    preload:function(){
        
        var splash = game.add.sprite(0,0,'bkg');
        splash.y = 0;
        game.set2Scale(splash);

        game.addMusicButton();
        game.addPauseButton();

        game.addDisplayLoader();

        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);
        game.load.image('fond', game.pathImg+'png/fond-explication.png');
        game.load.image('texte1', game.pathText+'mouse-left-right.png');
        game.load.image('texte2', game.pathText+'texte-fireball.png');
        game.load.image('texte3', game.pathText+'dragonball-text.png');
        
        game.load.spritesheet('gotit', '_img/got-it.png', 203, 52);
        game.load.spritesheet('icon1',game.pathImg+'png/icone-mouse-left-right.png', Math.round(380*game.mratio), Math.round(74*game.mratio));
        game.load.spritesheet('icon2',game.pathImg+'png/icone-fireball.png', Math.round(386*game.mratio), Math.round(112*game.mratio));
        game.load.spritesheet('icon3',game.pathImg+'png/icone-dragonball-text.png', Math.round(380*game.mratio), Math.round(74*game.mratio));

        game.load.image('tracking05', game.pathTrack+'pixel.gif?r=howto');
            
    },

    create:function(){

        this.clicb = game.add.audio('clicb');

        var fond = game.add.sprite(0,0,'fond');
        fond.y = 0;
        game.set2Scale(fond);

        var texte1 = game.add.sprite(0,0,'texte1');
        game.set2Scale(texte1);
        game.set2Position(game.width+texte1.width*2,140,texte1);

        var texte2 = game.add.sprite(0,0,'texte2');
        game.set2Scale(texte2);
        game.set2Position(game.width+texte2.width*2,230,texte2);

        var texte3 = game.add.sprite(0,0,'texte3');
        game.set2Scale(texte3);
        game.set2Position(game.width+texte3.width*2,320,texte3);
        
        var gotit = game.add.button(0,0,'gotit', this.gotIt, this, 1, 0, 2);
        game.set2ButtonScale(gotit);
        game.set2Position(490,400,gotit);
        gotit.smoothed = true;

        var icon1 = game.add.sprite(0,0,'icon1');
        game.set2Scale(icon1);
        game.set2Position(game.world.centerX-100,140,icon1);
        icon1.alpha = 0;
        
        var icon2 = game.add.sprite(0,0,'icon2');
        game.set2Scale(icon2);
        game.set2Position(game.world.centerX-100,210,icon2);
        icon2.alpha = 0;

        var icon3 = game.add.sprite(0,0,'icon3');
        game.set2Scale(icon3);
        game.set2Position(game.world.centerX-100,320,icon3);
        icon3.alpha = 0;

        var tween1 = game.add.tween(fond).from( { x: game.width }, 300, "Sine.easeInOut");
        var tween2 = game.add.tween(texte1).to( { x: game.get1Position(410) }, 200, "Sine.easeInOut");
        var tween4 = game.add.tween(texte2).to( { x: game.get1Position(410) }, 200, "Sine.easeInOut");
        var tween6 = game.add.tween(texte3).to( { x: game.get1Position(410) }, 200, "Sine.easeInOut");
        var tween3 = game.add.tween(icon1).to( { x: game.get1Position(405), alpha: 1 }, 100, "Sine.easeInOut");
        var tween5 = game.add.tween(icon2).to( { x: game.get1Position(390), alpha: 1 }, 100, "Sine.easeInOut");
        var tween7 = game.add.tween(icon3).to( { x: game.get1Position(410), alpha: 1 }, 100, "Sine.easeInOut");
        tween1.start();
        tween1.chain(tween2);
        tween2.chain(tween3);
        tween3.chain(tween4);
        tween4.chain(tween5);
        tween5.chain(tween6);
        tween6.chain(tween7);

        

    },
    
    filecomplete:function(progress, cacheID, success, filesloaded, totalfiles){
        //console.log('progress : ' + progress);
        game.processLoader(progress); 
      },
    
    loadcomplete:function(){
        game.destroyLoader();
        //console.log('complete');
    },

    gotIt:function(){
        this.clicb.play('', 0, .3, false, true);
        game.state.start('menu');
    }
}