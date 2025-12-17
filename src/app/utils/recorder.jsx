'use client'
import RecordRTC from 'recordrtc'

let recorder
let stream

export const startRec = async () => {
  stream = await navigator.mediaDevices.getUserMedia({ audio: true })

  recorder = new RecordRTC(stream, {
    type: 'audio',
    mimeType: 'audio/wav',
    recorderType: RecordRTC.StereoAudioRecorder,
    numberOfAudioChannels: 1
  })

  recorder.startRecording()
}

export const stopRec = () =>
  new Promise(resolve => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob()
      stream.getTracks().forEach(t => t.stop())
      resolve(blob)
    })
  })
