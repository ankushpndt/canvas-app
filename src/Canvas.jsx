import React, { useEffect, useState, useRef, useCallback } from "react";
import { Stage, Layer, Image, Text } from "react-konva";
import Konva from "konva";
const Canvas = ({ show }) => {
	const [image, setImage] = useState(new window.Image());
	const loadImage = useCallback(() => {
		image.src =
			"https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
		image.onload = () => {
			setImage(image);
		};
	}, [image]);
	useEffect(() => {
		loadImage();
	}, [loadImage]);

	//video

	const video = useRef();
	const imageRef = useRef();
	const anim = useRef();
	useEffect(() => {
		anim.current = new Konva.Animation(() => {
			imageRef.current.image(video.current);
		}, imageRef.current.getLayer());
	});
	console.log("child");
	return (
		<div>
			<button
				onClick={() => {
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
					video?.current?.pause();
					video.currentTime = 0;
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
					{show && (
						<Text
							text="Some text"
							x={20}
							y={50}
							fontSize={15}
							align="center"
							width={300}
						/>
					)}

					<Image x={100} y={200} image={image} width={200} height={100} />
					<Image
						x={100}
						y={100}
						ref={imageRef}
						width={200}
						height={100}
						stroke="black"
					/>
				</Layer>
			</Stage>
		</div>
	);
};

export default Canvas;
