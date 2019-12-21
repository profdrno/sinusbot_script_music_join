registerPlugin({
	name: 'Play Music when Client enters',
	version: '1.0',
	description: 'Plays a specific music, when a specific client enters the channel where the music bot is in',
	author: 'Michael Feller admin@gewuerzcrew.eu',
	vars: [{
		name: "array",
		title: "Client/Track",
		type: "array",
		vars: [{
			name: "clientID",
			title: "Client UID",
			type: "string"
		},
		{
			name: "track",
			title: "Track",
			type: "track"
		},
		{
			name: "time",
			title: "Duration",
			type: "number",
			placeholder: 0
		}]
	}],
	autorun: false
}, (_, config, meta) => {
	var engine = require('engine');
	var backend = require('backend');
	var media = require('media');
	var event = require('event');
	
	event.on("clientMove", function(mi) {
		config.array.forEach(function(item) {
			if (item.clientID === mi.client.uid()) {
				if (mi.toChannel.id() === backend.getCurrentChannel().id()) {
					media.playURL(item.track.url);
					stopPlaying(item.time, item.track.url);
				}
			}
		});
	});
	
	function stopPlaying (time, track) {
		if (time > 0) {
			setTimeout(function() {
				let id = track.split("/");
				if (media.getCurrentTrack().id() === id[2] && time < media.getCurrentTrack().duration()) {
					media.stop(id[2]);
				}
			}, time);
		}
	}	
});