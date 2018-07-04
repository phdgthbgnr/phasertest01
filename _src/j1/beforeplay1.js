var beforeState = {
    
    preload:function(){
        
        game.addDisplayLoader();

        game.load.onFileComplete.add(this.filecomplete, this);
        game.load.onLoadComplete.add(this.loadcomplete, this);

        game.load.image('sky2', game.pathImg+'jpg/sky2.jpg');
        game.load.image('freezer1', game.pathImg+'png/freezer1.png');
        game.load.image('readytxt', game.pathText+'readytoloose.png');
        game.load.image('tracking01', game.pathTrack+'pixel.gif?r=beforeplay');
        //game.load.spritesheet('go', '_img/go.png', 427, 98);
        game.load.spritesheet('easy', '_img/difficulty-easy.png',360,93);
        game.load.spritesheet('medium', '_img/difficulty-medium.png',360,93);
        game.load.spritesheet('expert', '_img/difficulty-expert.png',360,93);
        
    },

    create:function(){
        //game.niveau = 1;        // current level
        //game.freezerevol = 1;   // current evol freezer
        game.ptslifes = 100;    // pts  vie niveau 1
        game.freezerforce = 10;

        this.clicf = game.add.audio('clicf');
        
        var sky2 = game.add.sprite(0,0,'sky2');
        sky2.y = 0;
        game.set2Scale(sky2);

        game.addMusicButton();
        game.addPauseButton();

        var freezer1 = game.add.sprite(0,0,'freezer1');
        freezer1.y = 0;
        freezer1.alpha = 1;
        game.set2Scale(freezer1);

        var readytx = game.add.image(0,0,'readytxt');
        readytx.anchor.set(1,1);
        game.set2Scale(readytx);
        readytx.x = game.width-game.get1Position(20);
        readytx.y = game.get1Position(270);
        
        var bteasy = game.add.button(0,0,'easy', this.start, this, 1, 0, 2);
        bteasy.name='easy';
        game.set2ButtonScale(bteasy);
        game.set2Position(410, 270, bteasy);
        
        var btmedium = game.add.button(0,0,'medium', this.start, this, 1, 0, 2);
        btmedium.name='medium';
        game.set2ButtonScale(btmedium);
        game.set2Position(410, 350, btmedium);

        var btexpert = game.add.button(0,0,'expert', this.start, this, 1, 0, 2);
        btexpert.name='expert';
        game.set2ButtonScale(btexpert);
        game.set2Position(410, 430, btexpert);

        var tween1 = game.add.tween(freezer1).from( { x: -freezer1.width/2, alpha: 0 }, 300, "Sine.easeInOut");
        tween1.start();
    },

    start:function(e,p){
        var niveau = 1;
        switch(e.name){
            case 'easy':
            niveau = 1;
            break;
            case 'medium':
            niveau = 2;
            break;
            case 'expert':
            niveau = 3;
            break;

        }
        this.clicf.play('', 0, .3, false, true);
        game.state.start('play', true, false, {levelID:1, levelFrz:1, score:0, curpts:100, evolfrz:1, difficulty: niveau });
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