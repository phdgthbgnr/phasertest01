var looseState = {

    init:function(params){
        this.levelFrz = params.levelFrz;
    },

    preload:function(){

        game.addDisplayLoader();

        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);

        game.load.image('loose', game.pathText+'youloose.png');

        game.load.image('sky2', game.pathImg+'jpg/sky2.jpg');
        game.load.audio('musiclooz', [game.pathSnd+'Music_1_Loss.ogg', game.pathSnd+'Music_1_Loss.mp3', game.pathSnd+'Music_1_Loss.m4a']);


        // var sky = game.add.sprite(0,0,'sky2');
        // sky.y = 0;
        // game.set2Scale(sky);
        

        switch(this.levelFrz){
            case 1:
                game.load.image('freezer', game.pathImg+'png/freezer1.png');
            break;
            case 2:
                game.load.image('freezer', game.pathImg+'png/freezer2.png');
            break;
            case 3:
                game.load.image('freezer', game.pathImg+'png/freezer3.png');
            break;
        }
        game.load.image('youloose', game.pathText+'freezer-dialogue-youloose.png');
        game.load.spritesheet('replay', '_img/replay-1.png',184,48);

        game.load.image('tracking04', game.pathTrack+'pixel.gif?r=loose');
    },

    create:function(){

        this.clicf = game.add.audio('clicf');

        this.music = game.add.audio('musiclooz');
        this.music.play('', 0, .3, false, true);

        var sky = game.add.sprite(0,0,'sky2');
        sky.y = 0;
        game.set2Scale(sky)
        
        var frz = game.add.sprite(0,0,'freezer');
        frz.anchor.set(.5,.5);
        game.set2Scale(frz);
        frz.y = game.world.centerY-game.get1Position(20);
        frz.x = game.world.centerX;
        frz.alpha = 1;

        this.lost = game.add.image(game.world.centerX,0,'loose');
        this.lost.anchor.set(.5,0);
        game.set2Scale(this.lost);
        
        var texte = game.add.image(0,0,'youloose');
        game.set2Scale(texte);
        texte.anchor.set(.5,1);
        texte.x = game.world.centerX;
        texte.y = game.height-game.get1Position(30); 
    
        var replay = game.add.button(0,0,'replay', this.replays, this, 1, 0, 2);

        game.set2ButtonScale(replay);
        replay.anchor.set(.5,1);
        replay.x = game.world.centerX;
        replay.y = game.height-game.get1Position(40);
        //game.set2Position(game.world.centerX, game.get1Position(game.height-50), replay);

        game.addMusicButton();
        game.addPauseButton();

        var tween1 = game.add.tween(frz).from( { x: -frz.width/2, alpha: 0 }, 300, "Sine.easeInOut");
        tween1.start();

    },

    replays:function(){
        this.music.destroy();
        this.clicf.play('', 0, .3, false, true);
        game.state.start('menu');
    },

    filecomplete:function(progress, cacheID, success, filesloaded, totalfiles){
        //console.log(progress);
        game.processLoader(progress)
    },
    
    loadcomplete:function(){
        game.destroyLoader();
        //console.log('complete');
    }


}