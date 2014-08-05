#WebRTC-VideoSync

This project is a simple example of syncing video across multiple browsers using
the client side peer-to-peer connection known as WebRTC. It uses [PeerJS](http://peerjs.com/)
to make WebRTC easier and cross browser. In it's current state: both browsers/clients have
to open up a video (the same video), and enter a number to sync them to their partner.
It also only works with one-on-one interactions right now, in the future I plan on
making it so you can connect multiple machines together.

##Getting this running
To use this you pretty much just have to go into `script.js` and add
your PeerJSkey to `peer = new Peer({key: ''}),`. This will allow you to connect to
PeerJS as your signaling server to connect the two machines. From there you just open
your browser (may requre a local server) and either share your pin, or have someone share their
pin to get started.


At the moment the key is pulled in via a `key.js` file in the `js` directory. Create one with the following
json structure: `{"key": "yourkeyhere"}`
