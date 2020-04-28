const fs = require('fs')
fs.writeFileSync('./src/.env', `AWS_KEY=ABC123\nAWS_C_KEY=${process.env.AWS_C_KEY}\n`)
