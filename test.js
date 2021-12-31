const { handler: lambda } = require('./index')

async function main() {
  const event = {
    queryStringParameters: {
      imageURL: 'http://res.cloudinary.com/mintitmedia/image/upload/v1640927236/feedmechicago/2740594444254477998_43124743.jpg'
    }
  }

  const response = await lambda(event)
  console.log({response})
}

main().then(() => {
  console.log('end')
})
