var levelsState = {
    
    init:function(params){

        this.levelFrz = params.levelFrz; // current evol freezer 
        
        this.levelID = params.levelID;  // current level ID
        
        this.score = params.score; // nb dragonballs attrapées

        this.curpts = params.curpts;

        this.difficulty = params.difficulty;

    },

    preload:function(){

        

        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);

        var splash = game.add.sprite(0,0,'bkg');
        splash.y = 0;
        game.set2Scale(splash);

        game.addDisplayLoader();

        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);

        // commun
        game.load.image('fondnoir',game.pathImg+'png/fondnoird.png');
        game.load.image('eclair', game.pathImg+'png/eclair.png');
        game.load.spritesheet('continue', '_img/continue-1.png',270,60);

        // LEVEL 2
        var ii = 0;
        switch(this.levelID){
            case 2:
                game.load.image('degrade',game.pathImg+'png/degrade2.png');
                game.load.image('halo',game.pathImg+'png/aura-2.png');
                game.load.image('supersayan',game.pathImg+'png/supersayan.png');
                game.load.image('supersayantxt',game.pathText+'supersayantxt.png');
                game.load.image('levels', game.pathText+'level2t.png');
                game.load.image('sstxt', game.pathText+'level2-texte-supersaiyan.png');
                ii = game.persodial1[0][1];
                game.load.image('dialog', game.pathText+'dialogue1-'+game.dialogue1[ii][0]+'.png');
                game.load.image('perso', game.pathImg+'png/'+game.persodial1[0][0]);
            break;
            case 3:
                game.load.image('degrade',game.pathImg+'png/degrade2.png');
                game.load.image('halo',game.pathImg+'png/aura-2.png');
                game.load.image('supersayan',game.pathImg+'png/supersayan3.png');
                game.load.image('supersayantxt',game.pathText+'supersayan3txt.png');
                game.load.image('levels', game.pathText+'level3t.png');
                game.load.image('sstxt', game.pathText+'level3-texte-supersaiyan.png');
                ii = game.persodial1[1][1];
                game.load.image('dialog', game.pathText+'dialogue1-'+game.dialogue1[ii][0]+'.png');
                game.load.image('perso', game.pathImg+'png/'+game.persodial1[1][0]);
            break;
            case 4:
                game.load.image('degrade',game.pathImg+'png/degrade4.png');
                game.load.image('halo',game.pathImg+'png/aura-4.png');
                game.load.image('supersayan',game.pathImg+'png/supersayangod.png');
                game.load.image('supersayantxt',game.pathText+'supersayangodtxt.png');
                game.load.image('levels', game.pathText+'level4t.png');
                game.load.image('sstxt', game.pathText+'level4-texte-supersaiyan.png');
                ii = game.persodial1[2][1];
                game.load.image('dialog', game.pathText+'dialogue1-'+game.dialogue1[ii][0]+'.png');
                game.load.image('perso', game.pathImg+'png/'+game.persodial1[2][0]);
            break;
            case 5:
                game.load.image('degrade',game.pathImg+'png/degrade5.png');
                game.load.image('halo',game.pathImg+'png/aura-5.png');
                game.load.image('supersayan',game.pathImg+'png/supersayangodss.png');
                game.load.image('supersayantxt',game.pathText+'supersayangodsstxt.png');
                game.load.image('levels', game.pathText+'level5t.png');
                game.load.image('sstxt', game.pathText+'level5-texte-supersaiyan.png');
                // perso droite
                game.load.image('dialog', game.pathText+'dialogue5-r.png');
                game.load.image('perso', game.pathImg+'png/perso2big.png');
                //perso gauche
                game.load.image('dialog2', game.pathText+'dialogue5-l-1.png');
                game.load.image('perso21', game.pathImg+'png/perso3big.png');
                game.load.image('perso31', game.pathImg+'png/perso4big.png');
            break;
        }

        game.load.image('tracking02', game.pathTrack+'pixel.gif?r=level'+this.levelID);
    },

    create:function(){

        this.clicf = game.add.audio('clicf');
        //game.camera.flash(0xffffff, 1000);

        var degrade = game.add.image(0,0,'degrade'); 
        game.set2Scale(degrade);

        var eclair = game.add.image(0,0,'eclair');
        eclair.anchor.set(.5,.5);
        game.set2Scale(eclair);
        eclair.x = game.world.centerX;
        eclair.y = game.world.centerY;

        var halo = game.add.image(0,0,'halo');
        halo.anchor.set(.5,.5);
        game.set2Scale(halo);
        halo.x = game.world.centerX;
        halo.y = game.world.centerY;

        var ss = game.add.image(0,0,'supersayan');
        ss.anchor.set(.5,.5);
        game.set2Scale(ss);
        ss.x = game.world.centerX;
        ss.y = game.world.centerY;

        var sstext = game.add.image(0,0,'sstxt');
        sstext.anchor.set(.5,1);
        game.set2Scale(sstext);
        sstext.x = game.world.centerX;
        sstext.y = game.height-game.get1Position(30);

        var sstitre = game.add.image(0,0,'supersayantxt');
        sstitre.anchor.set(.5,1);
        game.set2Scale(sstitre);
        sstitre.x = game.world.centerX;
        sstitre.y = game.height-game.get1Position(100);

        var duree = 400;
        // anim scale goku
        //game.add.tween(ss).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(halo).from( {alpha:0}, 800, Phaser.Easing.Elastic.Out, true, duree);
        game.add.tween(halo.scale).from( {x:.5, y:.5}, 800, Phaser.Easing.Elastic.Out, true, duree);
        game.add.tween(ss).from( {alpha:0}, 800, Phaser.Easing.Elastic.Out, true, duree);
        game.add.tween(ss.scale).from( {x:.5, y:.51}, 800, Phaser.Easing.Elastic.Out, true, duree);

        // anim goku + halo + titre + texte pour apparition 2eme partie
        duree = 2000;
        if(this.levelID < 5) {
            game.add.tween(ss).to( { x: game.get1Position(240) }, 200, Phaser.Easing.Circular.Out, true, duree);
            game.add.tween(halo).to( { x: game.get1Position(240) }, 200, Phaser.Easing.Circular.Out, true, duree);
        }
        game.add.tween(sstitre).to( { y: game.height+300 }, 200, Phaser.Easing.Circular.Out, true, duree+100);
        game.add.tween(sstext).to( {y: game.height+300 }, 200, Phaser.Easing.Circular.In, true, duree+200);

        var fondnoir = game.add.image(0,0,'fondnoir');
        game.set2Scale(fondnoir);
        fondnoir.anchor.set(1,1);
        fondnoir.x=game.width+10;
        fondnoir.y=game.height;

        var perso = game.add.image(0,0,'perso');
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
        //game.set2Position(game.world.centerX, game.height-game.get1Position(40), continuer);
        //game.add.twwen()

        // aparition 2eme partie
        duree = 2500;
        game.add.tween(fondnoir).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(perso).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(dialog).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(continuer).from( { y: game.height+200 }, 200, Phaser.Easing.Circular.Out, true, duree+300);

        // add persos gauche
        if(this.levelID == 5){
            var fondnoir2 = game.add.image(0,0,'fondnoir');
            game.set2Scale(fondnoir2);
            fondnoir2.anchor.set(.5,1);
            fondnoir2.scale.x *= -1;
            fondnoir2.x=-fondnoir2.width/2;
            fondnoir2.y=game.height;

            var perso2 = game.add.image(0,0,'perso21');
            game.set2Scale(perso2);
            perso2.anchor.set(.5,1);
            perso2.scale.x *= -1;
            perso2.y = game.height-game.get1Position(20);
            perso2.x = game.get1Position(195);
            
            var perso3 = game.add.image(0,0,'perso31');
            game.set2Scale(perso3);
            perso3.anchor.set(.5,1);
            perso3.scale.x *= -1;
            perso3.y = game.height-game.get1Position(20);
            perso3.x = game.get1Position(90);

            var dialog2 = game.add.image(0,0,'dialog2');
            game.set2Scale(dialog2);
            dialog2.anchor.set(0,0);
            dialog2.x = game.get1Position(20);
            dialog2.y = game.get1Position(120);


            game.add.tween(fondnoir2).from( { x: -350 }, 200, Phaser.Easing.Circular.Out, true, duree);
            game.add.tween(perso2).from( { x: -350 }, 200, Phaser.Easing.Circular.Out, true, duree);
            game.add.tween(perso3).from( { x: -350 }, 200, Phaser.Easing.Circular.Out, true, duree);
            game.add.tween(dialog2).from( { x: -350 }, 200, Phaser.Easing.Circular.Out, true, duree);
        }

        var levels = game.add.image(0,0,'levels');
        game.set2Scale(levels);
        levels.y = game.get1Position(20);

        game.addMusicButton();
        game.addPauseButton();

    },

    filecomplete:function(progress, cacheID, success, filesloaded, totalfiles){
        //console.log('progress : ' + progress);
        game.processLoader(progress); 
      },
    
    loadcomplete:function(){
        game.destroyLoader();
       // console.log('complete');
    },

    continuer:function(e){
        this.clicf.play('', 0, .3, false, true);
        game.state.start('play', true, false, {levelID:this.levelID, levelFrz:this.levelFrz, score:0, curpts:this.curpts, elovfrz:1, difficulty: this.difficulty });
    }
}