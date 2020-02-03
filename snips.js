{
    "active_status": 1,
    "_id": "5e2e76e27d507f1a376667dd",
    "name": "Custom Watch",
    "create_date": "2020-01-27T05:36:34.004Z",
    "__v": 0
}

{
    "active_status": 1,
    "_id": "5e2e77187d507f1a376667de",
    "name": "Regular Watch",
    "create_date": "2020-01-27T05:37:28.196Z",
    "__v": 0
}

mugs type live
{
    "active_status": 1,
    "_id": "5e300e62d28880257bd805ad",
    "name": "Custom Mug",
    "slider_image": "noimage.png",
    "create_date": "2020-01-28T10:35:14.936Z",
    "__v": 0
}
{
    "active_status": 1,
    "_id": "5e300ed4d28880257bd805ae",
    "name": "Regular Mug",
    "slider_image": "noimage.png",
    "create_date": "2020-01-28T10:37:08.643Z",
    "__v": 0
}

popholder types live
{
    "active_status": 1,
    "_id": "5e301af4fda53f3126a601c1",
    "name": "Custom Popholder",
    "slider_image": "noimage.png",
    "create_date": "2020-01-28T11:28:52.087Z",
    "__v": 0
}

{
    "active_status": 1,
    "_id": "5e301b1afda53f3126a601c2",
    "name": "Regular Popholder",
    "slider_image": "noimage.png",
    "create_date": "2020-01-28T11:29:30.802Z",
    "__v": 0
}


exports.update_it_all = async function(req,res){
    await Watchtype.updateMany({_id:"5e2fe09fd6506f79a39c6fad"},{"type_name":"menwatch"})
    await Watchtype.updateMany({_id:"5e30038af16db81e325b69c4"},{"type_name":"womenwatch"})
    await Watchtype.updateMany({_id:"5e300399f16db81e325b69c7"},{"type_name":"couplewatch"})

    await Watchsubtype.updateMany({_id:"5e2e77187d507f1a376667de"},{"subtype_name":"regularwatch"})
    await Watchsubtype.updateMany({_id:"5e2e76e27d507f1a376667dd"},{"subtype_name":"customwatch"})

    await Watchmaintype.updateMany({_id:"5e2fe09fd6506f79a39c6fae"},{"type":"menwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e2fe09fd6506f79a39c6faf"},{"type":"menwatch","subtype":"regularwatch"})
    //await Watchmaintype.updateMany({_id:"5e33ed82abdd2f537529c7ec"},{"type":"menwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e30038af16db81e325b69c5"},{"type":"womenwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e30038af16db81e325b69c6"},{"type":"womenwatch","subtype":"regularwatch"})
    //await Watchmaintype.updateMany({_id:"5e33eda1abdd2f537529c7f0"},{"type":"womenwatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e300399f16db81e325b69c8"},{"type":"couplewatch","subtype":"customwatch"})
    await Watchmaintype.updateMany({_id:"5e300399f16db81e325b69c9"},{"type":"couplewatch","subtype":"regularwatch"})
    //await Watchmaintype.updateMany({_id:"5e33edbfabdd2f537529c7f4"},{"type":"couplewatch","subtype":"customwatch"})

    await Watch.updateMany({maintype_id:"5e2fe09fd6506f79a39c6fae"},{"type":"menwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e2fe09fd6506f79a39c6faf"},{"type":"menwatch","subtype":"regularwatch"})
    //await Watch.updateMany({maintype_id:"5e33ed82abdd2f537529c7ec"},{"type":"menwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e30038af16db81e325b69c5"},{"type":"womenwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e30038af16db81e325b69c6"},{"type":"womenwatch","subtype":"regularwatch"})
    //await Watch.updateMany({maintype_id:"5e33eda1abdd2f537529c7f0"},{"type":"womenwatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e300399f16db81e325b69c8"},{"type":"couplewatch","subtype":"customwatch"})
    await Watch.updateMany({maintype_id:"5e300399f16db81e325b69c9"},{"type":"couplewatch","subtype":"regularwatch"})
    //await Watch.updateMany({maintype_id:"5e33edbfabdd2f537529c7f4"},{"type":"couplewatch","subtype":"customwatch"})
    res.json({"all":"updated"})
}