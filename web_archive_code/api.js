const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let results = [];

// Load results from local storage (file) if exists
const loadResults = () => {
    if (fs.existsSync('results.json')) {
        const data = fs.readFileSync('results.json');
        results = JSON.parse(data);
    }
};

// Save results to local storage (file)
const saveResults = () => {
    fs.writeFileSync('results.json', JSON.stringify(results, null, 2));
};

loadResults();

// GET all results
app.get('/api/results', (_req, res) => {
    res.json(results);
});

// GET result by url using query params
app.get('/api/result', (req, res) => {
    const { url } = req.query;
    const result = results.find((r) => r.url === url);

    if (result) {
        res.json(result);
    } else {
        res.status(404).send('Result not found');
    }
});

// POST save new html data
app.post('/api/save', (req, res) => {
    const { html, ds, url } = req.body;

    if (html && ds && url) {
        results.push({ html, ds, url });
        saveResults();
        res.status(200).send('Data saved successfully');
    } else {
        res.status(400).send('Invalid data');
    }
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
