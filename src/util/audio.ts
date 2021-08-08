import _card from "../assets/audio/card.mp3";
import _error from "../assets/audio/error.mp3";
import _draw from "../assets/audio/draw.mp3";
import _loss from "../assets/audio/loss.mp3";
import _win from "../assets/audio/win.mp3";

function audio(src: string) {
	const instance = new Audio(src);
	return () => {
		instance.volume = 1;
		instance.currentTime = 0;
		instance.play();
	};
}

export const card = audio(_card);

export const error = audio(_error);

export const draw = audio(_draw);

export const loss = audio(_loss);

export const win = audio(_win);
