myBooks = [
    {
        "name":"MDF Heart Shape Keychain",
        "size": "55x50mm",
        "h_img" : "header5.png",
        "in_img": "<button style='padding:1px 4px' data-toggle='modal' data-target='#imageModal' class='btn btn-info'>view</button>",
        "description": "Its heart a keychain",
        "price": "199",
        "avail":1
    },
                {
        "name":"MDF Double Heart",
        "size": "55x50mm",
        "h_img": "header4.png",
        "in_img": "<button style='padding:1px 4px' data-toggle='modal' data-target='#imageModal' class='btn btn-info'>view</button>",
        "description": "Its doubleheart a keychain",
        "price": "299",
        "avail":1
    },
                  {
        "name":"MDF Pink Double Heart",
        "size": "55x50mm",
        "h_img": "header3.png",
        "in_img": "<button style='padding:1px 4px' data-toggle='modal' data-target='#imageModal' class='btn btn-info'>view</button>",
         "description": "Its doubleheart a keychain",
        "price": "299",
        "avail":1
    },
                   {
        "name":"MDF Red Double Heart",
         "size": "55x50mm",
        "h_img": "header.png",
        "in_img": "<button style='padding:1px 4px' data-toggle='modal' data-target='#imageModal' class='btn btn-info'>view</button>",
         "description": "Its doubleheart a keychain",
        "price": "299",
        "avail":1
    }        ]

    function setUsername(jsonObj) {
        for (var i = 0; i < jsonObj.length; i++) {
            console.log(jsonObj[i])
            let tempN = jsonObj[i].h_img
            let newImgName = `<span id=${tempN}></span>`
            jsonObj[i].h_img = newImgName;
            return;
          
        }
        return jsonObj
      }



    console.log(setUsername(myBooks))