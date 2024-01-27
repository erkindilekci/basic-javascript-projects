const videoElement = document.getElementById('video');
const button = document.getElementById('button');

const selectMediaStream = async function () {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (e) {
        console.error(e);
    }
};

button.addEventListener('click', async () => {
    button.disabled = true;
    await videoElement.requestPictureInPicture();
    button.disabled = false;
});

selectMediaStream();