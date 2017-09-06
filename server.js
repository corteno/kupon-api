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

//Hungarian
app.get('/:uid/:email', (req, res) => {
    const userId = req.params.uid;
    const email = req.params.email;

    let doc = new PDFDocument({
        layout: 'portrait',
        size: [870, 1260],
        margin: 0,
        padding: 0
    });
    let filename = userId + ".pdf";

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.fillColor('white');

    doc.save();
    doc.image('./public/img/base.jpg', 20, 20, {
        width: 800,
        margin: [0, 0],
        padding: [0, 0],
        align: 'center',
        valign: 'center'
    });


    doc.save();
    doc.fill('#E0E0E0')
        .fontSize(16).text(userId, 280, 70)
        .fontSize(8).text(email, 235, 300)
        .fontSize(16).text(userId, 280, 340)
        .fontSize(8).text(email, 235, 565)
        .fontSize(16).text(userId, 280, 600)
        .fontSize(8).text(email, 235, 830)
        .fontSize(16).text(userId, 280, 870)
        .fontSize(8).text(email, 235, 1095) //End of first column
        .fontSize(16).text(userId, 645, 340)
        .fontSize(8).text(email, 595, 565)
        .fontSize(16).text(userId, 645, 600)
        .fontSize(8).text(email, 595, 830)
        .fontSize(16).text(userId, 645, 870)
        .fontSize(8).text(email, 595, 1095)


    doc.restore();
    doc.layout = 'landscape';

    /*doc.fontSize(25)
        .fillColor('white')
        .text(userId, 400, 200, {
            fillColor: 'white',
            size: 32
        });*/




    doc.pipe(res);
    doc.end();

});

//German
app.get('/de/:uid/:email', (req, res) => {
    const userId = req.params.uid;
    const email = req.params.email;

    let doc = new PDFDocument({
        layout: 'portrait',
        size: [870, 1260],
        margin: 0,
        padding: 0
    });
    let filename = userId + ".pdf";

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
    res.setHeader('Content-type', 'application/pdf');

    doc.fillColor('white');

    doc.save();
    doc.image('./public/img/base_de.jpg', 20, 20, {
        width: 800,
        margin: [0, 0],
        padding: [0, 0],
        align: 'center',
        valign: 'center'
    });


    doc.save();
    doc.fill('#E0E0E0')
        .fontSize(16).text(userId, 280, 70)
        .fontSize(8).text(email, 235, 300)
        .fontSize(16).text(userId, 280, 340)
        .fontSize(8).text(email, 235, 565)
        .fontSize(16).text(userId, 280, 600)
        .fontSize(8).text(email, 235, 830)
        .fontSize(16).text(userId, 280, 870)
        .fontSize(8).text(email, 235, 1095) //End of first column
        .fontSize(16).text(userId, 645, 340)
        .fontSize(8).text(email, 595, 565)
        .fontSize(16).text(userId, 645, 600)
        .fontSize(8).text(email, 595, 830)
        .fontSize(16).text(userId, 645, 870)
        .fontSize(8).text(email, 595, 1095)


    doc.restore();
    doc.layout = 'landscape';

    /*doc.fontSize(25)
        .fillColor('white')
        .text(userId, 400, 200, {
            fillColor: 'white',
            size: 32
        });*/




    doc.pipe(res);
    doc.end();

});