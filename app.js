const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

//GET REQUEST TO HOMEPAGE !

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home.html');
})

//POST REQUEST TO HOME PAGE

app.post('/', function (req, res) {

    var name = req.body.studName;
    var sub1 = Number(req.body.sub1);
    var sub2 = Number(req.body.sub2);
    var sub3 = Number(req.body.sub3);
    var sub4 = Number(req.body.sub4);
    var sub5 = Number(req.body.sub5);

    const TotalMarks = (sub1 + sub2 + sub3 + sub4 + sub5);
    const average = TotalMarks / 5;

    // CONDITIONAL CHECK FOR SCORE GREATER THAN 90

    if (TotalMarks > 90) {
        let content = `<p> ║ Name: ${name} ║ TotalMarks: ${TotalMarks} ║ Average Score: ${average} ║ English Score: ${sub1} ║ Science Score: ${sub2} ║ Maths Score: ${sub3} ║ History Score: ${sub4} ║ CS Score: ${sub5} ║ </p> 
                <p>Congratulations! You got an "A" grade you passed the exam !!</p>`;
        content += "\n";
        fs.appendFile('./data/ScoreCard.md', content, () => {
            console.log('File was written');
        });

        fs.readFile('./data/ScoreCard.md', (err, data) => {
            res.send(data.toString());
        })

        // CONDITIONAL CHECK FOR SCORE LESSER THAN 33

    } else if (TotalMarks < 33) {
        let content = `<p> ║ Name: ${name} ║ TotalMarks: ${TotalMarks} ║ Average Score: ${average} ║ English Score: ${sub1} ║ Science Score: ${sub2} ║ Maths Score: ${sub3} ║ History Score: ${sub4} ║ CS Score: ${sub5} ║ </p> 
        <p>Oops! You got an "F" grade you Failed the exam !!</p>`;
        content += "\n";
        fs.appendFile('./data/ScoreCard.md', content, () => {
            console.log('File was written');
        });

        fs.readFile('./data/ScoreCard.md', (err, data) => {
            res.send(data.toString());
        })
    }
    // CONDITIONAL CHECK FOR ANY SCORE LESS THAN 90 AND GREATER THAN 33 !
    else {
        let content = `<p> ║ Name: ${name} ║ TotalMarks: ${TotalMarks} ║ Average Score: ${average} ║ English Score: ${sub1} ║ Science Score: ${sub2} ║ Maths Score: ${sub3} ║ History Score: ${sub4} ║ CS Score: ${sub5} ║ </p> 
        <p>Awesome ! You got an "B" grade you passed the exam ! Work more Harder!</p>`;
        content += "\n";
        fs.appendFile('./data/ScoreCard.md', content, () => {
            console.log('File was written');
        });

        fs.readFile('./data/ScoreCard.md', (err, data) => {
            res.send(data.toString());
        })
    }
})

// SERVER LISTENING ON PORT 3000

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server');
    } else {
        console.log('Server Up and Running on port::' + port);
    }
})