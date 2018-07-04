var loadState = {

    preload:function(){

        /*
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
        */

        //game.niveau = 1;        // current level
        //game.freezerevol = 1;   // current evol freezer
        game.ptslifes = 100;    // pts  vie niveau 1
        game.freezerforce = 10;

        game.addDisplayLoader();

        game.load.onFileComplete.add(this.updateProgressBar, this);
        game.load.onLoadComplete.addOnce(this.loadcomplete, this);

        game.load.image('bkg', game.pathImg+'jpg/bg.jpg');
        game.load.image('logo', game.pathImg+'png/dbs_logo.png');
        game.load.image('perso2', game.pathImg+'png/perso2.png');
        game.load.image('perso3', game.pathImg+'png/perso3.png');
        game.load.image('perso4', game.pathImg+'png/perso4.png');
        game.load.image('copyright', game.pathImg+'png/copyright.png');
        game.load.image('toei_logo', game.pathImg+'png/toei_logo.png');
        game.load.image('sky', game.pathImg+'jpg/sky1.jpg');
        game.load.image('ground', game.pathImg+'png/ground1.png');
        game.load.image('mask', game.pathImg+'png/mask.png')
        game.load.image('lifes', game.pathImg+'png/lifes.png')

        game.load.spritesheet('play', '_img/play.png', 419, 87);
        game.load.spritesheet('howto', '_img/howtoplay.png', 419, 87);
        game.load.spritesheet('music', '_img/music.png', 46, 80);
        game.load.spritesheet('pause', '_img/pause.png', 106, 80);
        game.load.spritesheet('perso1', game.pathImg+'png/goku_1_static.png', 282*game.mratio, 400*game.mratio);
        game.load.spritesheet('dballs', game.pathImg+'png/dragonballs.png', 100*game.mratio, 100*game.mratio);


        game.load.audio('clicb', [game.pathSnd+'Sound_clicbackwards.mp3', game.pathSnd+'Sound_clicbackwards.ogg', game.pathSnd+'Sound_clicbackwards.m4a']);
        game.load.audio('clicf', [game.pathSnd+'Sound_clicforwards.mp3', game.pathSnd+'Sound_clicforwards.ogg', game.pathSnd+'Sound_clicforwards.m4a']);


        game.load.audio('musicmenu', [game.pathSnd+'Music_1_MainMenu.mp3', game.pathSnd+'Music_1_MainMenu.ogg', game.pathSnd+'Music_1_MainMenu.m4a']);

        /*
        if(game.ismobile){
          game.load.spritesheet('perso1', game.pathImg+'png/goku_1_idle.png',282*game.scalewh,400*game.scalewh);
        }else{
          game.load.spritesheet('perso1', game.pathImg+'png/goku_1_idle.png',282,400);
        }
        */

        /*
        game.load.spritesheet('captain', game.pathImg+'test/singe_sheet.png', 64, 64, 95);
        game.load.spritesheet('bullet', game.pathImg+'test/gland.png', 16, 16, 12);
        game.load.spritesheet('explosbullet', game.pathImg+'test/explose_gland.png', 64, 64, 11);
        game.load.spritesheet('stuff', game.pathImg+'test/colonne_tile.png', 64, 64, 7);
        game.load.spritesheet('vamp', game.pathImg+'test/monstre.png', 64, 64, 30);
        game.load.spritesheet('etoile',game.pathImg+'test/etoile.png',40,40,6);

        game.load.audio('humph', [game.pathImg+'test/17062_01.ogg',game.pathImg+'test/17062_01.mp3',game.pathImg+'test/17062_01.m4a']);
        game.load.audio('proutch', [game.pathImg+'test/326_01.ogg',game.pathImg+'test/326_01.mp3',game.pathImg+'test/326_01.m4a']);
        game.load.audio('pouet', [game.pathImg+'test/312_01.ogg',game.pathImg+'test/312_01.mp3',game.pathImg+'test/312_01.m4a']);
        game.load.audio('rot', [game.pathImg+'test/9679_01.ogg',game.pathImg+'test/9679_01.mp3',game.pathImg+'test/9679_01.m4a']);
        game.load.audio('bling', [game.pathImg+'test/4139_01.ogg',game.pathImg+'test/4139_01.mp3']);
        */

    },
    create:function(){

      game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
      game.scale.pageAlignHorizontally = true;
      //game.renderer.renderSession.roundPixels = true;  // for pixel art
      //Phaser.Canvas.setImageRenderingCrisp(game.canvas);
      game.scale.refresh();

    },
    updateProgressBar:function (progress, cacheID, success, filesloaded, totalfiles){

        //console.log('progress : ' + progress);
        /*
        console.log('cacheID : ' + cacheID);
        console.log('success : ' + success);
        console.log('filesloaded : ' + filesloaded);
        console.log('totalfiles : ' + totalfiles);
        */
        game.processLoader(progress);

        //this.loadingLabel.text='Loading : ' + progress + ' %';
        //this.levelpr.lineTo(progress*2, 0);

    },

    loadcomplete:function(){
      game.destroyLoader();
      game.state.start('menu',true,false);
    }

};
