const PDFDocument = require('pdfkit');
const fs = require('fs');

//export async function getFacturePdf(_req:Request, res:Response){
  //  export const getFacturePdf = async (req: Request, res: Response) => {

    var pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));

    pdfDoc.text("From Mon-Sat we will have a 10% discount on selected items!", 150, 150);
        pdfDoc
    .fillColor('red')
    .fontSize(17)
    .text("20%", 305, 150);

    pdfDoc.end();//}