(function() {

var output = document.createElement('div');
output.className = 'output';

function log(text) {
    output.innerHTML += text + '<br/>';
    console.log(text);
}

function logTitle(text) {
    output.innerHTML += '<h3>' + text + '</h3>';
    console.log(text);
}

var htmlElementProps = [];

var knownAudioElementProps = [];

var knownVideoElementProps = [
    'width', 'height',
    'videoWidth', 'videoHeight',
    'poster',
    'onenterpictureinpicture',
    'onleavepictureinpicture',
    'requestPictureInPicture',
    'requestVideoFrameCallback',
    'getVideoPlaybackQuality',
    'playsInline',
    'disablePictureInPicture',
    'cancelVideoFrameCallback'
];

var knownMediaElementProps = [
    'HAVE_CURRENT_DATA',
    'HAVE_ENOUGH_DATA',
    'HAVE_FUTURE_DATA',
    'HAVE_METADATA',
    'HAVE_NOTHING',
    'NETWORK_EMPTY',
    'NETWORK_IDLE',
    'NETWORK_LOADING',
    'NETWORK_NO_SOURCE',
    'addTextTrack',
    'autoplay',
    'audioTracks',
    'buffered',
    'canPlayType',
    'captureStream',
    'controls',
    'controlsList',
    'crossOrigin',
    'currentSrc',
    'currentTime',
    'defaultMuted',
    'defaultPlaybackRate',
    'disableRemotePlayback',
    'duration',
    'ended',
    'error',
    'getVideoPlaybackQuality',
    'load',
    'loop',
    'mediaKeys',
    'muted',
    'networkState',
    'onencrypted',
    'onwaitingforkey',
    'pause',
    'paused',
    'play',
    'playbackRate',
    'played',
    'preload',
    'preservesPitch',
    'readyState',
    'remote',
    'seekable',
    'seeking',
    'setMediaKeys',
    'setSinkId',
    'sinkId',
    'src',
    'srcObject',
    'textTracks',
    'videoTracks',
    'volume'
];

var mediaElementProps = [];
var specificAudioElementProps = [];
var specificVideoElementProps = [];
var specificMediaElementProps = [];

document.body.appendChild(output);

var videoElement = document.createElement('video');
var audioElement = document.createElement('audio');

var htmlElementProto = videoElement.__proto__.__proto__.__proto__;
for (var i in htmlElementProto) {
    htmlElementProps.push(i);
}

var mediaElementProto = videoElement.__proto__.__proto__;
for (var i in mediaElementProto) {
    if (htmlElementProps.indexOf(i) !== -1) {
        continue;
    }

    mediaElementProps.push(i);
}

for (var i in mediaElementProto) {
    if (htmlElementProps.indexOf(i) !== -1) {
        continue;
    }

    if (knownMediaElementProps.indexOf(i) !== -1) {
        continue;
    }

    specificMediaElementProps.push(i);
}

for (var i in audioElement.__proto__) {
    if (htmlElementProps.indexOf(i) !== -1) {
        continue;
    }

    if (knownAudioElementProps.indexOf(i) !== -1) {
        continue;
    }

    if (mediaElementProps.indexOf(i) !== -1) {
        continue;
    }

    specificAudioElementProps.push(i);
}

for (var i in videoElement.__proto__) {
    if (htmlElementProps.indexOf(i) !== -1) {
        continue;
    }

    if (knownVideoElementProps.indexOf(i) !== -1) {
        continue;
    }

    if (mediaElementProps.indexOf(i) !== -1) {
        continue;
    }

    specificVideoElementProps.push(i);
}

specificAudioElementProps.sort();
specificVideoElementProps.sort();
specificMediaElementProps.sort();

log('UserAgent: ' + navigator.userAgent);

logTitle('HTMLAudioElement properties:');
if (specificAudioElementProps.length) {
    for (var i = 0; i < specificAudioElementProps.length; i++) {
        log(specificAudioElementProps[i] + ': ' + (typeof audioElement[specificAudioElementProps[i]]));
    }
} else {
    log('none');
}

logTitle('HTMLVideoElement properties:');
if (specificVideoElementProps.length) {
    for (var i = 0; i < specificVideoElementProps.length; i++) {
        log(specificVideoElementProps[i] + ': ' + (typeof videoElement[specificVideoElementProps[i]]));
    }
} else {
    log('none');
}

logTitle('HTMLMediaElement properties:');
if (specificMediaElementProps.length) {
    for (var i = 0; i < specificMediaElementProps.length; i++) {
        log(specificMediaElementProps[i] + ': ' + (typeof videoElement[specificMediaElementProps[i]]));
    }
} else {
    log('none');
}

})();
