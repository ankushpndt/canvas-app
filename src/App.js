import "./App.css";
import Canvas from "./Canvas";
import React, { useState } from "react";

function App() {
	const initialShape = [
		{
			x: 10,
			y: 10,
			width: 100,
			height: 100,

			id: "image1",
		},
	];

	const [show, setShow] = useState(false);
	return (
		<div className="App">
			<h1>Canvas</h1>
			<button onClick={() => setShow(!show)}>Show text </button>

			<Canvas shapeProps={initialShape} show={show} />
		</div>
	);
}

export default App;
