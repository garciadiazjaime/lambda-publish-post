const { handler: lambda } = require('./index')

async function main() {
  const event = {
    queryStringParameters: {
      imageURL: 'https://res.cloudinary.com/mintitmedia/image/upload/v1640930832/feedmechicago/2740617962824618112_31374150.jpg'
    }
  }

  const response = await lambda(event)
  console.log({response})
}

main().then(() => {
  console.log('end')
})
