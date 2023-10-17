import {getCaptures, getCredits, creatCapture, uploadCapture, triggerCapture, getACapture} from "/src/api/index.js";

function chooseFiles() {
    const fileInput = document.querySelector('input[type="file"]');

    fileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(e) {
        const file = e.target.files[0];
        console.log(file)

        // 读取文件
        readFile(file);
    }


}

function readFile(file) {

    const url = URL.createObjectURL(file);

    const video = document.getElementById('preview');
    video.src = url;

    video.play();
}

chooseFiles()

function addListenUploadConfirm() {
    const btn = document.getElementById('confirm');
    btn.addEventListener('click', e => {

        // triggerCapture('test')
        // return
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        if (!file || file.size < 1) {
            window.alert('上传文件错误')
        }
        capture(file).then(value => {

        })

    })
}

addListenUploadConfirm()

async function capture(file, title) {
    const credits = await getCredits()
    if (!credits || credits?.remaining === 0) {
        window.alert(JSON.stringify(credits, null, 2))
    }
    title = title || file.name
    const creatCaptureRes = await creatCapture(title)
    const signedUrls = creatCaptureRes.signedUrls.source
    const slug = creatCaptureRes.capture.slug

    // const fileContent = await getFileContent(file)
    const form  = new FormData()
    form.append('file', file)
    form.append('url', signedUrls)
    await uploadCapture(form)
    const triggerCaptureRes = await triggerCapture(slug)
    await queryLoop()

    async function queryLoop() {
        const getACaptureRes = await getACapture(slug)
        const progress = getACaptureRes.latestRun.progress
        if (progress<100) {
            const process = document.getElementById("process")
            process.style.display= 'block'
            process.style.fontSize = '50px'
            process.innerText = '当前进度'+progress+'/100'
            setTimeout(() => {
                process.style.display = 'none'
                queryLoop()
            }, 1000*5)
        } else {
            const span = document.createElement("span")
            span.style.fontSize = '50px'
            span.style.position = 'fixed'
            span.innerText = '完成'
            document.body.appendChild(span)
            setTimeout(() => {
                span.remove()
            }, 1000)
            const getCapturesRes = await getCaptures()
            for (let capture of getCapturesRes.captures) {
                if (slug !== capture.slug) {
                    continue
                }
                const embedUrl = capture.embedUrl;
                if (!embedUrl) continue
                const app = document.querySelector('.right');
                const htmliFrameElement = document.createElement('iframe');
                htmliFrameElement.src = embedUrl
                htmliFrameElement.width = '400px'
                htmliFrameElement.height = '225px'
                app.appendChild(htmliFrameElement)
            }
        }
    }

}

function progress() {
    const btn = document.getElementById('progress');
    btn.addEventListener('click', e => {
        //'fd7f83a0-c2b4-47c0-b5aa-c08d88ce03fe'
        // getACapture('8998e193-e2da-418a-b19c-bb27bd2c7f49').then()
        getCaptures().then()

    })
}
progress()


// function uploadSin() {
//     const btn = document.getElementById('upload');
//     btn.addEventListener('click', e => {
//         //'fd7f83a0-c2b4-47c0-b5aa-c08d88ce03fe'
//         const fileInput = document.querySelector('input[type="file"]');
//         const form  = new FormData()
//         form.append('file', file)
//         form.append('url', signedUrls)
//         console.log('url', signedUrls)
//         uploadCapture(form).then()
//     })
// }
// uploadSin()

// getCredits()
getCaptures().then(res => {
    for (let capture of res.captures) {
        const embedUrl = capture.embedUrl;
        if (!embedUrl) continue
        const app = document.querySelector('.right');
        const htmliFrameElement = document.createElement('iframe');
        htmliFrameElement.src = embedUrl
        htmliFrameElement.width = '600px'
        htmliFrameElement.height = '400px'

        app.appendChild(htmliFrameElement)
    }
})
