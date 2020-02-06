const Razorpay = require("razorpay")

var instance = new Razorpay({  key_id: 'rzp_live_Sn6rXlITR2ddOj',  key_secret: 'HWMp4JozRYYs6KNsC6foDPmG'})


exports.get_orderid_rzrpay = function(req, res){
    let amount = req.body.amount
    let receipt = generatereceiptid()
    var options = {
        amount: amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: receipt,
        payment_capture: '1'
      };
      instance.orders.create(options, function(err, order) {
          if(err){
              console.log(err)
              res.json(err)
          }
          else{
            console.log(order);
        res.json(order)
          }
        
      });
}

function generatereceiptid()
{

    var digits = '0123456789';

    var rcptLength = 6;

    var rcpt = '';

    for(let i=1; i<=rcptLength; i++)

    {

        var index = Math.floor(Math.random()*(digits.length));

        rcpt = rcpt + digits[index];

    }

    return rcpt;

}

