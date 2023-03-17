const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require('path');

let output_path = './';

module.exports = async function (req, res) {
    const type = req.query.type;
    if (!type) return;

    const base_url = "https://openai.com";
    let data = [];
    try {

        create_output_path(output_path);

        //TODO: Fix to get all pages. Currently only gets first page.
        for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
            const body = await get_html_body(base_url + '/research?page=' + i);

            const researchs = await scrape_researchs(body);

            if (!researchs) break;

            researchs.forEach(e => data.push(e));
            console.log(`${i} page`);

            await new Promise((resolve => setTimeout(resolve, 5000)));
        }

        const output = path.join(output_path, `research.${type}`);
        if (type === 'csv') {
            data = convert_to_csv(data);
            fs.writeFileSync(output, data, { encoding: 'utf8' });
        }
        else if (type === 'json') {
            fs.writeFileSync(output, JSON.stringify(data, null, 2));
        }
        console.log(`research.${type} file is saved to ${output}`)
        res.status(200).download(output, `research.${type}`);

    } catch (e) {
        res.status(500).send(e);
        console.error(e);
    }

    async function scrape_researchs(body) {
        let data = [];
        const $ = cheerio.load(body);

        $('form > div:nth-of-type(3) > ul > li').each(function (index, element) {
            if (!$(element).text()) return;

            let research = {};

            research['date'] = $(element).find('div:nth-of-type(2) > div:nth-of-type(1) > span').first().text();
            research['title'] = $(element).find('div:nth-of-type(2) > div:nth-of-type(2)').text();
            research['category'] = $(element).find('div:nth-of-type(2) > div:nth-of-type(3) > div').text();

            const detail_url = $(element).find('div:nth-of-type(2) > div:nth-of-type(2) > a').attr('href');
            research['detail_url'] = base_url + detail_url;

            research['paper_url'] = $(element).find('div:nth-of-type(2) > div:nth-of-type(3) > a').attr('href');
            data.push(research);
        });
        return data;
    }

    async function get_html_body(url) {
        const body = await superagent
            .get(url)
            .then(response => {
                return response.text;
            })
            .catch((error) => {
                throw (error);
            });
        return body;
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