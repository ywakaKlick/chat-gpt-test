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

        const body = await get_html_body(base_url + '/careers/search');

        const $ = cheerio.load(body);
        const contents = $('section[id="jobResultsSection0"]');

        const lists = $(contents).find('li');

        lists.each((col_index, col_element) => {
            let job = {};

            const div = $(col_element).find('div > div').first();
            job['title'] = $(div).find('h3').text();

            const span = $(div).find('span').text().split(" — ");
            job['location'] = span[0];
            job['category'] = span[1];

            const url = $(div).find('a').attr('href');
            job['link'] = base_url + url;

            data.push(job);
        })
        data = sort_by_category(data);

        const output = path.join(output_path, `careers.${type}`);

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
        console.log(`careers.${type} file is saved to ${output}`)
        res.status(200).download(output, `careers.${type}`);

    } catch (e) {
        res.status(500).send(e);
        console.error(e);
    }

    function sort_by_category(data) {
        data.sort((a, b) => {
            const category_a = a.category.toUpperCase();
            const category_b = b.category.toUpperCase();
            if (category_a < category_b) {
                return -1;
            }
            if (category_a > category_b) {
                return 1;
            }
            return 0;
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