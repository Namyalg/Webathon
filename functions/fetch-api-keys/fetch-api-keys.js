const handler = async (event) => {
  try {

    const API_SECRET = process.env.apiKey
    const AUTH_DOMAIN = process.env.authDomain
    const PROJ_ID = process.env.projectId
    const STRG_BUCK = process.env.storageBucket
    const MSG_SND = process.env.messagingSenderId
    const APP_ID = process.env.appId
    const MSRT_ID = process.env.measurementId
    const YOUTUBE_API_KEY = process.env.YoutubeKey
    const DB_URL = process.env.databaseURL
    return {
      statusCode: 200,
      //body : JSON.stringify({"apikey" : API_SECRET, "authDomain" : process.env.authDomain})
      //body : JSON.stringify(API_SECRET),
      body: JSON.stringify({
                            "apiKey" : API_SECRET,
                            "authDomain" : AUTH_DOMAIN, 
                            "projectId" : PROJ_ID, 
                            "storageBucket" : STRG_BUCK, 
                            "messagingSenderId" : MSG_SND, 
                            "appId" : APP_ID,
                            "measurementId" : MSRT_ID,
                            "databaseURL" : DB_URL,
                            "YoutubeKey" : YOUTUBE_API_KEY}),
      //body : JSON.stringify({"apikey" : API_SECRET}),
      //body: API_SECRET,
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }