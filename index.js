const fetch = require('node-fetch');

const IgApiClient = require('instagram-private-api')

async function getBuffer(url) {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    return { error };
  }
};

async function publishPost(imageBuffer) {
  const ig = new IgApiClient.IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);

  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  const publishResult = await ig.publish.photo({
    file: imageBuffer,
    caption: 'finnaly here I am',
  });

  console.log(publishResult);
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

  await publishPost(imageBuffer)

  return {
    statusCode: 200,
    body: JSON.stringify({imageURL:url}),
  }
};
