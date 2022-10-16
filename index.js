var videoSource = ['dda4.mp4', 'dda3.mp4',  'dda6.mp4' ] 

let key = 0; // global
const videoCount = videoSource.length;
const element = document.getElementById("myVideo");
 

function playVideo(videoNum) {
    element.setAttribute("src", videoSource[videoNum]);
    console.log(element);
    element.setAttribute("type",'video/mp4');
    element.autoplay = true;
    element.load();
    element.play();
}

document.getElementById('myVideo').addEventListener('ended', myFunctionHandle, false);
 
function myFunctionHandle() {
    key++;
    if (key == videoCount) {
        key = 0;
        playVideo(key);
    } else {
        playVideo(key);
    }
}