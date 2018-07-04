var evolfrzState = {

    init:function(params){

        this.levelFrz = params.levelFrz; // current evol freezer 
        
        this.levelID = params.levelID;  // current level ID
        
        this.score = params.score; // nb dragonballs attrapées

        this.curpts = params.curpts;

        this.difficulty = params.difficulty;

    },

    preload:function(){

        var splash = game.add.image(0,0,'bkg');
        splash.y = 0;
        game.set2Scale(splash);

        game.addDisplayLoader();
        
        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);

        game.load.image('fondnoir',game.pathImg+'png/fondnoird.png');
        game.load.image('degrade',game.pathImg+'png/degrade5.png');
        game.load.image('eclair',game.pathImg+'png/eclair.png');
        game.load.image('halo',game.pathImg+'png/aura-frz.png');
        game.load.spritesheet('continue', '_img/continue-1.png',270,60);

        var ii = 0;
        switch(this.levelID){
            case 2:
            game.load.image('freezer', game.pathImg+'png/freezer2.png');
            game.load.image('ssfrz', game.pathText+'evolfrz1_txt.png');
            ii = game.persodial2[0][1];
            game.load.image('persoz', game.pathImg+'png/'+game.persodial2[0][0]);
            game.load.image('dialog', game.pathText+'dialogfrz'+game.dialogue2[ii][0]+'.png');
            break;
            case 4:
            game.load.image('freezer', game.pathImg+'png/freezer3.png');
            game.load.image('ssfrz', game.pathText+'evolfrz2_txt-1.png');
            var i = Math.round(Math.random()*1)+1; // 1 ou 2
            ii = game.persodial2[i][1]; // perso 1 ou 2
            game.load.image('persoz', game.pathImg+'png/'+game.persodial2[i][0]);
            game.load.image('dialog', game.pathText+'dialogfrz'+game.dialogue2[ii][0]+'.png');
            break;
        }

    },

    create:function(){

        this.clicf = game.add.audio('clicf');

        var degrade = game.add.image(0,0,'degrade');
        game.set2Scale(degrade);

        var eclair = game.add.image(0,0,'eclair');
        game.set2Scale(eclair);

        game.addMusicButton();
        game.addPauseButton();

        var halo = game.add.image(0,0,'halo');
        halo.anchor.set(.5,.5);
        game.set2Scale(halo);
        halo.x = game.world.centerX;
        halo.y = game.world.centerY;

        var sfrz = game.add.image(0,0,'freezer');
        sfrz.anchor.set(.5,.5);
        game.set2Scale(sfrz);
        sfrz.x = game.world.centerX;
        sfrz.y = game.world.centerY;

        var sstext = game.add.image(0,0,'ssfrz');
        sstext.anchor.set(.5,1);
        game.set2Scale(sstext);
        sstext.x = game.world.centerX;
        sstext.y = game.height-game.get1Position(30);

        // anim freezer + halo + texte pour apparition 2eme partie
        var duree = 2000;
        game.add.tween(sfrz).to( { x: game.get1Position(240) }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(halo).to( { x: game.get1Position(240) }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(sstext).to( {y: game.height+300 }, 200, Phaser.Easing.Circular.In, true, duree+200);



        var fondnoir = game.add.image(0,0,'fondnoir');
        game.set2Scale(fondnoir);
        fondnoir.anchor.set(1,1);
        fondnoir.x=game.width+10;
        fondnoir.y=game.height;

        var perso = game.add.image(0,0,'persoz');
        game.set2Scale(perso);
        perso.anchor.set(.5,1);
        perso.y = game.height-game.get1Position(20);
        perso.x = game.width-game.get1Position(110);

        var dialog = game.add.image(0,0,'dialog');
        game.set2Scale(dialog);
        dialog.anchor.set(.5,0);
        dialog.x = game.width-game.get1Position(170);
        dialog.y = game.get1Position(120);

        var continuer = game.add.button(0,0,'continue', this.continuer, this, 1, 0, 2);
        game.set2ButtonScale(continuer);
        continuer.anchor.set(.5,1);
        continuer.x = game.world.centerX;
        continuer.y = game.height-game.get1Position(60);

         // aparition 2eme partie
         duree = 2500;
         game.add.tween(fondnoir).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
         game.add.tween(perso).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
         game.add.tween(dialog).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
         game.add.tween(continuer).from( { y: game.height+200 }, 200, Phaser.Easing.Circular.Out, true, duree+300);


    },

    continuer:function(){
        this.clicf.play('', 0, .3, false, true);
        game.state.start('play', true, false, {levelID:this.levelID, levelFrz:this.levelFrz, score:this.score, curpts:this.curpts, evolfrz:0, difficulty:this.difficulty });
    },

    filecomplete:function(progress, cacheID, success, filesloaded, totalfiles){
        //console.log(progress);
        game.processLoader(progress)
    },
    
    loadcomplete:function(){
        game.destroyLoader();
        //console.log('complete');
    },

}