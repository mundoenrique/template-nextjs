'use client';

import { useEffect, useRef } from 'react';

export default function Cam() {
	const myRef = useRef(null);
	useEffect(() => {
		/*	if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(function (stream) {
					video.current.src = window.URL.createObjectURL(stream);
					video.play();

					video.addEventListener(
						'loadeddata',
						function () {
							// Video is loaded and can be played
							canvas.width = video.videoWidth;
							canvas.height = video.videoHeight;
						},
						false
					);
				});
}*/

		var vid = navigator.mediaDevices.getUserMedia({
			audio: false,
			video: true,
		});

		vid.then(function (mediaStream) {
			var video = myRef.current;
			video.srcObject = mediaStream;
			video.onloadedmetadata = function (e) {
				// Do something with the video here.
			};
		});
	}, []);
	return (
		<>
			<video ref={myRef}></video>
		</>
	);
}
