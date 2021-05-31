import { InvoiceGenerator, sendMail } from '../services'
const fs = require('fs');
export const printFacture = async (invoiceData: any) => {
    const factureName = "Facture de paiement #" + (invoiceData.bill.nbBill * 895555)
    const pathFacture = "factures/" + factureName + ".pdf";
    var fileStream = fs.createWriteStream(pathFacture)

    const ig = new InvoiceGenerator(invoiceData)
    ig.generate(fileStream)
    sendMail({
        from: '"Service facturation" <facturation@gmail.com>',
        to: invoiceData.user.email,
        subject: "AutoLib dz : votre " + factureName,
        html: `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        
      </head>
      <body>
        
      </body>
    </html>`,
        attachments: [
            {
                filename: factureName + ".pdf",
                path: pathFacture
            }
        ]
    })
}