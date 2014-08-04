var observer = (function() {
	
	"use strict";
	
	var observables = [];
	var stateActions = {};
	
	function setState(ob, state, pause, play) {
		//private
		if (typeof(state) === "number") {
			
			observables[ob].state = state;
			
			if (observables[ob].state === 1) {
				
				pause();
				
			} else {
				
				play();
			
			}
		
		}
		
	}
	
	function handler(event){
		
		var type = event.type;
		var state = type === 'pause' ? 1 : 0;
			
		setState(0, state, stateActions.pause, stateActions.play);
		
	}
	
	return {
		
		addObservable: function(obj) {
			
			
			observables.push({state: 1, source: obj});//need to add handling for multiple
			
		},
		
		listObservables: function() {
			
			return observables;
			
		},
		
		destroyObservables: function() {
			
			observables.forEach(function(item){
				
				item.source.removeEventListener('pause', handler, false);
				item.source.removeEventListener('play', handler, false);
			
			});
			
			observables.length = 0;
			
		},
		
		observe: function(pause, play) {
			
			/*var i = 0,
				l = observables.length;*/
			
			//for (; i < l; i++){
			
			var observed = observables[0].source;
			
			stateActions.pause = pause;
			stateActions.play = play;
		
			observed.addEventListener('pause', handler, false);
			observed.addEventListener('play', handler, false);
		
			//}
				
			
		}
		
	};
	
})();
