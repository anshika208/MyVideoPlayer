const player=document.querySelector(".player");
const video=player.querySelector(".viewer");
const progress= player.querySelector(".progress");
const progressBar= player.querySelector(".progress__filled");
const toggle= player.querySelector(".toggle");
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//building functions

function togglePlay(){
	if(video.paused){
		video.play();
	}
	else
	{
		video.pause();
	}
}


function updateButton(){
	const icon = this.paused ? "►" : "||";
	toggle.textContent = icon;

}


function skipUpdate()
{ 
console.log(this.dataset.skip);
video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate()
{
	console.log(this.value);
     video[this.name]= this.value;
}

function handleProgress()
{
	const percent= (video.currentTime/video.duration) * 100;
	progressBar.style.flexBasis= `${percent}%`;
}
function passing(e)
{
	console.log(e);
	const pass= (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime += pass;
	console.log(video.currentTime);

}


video.addEventListener("click" , togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause" , updateButton);
toggle.addEventListener("click" , togglePlay);
skipButtons.forEach(button=>button.addEventListener("click", skipUpdate));
ranges.forEach(input=>input.addEventListener("click", handleRangeUpdate));
video.addEventListener("timeupdate" , handleProgress);

let mousedown = false;
progress.addEventListener("click" , passing);
progress.addEventListener("mousemove" , (e)=> mousedown && passing(e));
progress.addEventListener("mousedown" , ()=> mousedown= true);
progress.addEventListener("mouseup", ()=> mousedown = false);