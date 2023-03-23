const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');
const puppeteer = require("puppeteer");

let output_path = './';

module.exports = async function (req, res) {
    const type = req.query.type;
    if (!type) return;

    const base_url = "https://openai.com";
    let data = [];

    try {

        create_output_path(output_path);

        const page_data = await create_new_page();

        for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
            const url = base_url + '/blog?page=' + i;
            const blogs = await scrape_blogs(url, page_data.page);

            if (blogs.length < 1) break;

            blogs.forEach(e => data.push(e));
            console.log(`${i} page`);
        }
        await page_data.browser.close();

        const output = path.join(output_path, `blog.${type}`);

        if (type === 'csv') {
            data = convert_to_csv(data);
            fs.writeFileSync(output, data, { encoding: 'utf8' });
        }
        else if (type === 'json') {
            fs.writeFileSync(output, JSON.stringify(data, null, 2));
        }
        else {
            res.status(400).send('Invalid type');
            return;
        }
        console.log(`blog.${type} file is saved to ${output}`)
        res.status(200).download(output, `blog.${type}`);

    } catch (e) {
        res.status(500).send(e);
        console.error(e);
    }

    async function scrape_blogs(url, page) {
        let data = [];

        await page.goto(url, { waitUntil: 'networkidle0' });

        const html_data = await page.evaluate(() => document.documentElement.outerHTML);
        const $ = cheerio.load(html_data);

        const contents = $('ul[class="cols-container"]');

        const lists = $(contents).find('li');

        if (lists.length < 1) return data;

        lists.each((col_index, col_element) => {
            let blog = {};

            const url = $(col_element).find('a').attr('href');
            blog['url'] = base_url + url;

            const title = $(col_element).find('h3').text();
            blog['title'] = title;

            const date = $(col_element).find('span').text();
            blog['date'] = date;

            data.push(blog);
        })
        return data;
    }

    async function create_new_page() {

        const width = 1024;
        const height = 1600;

        const browser = await puppeteer.launch({
            headless: false,
            'defaultViewport': { 'width': width, 'height': height }
        });
        const page = await browser.newPage();

        return { page: page, browser: browser }
    }

    function create_output_path(output_path) {
        if (fs.existsSync(output_path)) return;
        fs.mkdirSync(output_path, { recursive: true })
    }

    function convert_to_csv(arr) {
        const array = [Object.keys(arr[0])].concat(arr)
        return array.map(row => {
            return Object.values(row).map(value => {
                return typeof value === 'string' ? JSON.stringify(value) : value
            }).toString()
        }).join('\n')
    }
}