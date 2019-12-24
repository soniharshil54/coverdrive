{
    "name": "john doe",
    "contact": "8686868686",
    "address": "vraj street",
    "state": "gujarat",
    "city": "surat",
    "pincode":"395006",
    "address_type":"home"
}
{
    "products": [] ,
    "user_id": ,
    "payment_type": "cod"
    "is_paid": optional (default 0),
    "total_amount": "450",
    "date_ordered": "24/12/2019",
    "is_delivered": optional (default 0),
    "date_delivered": optional (default none)
}

{
    "name": "jon doe",
    "email": "jon@yahoo.com",
    "contact": "8886868686",
    "password": "soka3360"
}

{
    "name":"phonecover",
    "category": [
        {
            "model":"samsung",
            "subcategory": ["m30", "m50", "j7", "j2"],
            "price":120,
            "availability_status": 1
        },
        {
            "model":"oppo",
            "subcategory": ["a5", "a7"],
            "price":120,
            "availability_status": 1
        },
        {
            "model":"xiomi",
            "subcategory": ["redmi8", "redmi note7", "note6", "redmi6a"],
            "price":120,
            "availability_status": 1
        },
        {
            "model":"vivo",
            "subcategory": ["v5", "v7", "v11"],
            "price":120,
            "availability_status": 1
        }
    ]
}

{
    _id: new mongoose.Types.ObjectId(),
    name:"phonecover",
    category: [
        {
            model:"samsung",
            subcategory: ["m30", "m50", "j7", "j2"],
            price:120,
            availability_status: 1
        },
        {
            model:"oppo",
            subcategory: ["a5", "a7"],
            price:120,
            availability_status: 1
        },
        {
            model:xiomi,
            subcategory: ["redmi8", "redmi note7", "note6", "redmi6a"],
            price:120,
            availability_status: 1
        },
        {
            model:"vivo",
            subcategory: ["v5", "v7", "v11"],
            price:120,
            availability_status: 1
        }
    ]
}