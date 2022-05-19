import React, { useEffect, useState, memo, useRef } from "react";
import { Stage, Layer, Image, Text } from "react-konva";

const Canvas = ({ show }) => {
	const [image, setImage] = useState(new window.Image());
	useEffect(() => {
		loadImage();
	}, []);

	const loadImage = () => {
		image.src =
			"https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
		image.onload = () => {
			setImage(image);
		};
	};
	//video
	const usePreview = (url) => {
		const [canvas, setCanvas] = useState(null);

		useEffect(() => {
			const video = document.createElement("video");
			video.src = url;
			const onLoad = () => {
				const canvas = document.createElement("canvas");
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				video.currentTime = 1;
				const ctx = canvas.getContext("2d");
				ctx.drawImage(video, 0, 0);
				setCanvas(canvas);
			};
			video.addEventListener("canplay", onLoad);
			return () => video.removeEventListener("load", onLoad);
		}, [url]);

		return canvas;
	};

	const video = useRef();
	const imageRef = useRef();
	const anim = useRef();

	const [isPlaying, setPlaying] = useState(false);

	const preview = usePreview(
		"https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm"
	);
	useEffect(() => {
		anim.current = new window.Konva.Animation(() => {
			imageRef?.current?.image(video?.current);
		}, imageRef?.current?.getLayer());
	}, [imageRef]);
	useEffect(() => {
		if (isPlaying) {
			video?.current?.play();
			anim?.current?.start();
		} else {
			video?.current?.pause();
			anim?.current?.stop();
		}
	}, [isPlaying]);
	return (
		<div>
			<button
				onClick={() => {
					setPlaying(true);
					video?.current?.play();
					anim?.current?.start();
				}}
			>
				Play
			</button>
			<button
				onClick={() => {
					video?.current?.pause();
					anim?.current?.stop();
				}}
			>
				Pause
			</button>
			<button
				onClick={() => {
					video.current.stop();
					anim.current.stop();
				}}
			>
				Stop
			</button>
			<video
				style={{ display: "none" }}
				ref={video}
				src="https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c4/Physicsworks.ogv/Physicsworks.ogv.240p.vp9.webm"
			/>
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer>
					{show && <Text text="HI" />}

					<Image x={100} y={200} image={image} width={200} height={100} />
					<Image
						x={100}
						y={100}
						ref={imageRef}
						width={200}
						height={100}
						stroke="black"
						image={isPlaying ? video.current : preview}
					/>
				</Layer>
			</Stage>
		</div>
	);
};

export default Canvas;
