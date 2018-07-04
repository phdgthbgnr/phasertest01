
var manageEvents = {
    myevents : new Array(),
    $dc: function (id){
        var elem = null;
        if (document.getElementById(id) !== null) elem = document.getElementById(id);
        if(elem == null) console.log('%cERREUR : id "' + id + '" introuvable','color:#ff1d00;font-weight:bold');
        return elem;
    },
    // c et t = current et total images chargées pour manageEventsImageLoader
	// e = event
	// trgt = target where the eventis applied
	// target = current target (where click is fired)
    // si capture == true : evenement est capture et n'est plus passé
    listen:function (e, trgt, callback, capture, c ,t){ // c et t = current et total images chargées pour manageEventsImageLoader
        e = e || window.event;
        if(capture){
            if(e.preventDefault){
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.returnValue = false;
                e.cancelBubble = true;
            }
        }
        var target = e.target || e.srcElement;
        if (callback) callback(e, trgt, target, c, t);
    },
    listenerAdd: function(id, evt, callback, capture, c, t){
        var elem = id !== window && id !== document && id != '[object HTMLImageElement]' ? this.$dc(id) : id;
        try{
            elem.addEventListener = elem.addEventListener || function (e, f) { elem.attachEvent('on' + e, f); };
            //manageEvents.myevents._addEvt({id:id, evt:evt, event:callback});
            elem.addEventListener(evt, function _events(e){
                manageEvents.myevents._addEvt({id:id, evt:evt, event:arguments.callee});
                manageEvents.listen(e, this, callback, capture, c, t);
            },capture);
            elem.removeEventListener = elem.removeEventListener || function (e, f) { elem.detachEvent('on' + e, f); };
        }catch(e){
            console.log('%cERREUR : id "' + id + '" introuvable','color:#ff4e00;font-weight:bold');
            console.log(e);
            console.log('%c---------------------------','color:#ff4e00');
        }
       
    },
    listenerRemove: function (id, evt, cpt){
        var curEvt = this.myevents._remEvt({id:id, evt:evt});
        var elem = id !== window && id !== document ? this.$dc(id) : id;
        if (curEvt) {
            try{
                if(cpt == true){
                    elem.removeEventListener(evt, curEvt, true);
                }else{
                    elem.removeEventListener(evt, curEvt, false);
                }
                if(cpt === undefined) elem.removeEventListener(evt, curEvt);
            }catch(e){
                console.log('%cERREUR : id "' + id + '" introuvable','color:#ff4e00');
                console.log(e);
                console.log('%c---------------------------','color:#ff4e00');
            }
        }
    },
    forceRemove: function(id, evt, func, cpt){
        var elem = id !== window && id !== document ? this.$dc(id) : id;
        try{
            if(cpt == true){
                elem.removeEventListener(evt, func, true);
            }else{
                elem.removeEventListener(evt, func, false);
            }
            if(cpt === undefined) elem.removeEventListener(evt, func);
        }catch(e){
            console.log('%cERREUR : id "' + id + '" introuvable','color:#ff4e00');
            console.log(e);
            console.log('%c---------------------------','color:#ff4e00');
        }
    }
}


if (!Array.prototype._addEvt){
    Array.prototype._addEvt = function(o){
        res = false;
        for(var t in this){
            if(this[t].id==o.id && this[t].evt==o.evt) res = true;
        }
        if(!res) this.push(o);
    }
}


if(!Array.prototype._remEvt){
    Array.prototype._remEvt = function(o){
        var res = false;
        var index = this._searchEvt(o);
        if(index != -1){
            var res = this[index];
            this.splice(index, 1);
        }
        if(typeof res === 'object'){
            return res.event;
        }else{
            return false;
        }
    }
}


if(!Array.prototype._searchEvt){
    Array.prototype._searchEvt = function(what, i) {
        i = i || 0;
        var L = this.length;
        while (i < L) {
            if(this[i].id === what.id && this[i].evt === what.evt) return i;
            ++i;
        }
        return -1;
    };
}
