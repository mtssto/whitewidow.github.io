var videoSource = ['video1.mp4','video2.mp4', 'video_3.mp4', 'video4.mp4'] 

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