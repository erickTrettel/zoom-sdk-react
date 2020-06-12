import { ZoomMtg } from '@zoomus/websdk'
import crypto from 'crypto'

ZoomMtg.setZoomJSLib('https://dmogdx0jrul3u.cloudfront.net/1.4.2/lib', '/av');
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

function generateSignature(apiKey, apiSecret, meetingNumber, role) {
  // Prevent time sync issue between client signature generation and zoom 
  const timestamp = new Date().getTime() - 30000
  const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64')
  const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64')
  const signature = Buffer.from(`${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64')

  return signature;
}

export function getSignature(meetConfig) {
  try {
    const signature = generateSignature(meetConfig.apiKey, process.env.API_SECRET, meetConfig.meetingNumber, 1);

    ZoomMtg.init({
      leaveUrl: meetConfig.leaveUrl,
      success: function () {
        ZoomMtg.join({
          signature,
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          apiKey: meetConfig.apiKey,
          // Email required for Webinars
          userEmail: meetConfig.userEmail,
          // password optional; set by Host
          passWord: meetConfig.passWord,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: function (err) {
        console.log('error', err);
      }
    })
  } catch (e) {
    console.log('erro', e)
  }
}
