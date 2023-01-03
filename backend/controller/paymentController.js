const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const createPayment = async(req,res) =>{
    console.log(req.body)
    try{
        const myPayment = await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:'inr',
            payment_method:'pm_card_visa'
        })
        
        res.status(200).json({
            success:true,
            client_secret:myPayment.client_secret
        })

    }catch(error){
        console.log(error)

    }
}

const sendStripeApiKey = async (req,res) => {
    try{
        res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY})
    }catch(error){
        console.error(error)
    }
}

module.exports = {createPayment,sendStripeApiKey}