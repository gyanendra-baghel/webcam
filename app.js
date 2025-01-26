const videoElement = document.getElementById("webcam");
const startButton = document.getElementById("startButton");
const pipButton = document.getElementById("pipButton");
let videoTrack;

const constraints = {
  video: {
    width: { ideal: 640 },
    height: { ideal: 640 },
    facingMode: "user",
  },
};

// Start webcam video stream and enable zoom control if supported
startButton.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = stream;
    videoTrack = stream.getVideoTracks()[0];

    pipButton.disabled = false;
  } catch (error) {
    console.error("Error accessing webcam:", error);
  }
});

// Enable Picture-in-Picture mode
pipButton.addEventListener("click", async () => {
  if (document.pictureInPictureElement) {
    await document.exitPictureInPicture();
  } else {
    try {
      await videoElement.requestPictureInPicture();
    } catch (error) {
      console.error("Error enabling Picture-in-Picture:", error);
    }
  }
});

// Update PiP button text based on PiP state
videoElement.addEventListener("enterpictureinpicture", () => {
  pipButton.textContent = "Disable PiP";
});
videoElement.addEventListener("leavepictureinpicture", () => {
  pipButton.textContent = "Enable PiP";
});
