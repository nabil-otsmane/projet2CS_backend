import { createCustomer, createPaymentMethod, attachPaymentMethod, payUserAmount, fetchCustomerPaymentMethods } from '../services';
import { StripeCustomers, PaymentMethods, Rental } from '../entity'
import { applyReduction } from './promo.controller'
import { FACTURATION_URL } from '../config'
import axios from 'axios'
export const addPaymentMethod = async (req: any, res: any) => {
    /** body request validation here  */
    const user = req.user
    let customer = await StripeCustomers.findOne({ where: { userId: user.idUser } })
    if (!customer) {
        /** create a new customer if the user hasn't yet  */
        let stripeCustomer = await createCustomer({ description: user.phoneNumber })
        if (!stripeCustomer) {
            return res.status(402).send(
                {
                    ok: false,
                    errors: "Failed to create your paymentMethod please try later"
                }
            );
        }
        customer = StripeCustomers.create({
            cusromerId: stripeCustomer.id,
            userId: user.idUser
        })
        customer = await customer.save()
    }
    try {
        var billing_details: any = {}
        if (req.body.name) {
            billing_details.name = req.body.name
        }
        if (req.body.phone) {
            billing_details.phone = req.body.phone
        }
        if (req.body.email) {
            billing_details.phone = req.body.email
        }
        if (req.body.address) {
            for (const [key, value] of Object.entries(req.body.address)) {
                if (value && key) {
                    billing_details.address[key] = value
                }
            }
        }
        var paymentMthod = await createPaymentMethod(req.body.card, { billing_details: billing_details })
    } catch (e) {
        return res.status(400).send({
            ok: false,
            errors: e.raw.message
        })
    }
    let cardToken = paymentMthod.card.fingerprint
    let isUsed = await PaymentMethods.findOne({ where: { cardToken: cardToken } })
    if (isUsed) {
        return res.status(401).send(
            {
                ok: false,
                errors: "This card is already in use, please try another card"
            }
        );
    }
    let localAttaching = await PaymentMethods.create({
        stripeCustomerId: customer.id,
        paymentId: paymentMthod.id,
        cardToken: cardToken
    })
    await localAttaching.save()
    let payment = await attachPaymentMethod(customer.cusromerId, paymentMthod.id)
    return res.status(200).json({
        ok: true,
        paymentInfo: {
            paymentId: paymentMthod.id,
            card: {
                brand: payment.card.brand,
                last4: payment.card.last4
            }
        }
    })

}
export const payForCustomer = async (req: any, res: any) => {
    try {
        const user = req.user
        if (['rentalRate', 'penaltyRate'].indexOf(req.body.type) === -1) {
            console.log("This api can pay just for new rental or penalty")
            return res.status(500).send(
                {
                    ok: false,
                    message: "This api can pay just for new rental or penalty"
                }
            );
        }
        if (typeof req.body.amount === "number" && req.body.amount < 0) {
            console.log("The amount you will pay must greater than 0")
            return res.status(500).send(
                {
                    ok: false,
                    message: "The amount you will pay must greater than 0"
                }
            );
        }
        let customer = await StripeCustomers.findOne({ where: { userId: user.idUser } })
        if (!customer) {
            console.log("The payment can't be processed, please add a credit card")
            return res.status(500).send(
                {
                    ok: false,
                    errors: "The payment can't be processed, please add a credit card"
                }
            );
        }
        let paymentId = await PaymentMethods.findOne({ where: { paymentId: req.body.paymentId, stripeCustomerId: customer.id } })
        if (!paymentId) {
            console.log("The paymentMethod is wrong , or you are not allowed to use this paymentMethod")
            return res.status(500).send(
                {
                    ok: false,
                    errors: "The paymentMethod is wrong , or you are not allowed to use this paymentMethod"
                }
            );
        }
        const rental = await Rental.findOne(req.body.idRental);
        if (!rental) {
            console.log("Please pay for a valid car location")
            return res.status(500).send(
                {
                    ok: false,
                    errors: "Please pay for a valid car location"
                }
            );
        }
        let payed = await payUserAmount(customer.cusromerId, req.body.paymentId, req.body.amount)
        rental.rentalstate = "paid"
        rental.save()
        const payedAmount = payed.amount / 100
        try {
            axios.post(FACTURATION_URL + '/bill/add', {
                idRental: req.body.idRental,
                typeBill: req.body.type,
                amountToBill: payedAmount
            })
        } catch (e) {
            res.status(400).send(e)
        }

        console.log({
            amount: payedAmount,
            reciep: payed.charges.data[0].receipt_url
        })
        return res.status(200).send(
            {
                ok: true,
                message: {
                    amount: payedAmount,
                    reciep: payed.charges.data[0].receipt_url
                }
            }
        );

    } catch (e) {
        console.log(e)
        return res.status(400).send(
            {
                ok: false,
                errors: e
            }
        );
    }

}
export const fetchAllCards = async (req: any, res: any) => {
    const user = req.user
    let customer = await StripeCustomers.findOne({ where: { userId: user.idUser } })
    if (!customer) {
        return res.status(200).send(
            {
                ok: true,
                data: []
            }
        );
    }
    let cards = await fetchCustomerPaymentMethods(customer.cusromerId)
    return res.status(200).send(cards);
}