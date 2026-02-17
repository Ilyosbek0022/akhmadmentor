// 'use client' shunchaki client component fayllarida ishlaydi
// utils/recorder.js
let recorder
let stream

export const startRec = async () => {
  if (typeof window === 'undefined') return // serverda ishlamasin
  stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  const RecordRTC = (await import('recordrtc')).default // dynamic import, SSR da import qilinmaydi

  recorder = new RecordRTC(stream, {
    type: 'audio',
    mimeType: 'audio/wav',
    recorderType: RecordRTC.StereoAudioRecorder,
    numberOfAudioChannels: 1
  })

  recorder.startRecording()
}

export const stopRec = () =>
  new Promise(async resolve => {
    if (typeof window === 'undefined') return resolve(null)
    recorder.stopRecording(() => {
      const blob = recorder.getBlob()
      stream.getTracks().forEach(t => t.stop())
      resolve(blob)
    })
  })
