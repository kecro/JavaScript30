const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

const getVideo = () => {
	navigator.mediaDevices.getUserMedia({video : true, audio : false})
		.then(localMediaStream =>{
			video.src = window.URL.createObjectURL(localMediaStream)
			video.play()
		})
		.catch(error => alert('OH NO !!!' + error))
}

const paintToCanvas = () => {
	const width = video.videoWidth
	const height = video.videoHeight
	canvas.width = width
	canvas.height = height

	return setInterval(() => ctx.drawImage(video, 0, 0, width, height), 16)
}

const takePhoto = () => {
	snap.currentTime = 0
	snap.play()

	const data = canvas.toDataURL('images/jpeg')
	const link = document.createElement('a')
	link.href = data
	link.setAttribute('download', 'handsome')
	link.innerHTML = `<img src="${data}" alt="Photo" />`
	// link.textContent = 'Download Image'
	strip.insertBefore(link, strip.firstChild)
}

getVideo()
video.addEventListener('canplay', paintToCanvas)