const PDFGenerator = require('pdfkit')
const fs = require('fs')

class InvoiceGenerator {
    invoice: any
    width: number
    height: number
    //A4 (595.28 x 841.89)
    constructor(invoice: any) {
        this.invoice = invoice
        this.width = 596
        this.height = 841
    }
    generateHeaders(doc: any) {
        const billingAddress = this.invoice.user
        doc.image('images/Right.png', this.width - 300, 0, { width: 300 })
        doc.lineWidth(0.1)
        doc
            .fillColor('#414141')
            .font('Helvetica')
            .fontSize(10)
            .text(`Détail de la facture: location voiture`, 35, 10)
            .text(`Date : ${new Date().toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}`, 0, 10, { width: this.width - 30, align: 'right' })
            .moveTo(23, 25)
            .lineTo(this.width - 20, 25)
            .stroke('#414141')
            .image('images/LogoJaune.png', this.width / 2 - 40, 35, { width: 80 })
        doc
            .font('Helvetica-Bold')
            .fontSize(12)
            .fillColor('#000')
            .text('Envoyé de : ', 50, 130)
            .font('Helvetica')
            .fontSize(10.5)
            .fillColor('#414141')
            .text('SARL Clover Tech', 53, 150)
            .text('Oued Smar, Alger', 53, 165)
            .text('support@autolibdz.com', 53, 180)
            .text('Tel : 066666666', 53, 195)
            .fontSize(12)
            .fillColor('#000')
            .font('Helvetica-Bold')
            .text(`Envoyé à : `, this.width - 150, 130, { width: 150, align: 'left' })
            .fontSize(10.5)
            .fillColor('#414141')
            .text(billingAddress.lastName + " " + billingAddress.firstName, this.width - 147, 150, { width: 150, align: 'left' })
            .text(billingAddress.phoneNumber, this.width - 147, 165, { width: 150, align: 'left' })
            .text(billingAddress.address, this.width - 147, 180, { width: 150, align: 'left' })
        const beginningOfPage = 40
        const endOfPage = 560
        doc
            .fontSize(13)
            .fillColor('#000')
            .text(`Détails : `, 50, 240)
            .moveTo(beginningOfPage, 260)
            .lineTo(endOfPage, 260)
            .stroke('#414141')

    }

    generateTable(doc: any) {
        const billingDetail = this.invoice.bill
        const tableTop = 300
        doc.lineWidth(160)
        doc.lineCap('butt')
            .moveTo(50, tableTop + 70)
            .lineTo(this.width - 45, tableTop + 70)
            .stroke("#f7f9fc");
        doc.lineWidth(0.5)
        doc
            .fontSize(11)
            .fillColor('#000')
            .text("Durée de  location :", 60, tableTop + 17)
            .font('Helvetica')
            .fillColor('#414141')
            .text("De", 170, tableTop)
            .text("à", this.width - 250, tableTop, { width: 150, align: 'left' })
            .text(new Date(billingDetail.rentaldate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), 170, tableTop + 17)
            .text(new Date(billingDetail.plannedrestitutiondate).toLocaleDateString("FR-fr", { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), this.width - 250, tableTop + 17, { width: 150, align: 'left' })
            /**** draw line */
            .lineCap('butt')
            .moveTo(57, tableTop + 37)
            .lineTo(this.width - 55, tableTop + 37)
            .stroke('#e8ebf1')
            /**** title  */
            .fillColor('#000')
            .font('Helvetica-Bold')
            .text("Tarif de base :", 60, tableTop + 50)
            /**** draw line */
            .lineCap('butt')
            .moveTo(57, tableTop + 70)
            .lineTo(this.width - 55, tableTop + 70)
            .stroke('#e8ebf1')
            /**** title  */
            .text("Tarif total :", 60, tableTop + 85)
            /**** draw line */
            .lineCap('butt')
            .moveTo(57, tableTop + 105)
            .lineTo(this.width - 55, tableTop + 105)
            .stroke('#e8ebf1')
            /**** title  */
            .text("Tarif des pénalité :", 60, tableTop + 120)
            /***** write details */
            .fillColor('#414141')
            .text(billingDetail.baseRate + " DZD /" + (billingDetail.type === "day" ? 'Jour' : 'Heure'), this.width - 220, tableTop + 50, { width: 150, align: 'right' })
            .text(billingDetail.totalRate + " DZD", this.width - 220, tableTop + 85, { width: 150, align: 'right' })
            .text(billingDetail.penaltyRate + " DZD", this.width - 220, tableTop + 120, { width: 150, align: 'right' })

        /*** print total ***/
        doc
            .moveTo(40, tableTop + 180)
            .lineTo(560, tableTop + 180)
            .stroke('#414141')
            .fontSize(14)
            .fillColor('#000')
            .text("Total :", this.width - 210, tableTop + 203, { width: 150, align: 'left' })
            .text((billingDetail.totalRate + billingDetail.penaltyRate) + " DZD", this.width - 210, tableTop + 203, { width: 150, align: 'right' })
    }


    generate(fileStream: any) {
        let theOutput = new PDFGenerator

        theOutput.pipe(fileStream)

        this.generateHeaders(theOutput)

        this.generateTable(theOutput)

        theOutput.end()

    }
}

export { InvoiceGenerator }