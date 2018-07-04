var winState = {
    
    preload:function(){

        game.addDisplayLoader();

        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);

        game.load.image('sky2', game.pathImg+'jpg/sky2.jpg');
        game.load.image('won', game.pathText+'youwin.png');
        game.load.spritesheet('continue', '_img/continue.png',270,60);
        game.load.spritesheet('backmenu', '_img/backmain.png',306,43);
        game.load.image('eclair', game.pathImg+'png/eclair.png');
        //ecran1
        game.load.image('freezer', game.pathImg+'png/freezer3.png');
        game.load.image('dialogue1', game.pathText+'dialoguefin-1.png');
        
        // ecran 2
        game.load.image('supersayan',game.pathImg+'png/supersayangodss.png');
        game.load.image('dialogue2', game.pathText+'dialoguefin-2.png');

        // ecran 3
        game.load.image('dialogue3', game.pathText+'dialoguefin-4.png');
        game.load.image('dialogue4', game.pathText+'dialoguefin-3.png');
        game.load.image('perso20', game.pathImg+'png/perso2big.png');
        game.load.image('perso21', game.pathImg+'png/perso3big.png');
        game.load.image('perso31', game.pathImg+'png/perso4big.png');
        game.load.image('fondnoir',game.pathImg+'png/fondnoird.png');

        game.load.audio('victory',[game.pathSnd+'Sound_1_Victory.ogg', game.pathSnd+'Sound_1_Victory.mp3', game.pathSnd+'Sound_1_Victory.m4a']);

        game.load.image('tracking03', game.pathTrack+'pixel.gif?r=win');

    },

    create:function(){

        this.clicf = game.add.audio('clicf');

        this.nextsrc = 2; 
        this.sndvictory = game.add.audio('victory');

        var sky2 = game.add.image(0,0,'sky2');
        game.set2Scale(sky2);

        var eclair = game.add.image(0,0,'eclair');
        game.set2Scale(eclair)

        this.won = game.add.image(game.world.centerX,0,'won');
        this.won.anchor.set(.5,0);
        game.set2Scale(this.won);

        this.freezer = game.add.image(game.world.centerX,game.get1Position(80),'freezer');
        this.freezer.anchor.set(.5,0);
        game.set2Scale(this.freezer);

        this.dialogue1= game.add.image(game.world.centerX,game.height-game.get1Position(74),'dialogue1');
        this.dialogue1.anchor.set(.5,1);
        game.set2Scale(this.dialogue1);

        this.continuebt = game.add.button(0,0,'continue',this.continuer, this, 1, 0, 2);
        game.set2ButtonScale(this.continuebt);
        this.continuebt.anchor.set(.5,1);
        this.continuebt.x = game.world.centerX;
        this.continuebt.y = game.height-game.get1Position(60);

        this.sndvictory.play('', 0, .5, false, true);
        
    },
    
    continuer:function(){
        this.clicf.play('', 0, .3, false, true);
        switch(this.nextsrc){
            case 2:
            this.ecran2();
            this.continuebt.bringToTop();
            this.nextsrc = 3;
            break;
            case 3:
            this.ecran3();
            break;
        }
        
    },

    //bringToTop

    ecran2:function(){
        this.freezer.destroy();
        this.dialogue1.destroy();
        this.dialogue1.destroy();
        this.continuebt.destroy();
        this.won.destroy();
        
        this.sayan = game.add.image(game.world.centerX,game.world.centerY,'supersayan');
        this.sayan.anchor.set(.5,.5);
        game.set2Scale(this.sayan);

        this.dialogue2= game.add.image(game.world.centerX, game.height-game.get1Position(80),'dialogue2');
        this.dialogue2.anchor.set(.5,1);
        game.set2Scale(this.dialogue2);

        this.continuebt = game.add.button(0,0,'continue',this.continuer, this, 1, 0, 2);
        game.set2ButtonScale(this.continuebt);
        this.continuebt.anchor.set(.5,1);
        this.continuebt.x = game.world.centerX;
        this.continuebt.y = game.height-game.get1Position(60);

    },

    ecran3:function(){
        this.dialogue2.destroy();
        this.continuebt.destroy();

        var bckmenu = game.add.button(0,0,'backmenu', this.restart, this, 1, 0, 2);
        game.set2ButtonScale(bckmenu);
        bckmenu.anchor.set(.5,1);
        bckmenu.x = game.world.centerX;
        bckmenu.y = game.height-game.get1Position(60);

        // aparition perso droite
        var fondnoir = game.add.image(0,0,'fondnoir');
        game.set2Scale(fondnoir);
        fondnoir.anchor.set(1,1);
        fondnoir.x=game.width+10;
        fondnoir.y=game.height;

        var perso = game.add.image(0,0,'perso20');
        game.set2Scale(perso);
        perso.anchor.set(.5,1);
        perso.y = game.height-game.get1Position(20);
        perso.x = game.width-game.get1Position(110);

        var dialog = game.add.image(0,0,'dialogue3');
        game.set2Scale(dialog);
        dialog.anchor.set(.5,0);
        dialog.x = game.width-game.get1Position(170);
        dialog.y = game.get1Position(70);

        duree = 100;
        game.add.tween(fondnoir).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(perso).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(dialog).from( { x: game.width+400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(bckmenu).from( { y: game.height+200 }, 200, Phaser.Easing.Circular.Out, true, duree+300);

        // apparition persos gauche
        var fondnoir2 = game.add.image(0,0,'fondnoir');
        game.set2Scale(fondnoir2);
        fondnoir2.anchor.set(.5,1);
        fondnoir2.scale.x *= -1;
        fondnoir2.x=-fondnoir2.width/2-10;
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

        var dialog2 = game.add.image(0,0,'dialogue4');
        game.set2Scale(dialog2);
        dialog2.anchor.set(0,0);
        dialog2.x = game.get1Position(20);
        dialog2.y = game.get1Position(70);


        game.add.tween(fondnoir2).from( { x: -400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(perso2).from( { x: -400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(perso3).from( { x: -400 }, 200, Phaser.Easing.Circular.Out, true, duree);
        game.add.tween(dialog2).from( { x: -400 }, 200, Phaser.Easing.Circular.Out, true, duree);

    },

    restart:function(){
        this.sndvictory.destroy();
        this.clicf.play('', 0, .3, false, true);
        game.state.start('menu');
    },

    filecomplete:function(progress, cacheID, success, filesloaded, totalfiles){
        //console.log('progress : ' + progress);
        game.processLoader(progress); 
      },
    
    loadcomplete:function(){
        game.destroyLoader();
        //console.log('complete');
    },
    
};