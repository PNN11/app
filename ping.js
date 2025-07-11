const { default: axios } = require('axios')

require('dotenv').config()

axios.get(`https://www.google.com/ping?sitemap=${process.env.NEXT_PUBLIC_ORIGIN}/sitemap.xml`)
