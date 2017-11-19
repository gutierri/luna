let $ = (_e) => document.querySelector(_e);

var video =  $('video');
var canvas = $('canvas');
    canvas.width = 480;
    canvas.height = 360;
let button_scann_photo = $(".scan__qrcode");
let button_cancel_scann = $(".cancel__scann");
let line_scann = $(".square-qrcode");
let wrapper_video = $(".camera__background");

let change_view = (options, callback) => {
  let class_hidde = "d-none";

  if (options.to == 'scanner') {
    / * DOM Elements */
    if (line_scann.classList.contains(class_hidde)) {
      wrapper_video.classList.remove(class_hidde);
      line_scann.classList.remove(class_hidde);
      button_cancel_scann.classList.remove(class_hidde);
      button_scann_photo.classList.add(class_hidde);
      callback();
    }
  }

  if (options.to == 'take') {
     / * DOM Elements */
    if (!line_scann.classList.contains(class_hidde)) {
      wrapper_video.classList.add(class_hidde);
      line_scann.classList.add(class_hidde);
      button_cancel_scann.classList.add(class_hidde);
      button_scann_photo.classList.remove(class_hidde);
      callback();
    }
  }

  if(options.message) {
    let message_element = $(".message");
    message_element.innerHTML = options.message;
    message_element.classList.remove(class_hidde);

    setTimeout(() => {
      message_element.classList.add(class_hidde);
    }, 3000)
  }
}

let start_scanner = () => {
  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true
  }).then((stream) => {
    video.srcObject = stream;
  })
  .then(() => {
    const attemps = 10;
    let cleartimeout_finish = false;
    let count = 0;
    /* QRCODE */
    let _ = 4;

    let take_picture = setInterval(() => {
      let canvas_context = canvas.getContext('2d');
      canvas_context.drawImage(video, 0, 0, canvas.width, canvas.height);
      count++;

      if (count > attemps) {
        let options = { to: 'take', message: 'Could not find any pattern' };
        change_view(options, stop_scanner);
        cleartimeout_finish = true;
      } else {
        /* Logica de QR CODE */
        if (count === _) {
          let options = { to: 'take' };
          cleartimeout_finish = true;

          axios.post('/api/v1/qrcodes/', {
            data: 'Fake Data', device: 1
          }).then((e) => {
            options.message = 'Code saved!';
            change_view(options, stop_scanner);
          }).catch((e) => {
            console.log(e);
            options.message = 'Server error!';
            change_view(options, stop_scanner);
          });
        }
      }

      if (cleartimeout_finish) {
        clearTimeout(take_picture)
      }
    }, 500);
  })
  .catch((e) => {
    let options = { to: 'take', message: 'Could not find any pattern' };
    change_view(options, stop_scanner);
  });

}

let stop_scanner = () => {
  if (video.srcObject) {
    let tracks = video.srcObject.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
  }
  video.srcObject = null;
}

button_scann_photo.addEventListener("click", (e) => {
  let options = { to: 'scanner' };
  change_view(options, start_scanner);
})

button_cancel_scann.addEventListener("click", (e) => {
  let options = { to: 'take', message: 'Canceled' };
  change_view(options, stop_scanner);
})
