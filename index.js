const https = require('https');

const IgApiClient = require('instagram-private-api')

async function getBuffer(url) {
  return new Promise(resolve => {
    https.get(url, (res) => {
      const data = [];
      res.on('data', (chunk) => {
        data.push(chunk);
      }).on('end', () => {
        let buffer = Buffer.concat(data);
        resolve(buffer)
      });
    }).on('error', (err) => {
      resolve()
    });
  })
};

async function publishPost(imageBuffer) {
  if (!imageBuffer) {
    return null
  }

  const ig = new IgApiClient.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  await ig.publish.photo({
    file: imageBuffer,
    caption: 'here we go, and the light was made',
  });

  return true
}

exports.handler = async (event) => {
  const { imageURL } = event.queryStringParameters
  if (!imageURL) {
    return {
      statusCode: 500,
      body: JSON.stringify('imageURL empty'),
    }
  }

  const url = decodeURIComponent(imageURL)
  const imageBuffer = await getBuffer(url)
  const published = await publishPost(imageBuffer)

  return {
    statusCode: 200,
    body: JSON.stringify({imageURL:url}),
    published,
  }
};
