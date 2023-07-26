const PORT = 5500
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const vanGogh = express()

// I know these should be in one array. Wasn't sure how to get them there without compromising current results. 
// Def something with searching in specific classes ex: '.kltat' and '.BA0A6c'
const url = 'https://raw.githubusercontent.com/serpapi/code-challenge/master/files/van-gogh-paintings.html'
axios(url)
    .then(response => {
        const vanHTML = response.data
        // console.log(vanHTML)
        const cheerioHTML = cheerio.load(vanHTML)
        const results = []
        const urls = []

        
        cheerioHTML('.kltat', vanHTML).each(function(){
            const title = cheerioHTML(this).text()
            // const url = cheerioHTML(this).find('.BA0A6c').attr('https')
            // const url = cheerioHTML(this).find('img').attr('data-src')
            results.push({
                title,
                // url,
            })
        })
        console.log(results)

        cheerioHTML('.BA0A6c', vanHTML).each(function(){
            const url = cheerioHTML(this).find('img').attr('data-src')
            urls.push({
                url,
            })
        })
        console.log(urls)

    }) .catch(err => console.log(err))


vanGogh.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

