var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var PDFDocument = require('pdfkit');
var blobStream = require('blob-stream');
var fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/:uid/:email', (req, res) => {
    const userId = req.params.uid;
    const email = req.params.email;

    let doc = new PDFDocument({
        layout: 'landscape',
        size: [870, 1260]
    });
    let filename = userId + ".pdf";

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.image('./public/img/base.png',{
        width: 1100,
        margin: [0, 0],
        padding: [0, 0],
        align: 'center',
        valign: 'center'
    });

    doc.text(userId, 100, 100, {
        color: 'black'
    });

    doc.pipe(res);
    doc.end();

});