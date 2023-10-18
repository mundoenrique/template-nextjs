'use client';

import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material';
import {

	useEffect,
	useRef,
	useState,
} from 'react';
import { Stream } from 'stream';

export default function Cam() {
	const [enableVid, setEnableVid] = useState(false);
	const [front, setFront] = useState(false);
	const videoRef:any = useRef(null);

	const enablePlay = () => {
		var constraints = {
			audio: false,
			video: {
				width: { ideal: 640 },
				height: { ideal: 300 },
				facingMode: front ? 'environment' : 'user',
			},
		};
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(function (stream) {
				console.log(stream.getVideoTracks()[0].getSettings());
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
					videoRef.current.onloadedmetadata = function (e: any) {
						videoRef.current.play();
					};
				}
			})
			.catch(function (err) {
				console.log(err.name + ': ' + err.message);
			});
	};


	useEffect(() => {
		if (enableVid) {
			enablePlay();
		} else if (videoRef.current.srcObject) {
			console.log(videoRef.current.srcObject);
			videoRef.current.srcObject.getTracks().forEach((track: Stream) => {
				console.log(track)
				track.stop(track);
			});
		}
	}, [enableVid, front]);
	return (
		<>
			<Box sx={{ background: 'rgb(245,245,245)' }}>
				<FormGroup>
					<FormControlLabel
						control={
							<Switch
								onClick={() => {
									setEnableVid((val) => !val);
								}}
							/>
						}
						label="Encender"
					/>
					<FormControlLabel
						control={
							<Switch
								onClick={() => {
									setFront((val) => !val);
								}}
							/>
						}
						label="Cámara"
					/>
				</FormGroup>
				<Box sx={{ width: 600 }}>
					<video
						ref={videoRef}
						style={{ maxWidth: 600 }}
						poster="https://placehold.co/600x400"
					></video>
				</Box>
			</Box>
		</>
	);
}
