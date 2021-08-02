import _card from "../assets/audio/card.mp3";
import _error from "../assets/audio/error.mp3";
import _draw from "../assets/audio/draw.mp3";
import _loss from "../assets/audio/loss.mp3";
import _win from "../assets/audio/win.mp3";

function audio(src) {
	const instance = new Audio(src);
	return () => {
		console.log(instance.currentTime);
		instance.volume = 1;
		instance.currentTime = 0;
		instance.play();
		window.audio = instance;
	};
}

export const card = audio(_card);

export const error = audio(_error);

export const draw = audio(_draw);

export const loss = audio(_loss);

export const win = audio(_win);

function sleep(ms) {
	return new Promise(s => setTimeout(s, ms));
}

window.test = async () => {
	await sleep(5000);
	card();
	error();
	draw();
	loss();
	win();
}
