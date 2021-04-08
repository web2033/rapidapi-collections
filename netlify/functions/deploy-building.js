// AWS_LAMBDA_JS_RUNTIME = 'nodejs14.x'
const fetch = require('node-fetch')

exports.handler = async event => {
  const { host } = event.headers

  try {
    await fetch(
      process.env.TELEGRAM_BOT +
        'sendMessage?chat_id=-379128705&text=Building ' +
        host
    )
    return {
      statusCode: 200,
      body: 'Ok',
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 400,
      body: 'Something went wrong',
    }
  }
}
