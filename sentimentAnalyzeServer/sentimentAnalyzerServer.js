const express = require('express');
const dotnev = require('dotenv');
dotnev.config();
const app = new express();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {
            }
        },
    }; 
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log("Emotion url analyze success " + req.query.url);
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return('error:', err);
    });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {
            }
        },
    }; 
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log("Sentiment url analyze success " + req.query.url);
        return res.send(JSON.stringify(analysisResults, null, 2));
    })
    .catch(err => {
        return('error:', err);
    });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
            }
        },
    }; 
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log("emotion text analyze success " + req.query.text);
        console.log(analysisResults);
        return res.send(analysisResults);
    })
    .catch(err => {
        console.log("emotion text analyze fail " + err);
        return('error:', err);
    });
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {

            }
        },
    }; 
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log("Sentiment text analyze success " + req.query.text);
        console.log(analysisResults);
        return res.send(analysisResults);
    })
    .catch(err => {
        console.log("Sentiment text analyze fail " + err);
        return('error:', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

