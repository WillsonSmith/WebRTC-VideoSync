(function(){

	function HttpConnect(method, location) {

		var request = new XMLHttpRequest(),
		response;

		request.open(method, location, false);
		request.send();

		if (request.status === 200) {

			response = request.responseText;

		}

		this.respond = function() {

			return response;

		};

	}

	var keyConnect = JSON.parse(new HttpConnect('GET', 'js/key.js').respond()).key;

	var peer = new Peer({key: keyConnect}),//your peerjs key
		conn,
		connected = false;

	function connect(id){
		//check if connection appears, add connection/make new if need be.
		//may have to rewrite to be easier to create multiple connections.
		if (!connected){
			conn = peer.connect(id);
			connected = true;
			//should make more elaborate for multi-connections
			//eg. check if in array of connections

			conn.on('open', function() {

				// Send messages
				conn.send('initial connection established...');

				//conn.close();
			});

			conn.on('error', function(error){

				console.log(error);
			});
		}

	}

	function createVideo(vidElement, file){

		var vidElem = vidElement ? vidElement : document.createElement('video'),
			elemSrc = vidElem.getElementsByTagName('source')[0],
			source = elemSrc ? elemSrc : document.createElement('source'),
			url = URL.createObjectURL(file);

		vidElem.setAttribute('controls', 'controls');

		if (!elemSrc){

			vidElem.appendChild(source);
			document.getElementById('container').appendChild(vidElem);
			//console.log(vidElem, document.getElementsByTagName('video')[0]);

		}

		source.setAttribute('src', url);
		vidElem.load();

	}

	function sendAction(action){

		if (conn){

			conn.send(action);

		}else{

			console.log('please establish connection');

		}

	}


	function handleFileSelect(evt) {
		"use strict";

		var files = evt.target.files,
			file = files[0];

		if (file.type.match('video.mp4')){

			createVideo(document.getElementsByTagName('video')[0], file);

			//check if being observed.

			if (observer.listObservables().length === 0){

				observer.addObservable(document.getElementsByTagName('video')[0]);

				observer.observe(function(){
					sendAction('pause');
					},
					function(){
						sendAction('play');
					});

			}

		}else{

			console.log('not an mp4 video');

		}

	}

	peer.on('open', function(id) {
		document.title = id;
		document.getElementById('userid').innerHTML = id;
		//console.log('peer id is: ' + id);
	});


	peer.on('connection', function(conn){

		console.log('connected ', conn);
		connect(conn.peer);

		conn.on('data', function(data){

			//add data for time syncing
			//console.log(data);
			if (data === 'play'){

				document.getElementsByTagName('video')[0].play();

			}
			if (data === 'pause'){

				document.getElementsByTagName('video')[0].pause();

			}

		});
		//conn.send('test');

	});

	//may clean this up
	document.getElementById('files').addEventListener('change', handleFileSelect, false);

	document.getElementById('connectForm').addEventListener('submit', function(e){

		e.preventDefault();

		var id = document.getElementById('connectID').value;
		//console.log(id);

		connect(id);

	});

})();
