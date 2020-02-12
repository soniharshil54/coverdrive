const express = require("express")
const mongoose = require("mongoose")
const Smsdata = require("../models/smsdata")
let fetch = require('node-fetch');
const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'casemateinbox@gmail.com',
        pass: 'India_123'
    }
});


exports.send_mail = function(hereproducts, orderref) {

    return new Promise(function(resolve, reject){
     // let dateor = orderref.date_ordered
      let dateor =  new Date(orderref.date_ordered).toDateString()
      let order_id = orderref.order_id
      let subtotal = orderref.sub_total
      let totalamount = orderref.amount
      let shipping = orderref.shipping
      let username = `${orderref.user_id.first_name} ${orderref.user_id.last_name}`
      let useraddress = orderref.user_id.address
      let useremail = orderref.user_id.email_id
      let usercontact = orderref.user_id.contact
       const message = {
            from: 'soniharshil55@gmail.com', // Sender address
            to: 'sharshil43@yahoo.com',         // List of recipients
            subject: 'Stayclassy.in Order Receipt', // Subject line
            html: `<div style="margin: 0;padding:0;font-family:Arial, sans-serif;line-height:1.3em;">
          
         
            <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" style="line-height:1.3em;font-family:Arial, sans-serif;font-size:14px;color:#232323;background-color:#dcd8d4;width:100%;margin:0;padding:50px 0 50px 0;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td align="center" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;padding:0 20px 20px;">
              
              <table border="0" cellpadding="0" cellspacing="0" style="line-height:1.3em;color:#232323;font-family:Arial, sans-serif;overflow:hidden;background-color:#ffffff;border:1px solid #c6c2bf;width:700px;border-radius:5px;">
            <tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td align="center" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;">
              
              
             
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="line-height:1.3em;font-family:Arial;background-color:#ffffff;color:#737373;border-bottom:1px solid #f2f2f2;font-weight:bold;vertical-align:middle;text-align:center;padding:16px 18px;border-top-left-radius:2px;border-top-right-radius:2px;">
              <a rel="nofollow" target="_blank" href="https://u14117413.ct.sendgrid.net/wf/click?upn=VvNoeEPAfxyjeKu3nupILCXO1JhGgc4Y05O5R23-2FBsw-3D_UZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbDJrLhZqSP3WDuBg5nzIomgeDBG4eiBHRmpGmNJnU7qw5z78i8BhyTSplSF2EJu-2BI4NqGl3uEzZNfqOpw0gJu5orUA4gG4k-2B9CXeUKN7q-2F7fT8P3UbljWE-2FJX-2Fp2uCAK8CkWxt-2Fv8dk5p0kE52ulx3NFV9PVq-2Bokes9-2BhtNm2mnXM-3D" style="font-weight:normal;text-decoration:none;font-size:13px;margin:0 0 0 12px;color:#737373;">
              <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fstayclassy.in%2Fwp-content%2Fuploads%2F2019%2F02%2Flogo-stayclassy-1-2.png&amp;t=1580899143&amp;ymreqid=2e5c3bcb-17e7-aeda-1c73-260001016700&amp;sig=sWLYzWXEta5cFzFI7ID.ew--~C"></a>
             
              </td>
              </tr></tbody></table>
        
            </td>
              </tr>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td align="center" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;background:#fafafa;border-bottom:1px solid #f5f5f5;">
              
              <table border="0" cellpadding="0" cellspacing="0" width="auto" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:38px;font-size:14px;padding:8px 6px;">&nbsp;
              
              </td>
              
              <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:38px;font-size:14px;padding:8px 6px;">
              <a rel="nofollow" target="_blank" href="https://u14117413.ct.sendgrid.net/wf/click?upn=VvNoeEPAfxyjeKu3nupILOCFXO806W8w3o-2BlvNA-2FTXnLYZM7OChR5kNO9F1-2FIM5me61I-2B-2F1KenWr2h98NhIzag-3D-3D_UZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbDEYBAcf-2BZ-2F14Kvmnb3i9iXcmryPSRsRh0hQdLKWH88DJ6D9NTAC3FXXDzC8xJh0RKbYE3p3yLjOB5TSTwBKuQTyYRDBIOCl-2FG3TT9JtXV4ht-2FcfcTUDpLagE2h-2FuY-2F3-2FgDWR-2FzMIhoJrw94Js5crDCJKbCNKH-2Fm0T-2BOQNXEpn4yA-3D" style="color:#232323;text-decoration:none;"> <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fstayclassy.in%2Fwp-content%2Fuploads%2F2019%2F02%2Ffina_fb-1.png&amp;t=1580899143&amp;ymreqid=2e5c3bcb-17e7-aeda-1c73-260001016700&amp;sig=NU4BDstoxH23e2Wamh46Rw--~C"></a>
            </td>
              
              <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:38px;font-size:14px;padding:8px 6px;">
              <a rel="nofollow" target="_blank" href="https://u14117413.ct.sendgrid.net/wf/click?upn=VvNoeEPAfxyjeKu3nupILBmdKf6wbzU84VIq6tpv6FfDheC0t9k8DgsR6WoDYUjhhISDjbswuMk1xTPyR3adyw-3D-3D_UZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbDD2d8bUTRJy9bQZSVZmW4KztJ-2FhiLaTDi3YCt-2BeW3apInG0efZ1qpeJ6mSjKjLKw9KBagRP4t7Kn7qX108Q36t44D9aA-2BuNaB-2F-2FZ5S0WvJKSp4Kig3MIiJW6UdBPehaZXYwzqgwuzzqMWYY-2BuTrMrV9wHPAbT5RfdcbHCEzyL-2F2s-3D" style="color:#232323;text-decoration:none;"> <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fstayclassy.in%2Fwp-content%2Fuploads%2F2019%2F02%2Finsta-1.png&amp;t=1580899143&amp;ymreqid=2e5c3bcb-17e7-aeda-1c73-260001016700&amp;sig=_CYQrHQmSABno4fLY2D5Gw--~C"></a>
            </td>
              
              <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:38px;font-size:14px;padding:8px 6px;">&nbsp;
              
              </td>
             
            </tr></tbody></table>
            </td>
              </tr>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td align="left" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;">
              
              
              
             
            <table border="0" cellpadding="0" cellspacing="0" width="100%" id="yiv0976742951m_-7602364114664346880m_-1139331964853519747m_-6237337950909019060template_body" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td valign="top" style="line-height:1.3em;font-family:Arial, sans-serif;color:#232323;background-color:#ffffff;">
              
              
              
             
            <table border="0" cellspacing="0" width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td valign="top" style="line-height:1.3em;font-family:Arial;text-align:left;padding-left:55px;padding-right:55px;padding-top:45px;padding-bottom:45px;">
             
             <div style="font-family:Arial, sans-serif;font-size:22px;text-align:left;font-weight:bold;">
                 <p style="margin:.6em 0;">Your order is being processed</p>
            </div>
             
             <p style="margin:.6em 0;">Your order <span><a rel="nofollow" target="_blank" href="https://u14117413.ct.sendgrid.net/wf/click?upn=VvNoeEPAfxyjeKu3nupILPGEUgRHCd0iFrWyoMXn0jKebtQQ1sknStk0zbZB83a9-2Bs2B5AoxH-2BfIylL6Qn8xLw-3D-3D_UZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbD-2BFfjAxJhzUyM0kZ8fhejZjLRKxS9VijZfS-2BxARNki-2BT91uhD-2Fzrhv9gxEMsroe9wBHqHcz5ekaS2xx0rpVnNEUIPSua3uJevQVsq7Y2oz9MfZDgLm-2BYhum-2FjnoYPXHxa34tG7T9lhc9K4B7ekELu1sTvs3S437ng1CHHs7KL1QQ-3D" style="color:#232323;text-decoration:underline;">${order_id}</a> <span>(${dateor})</span></span> has been received and is now
            being processed.</p> 
             
             
             <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;padding:10px 0 22px 0;">
             
        
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;">
              
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:26px;font-size:0px;"></td>
              </tr></tbody></table>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td width="50%" style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;">
              <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;">
            <tbody><tr height="50%" style="font-family:Arial, sans-serif;line-height:1.3em;min-height:50%;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;">&nbsp;</td>
              </tr>
            <tr height="50%" style="font-family:Arial, sans-serif;line-height:1.3em;min-height:50%;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;border-top:2px solid #282828;"></td>
              </tr>
            </tbody></table>
            </td>
              <td width="1%" style="line-height:1.3em;font-family:Arial, sans-serif;font-weight:bold;font-size:14px;color:#232323;text-decoration:none;text-transform:uppercase;margin:0;padding:0px 5px;white-space:nowrap;padding-right:6px;padding-left:6px;">
              Order&nbsp;Details
            </td>
              <td width="50%" style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;">
              <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;">
            <tbody><tr height="50%" style="font-family:Arial, sans-serif;line-height:1.3em;min-height:50%;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;">&nbsp;</td>
              </tr>
            <tr height="50%" style="font-family:Arial, sans-serif;line-height:1.3em;min-height:50%;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;border-top:2px solid #282828;"></td>
              </tr>
            </tbody></table>
            </td>
              </tr></tbody></table>
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;font-size:1px;min-height:18px;"></td>
              </tr></tbody></table>
            </td>
              </tr></tbody></table>
            <table cellspacing="0" cellpadding="0" border="0" width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td style="font-family:Arial, sans-serif;line-height:1.3em;padding:0 0 6px;text-align:left;">
              <span style="color:#988255;text-decoration:none;">
              Order
            Number: </span>
             ${order_id} </td>
              <td style="font-family:Arial, sans-serif;line-height:1.3em;padding:0 0 6px;text-align:right;">
              <span style="color:#988255;text-decoration:none;">
              Order
            Date: </span> 
              ${dateor} </td>
              </tr></tbody></table>
            <div>
              
              <table cellspacing="0" cellpadding="0" border="0" style="font-family:Arial, sans-serif;line-height:1.3em;margin:15px 0;overflow:hidden;width:100%;background:#f7f7f7;color:black;border-radius:4px;border-bottom:1px dotted #c9c9c9;border-left:1px dotted #c9c9c9;border-right:1px dotted #c9c9c9;">
            <thead><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <th scope="col" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;font-family:Arial, sans-serif;text-align:left;text-transform:uppercase;font-size:10px;font-weight:normal;padding-top:7px;padding-bottom:7px;margin:0;line-height:.8em;border-top:1px dotted #c9c9c9;">Product</th>
              <th scope="col" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;font-family:Arial, sans-serif;text-align:left;text-transform:uppercase;font-size:10px;font-weight:normal;padding-top:7px;padding-bottom:7px;margin:0;line-height:.8em;border-top:1px dotted #c9c9c9;">Quantity</th>
              <th scope="col" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;font-family:Arial, sans-serif;text-transform:uppercase;font-size:10px;font-weight:normal;padding-top:7px;padding-bottom:7px;margin:0;line-height:.8em;border-top:1px dotted #c9c9c9;text-align:right;">Price</th>
              </tr></thead>
            <tbody>${hereproducts}</tbody>
            <tfoot>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <th scope="row" colspan="2" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-align:left;text-transform:uppercase;font-size:14px;line-height:1em;">
              Subtotal: </th>
              <td style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-transform:uppercase;font-size:14px;line-height:1em;text-align:right;">
              <span><span>₹</span>${subtotal}</span>
            </td>
              </tr>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <th scope="row" colspan="2" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-align:left;text-transform:uppercase;font-size:14px;line-height:1em;">
              Shipping: </th>
              <td style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-transform:uppercase;font-size:14px;line-height:1em;text-align:right;">
              <span><span>₹</span>${shipping}</span>&nbsp;<small>via Flat rate</small> </td>
              </tr>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <th scope="row" colspan="2" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-align:left;text-transform:uppercase;font-size:14px;line-height:1em;">
              Payment method: </th>
              <td style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-transform:uppercase;font-size:14px;line-height:1em;text-align:right;">
              Credit Card/Debit
            Card/NetBanking </td>
              </tr>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <th scope="row" colspan="2" style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-align:left;text-transform:uppercase;font-size:14px;line-height:1em;">
              Total: </th>
              <td style="vertical-align:middle;word-wrap:break-word;padding:15px 12px;border-top:1px dotted #c9c9c9;padding-top:10px;padding-bottom:10px;font-family:Arial, sans-serif;text-transform:uppercase;font-size:14px;line-height:1em;text-align:right;">
             
            <span><span>₹</span>${totalamount}</span>
            </td>
              </tr>
            </tfoot>
            </table>
            </div>
              
              </td>
              </tr></tbody></table>
            <div>
              </div>
             <table id="yiv0976742951m_-7602364114664346880m_-1139331964853519747m_-6237337950909019060addresses" cellspacing="0" cellpadding="0" align="center" border="0" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;width:100%;vertical-align:top;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td width="50%" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;padding-left:0px;padding-right:22.5px;">
              <p style="margin:.6em 0;"><strong>Billing address:</strong></p>
             
              <address style="font-style:normal;">
              ${username}<br>${useraddress} <br>+91${usercontact}
            <br><a rel="nofollow" ymailto="mailto:${useremail}" target="_blank" href="mailto:${useremail}">${useremail}</a> </address>
              </td>
              <td width="50%" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;padding-left:22.5px;padding-right:0px;">
              <p style="margin:.6em 0;"><strong>Shipping address:</strong></p>
              
              <address style="font-style:normal;">
              ${username}<br>${useraddress} </address>
              </td>
             
            </tr></tbody></table>
            </td>
              </tr></tbody></table>
        
            </td>
              </tr></tbody></table>
        
            </td>
              </tr>
            <tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td align="center" valign="top" style="font-family:Arial, sans-serif;line-height:1.3em;">
              
              
             
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td width="100%" align="center" style="line-height:1.3em;font-family:Arial, sans-serif;font-size:12px;text-align:center;padding:12px 22.5px 16px;border-top:1px solid #ededed;color:#646464;background-color:#fafafa;">
              
              <table align="center" cellpadding="0" cellspacing="0" border="0" width="auto" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
            <td align="center" style="line-height:1.3em;font-family:Arial, sans-serif;font-size:12px;color:#646464;">
              
              
              <table border="0" cellpadding="0" cellspacing="0" width="auto" style="font-family:Arial, sans-serif;line-height:1.3em;color:#232323;"><tbody><tr style="font-family:Arial, sans-serif;line-height:1.3em;">
          
              
              <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:18px;font-size:11px;padding:2px 4px;">
              <a rel="nofollow" target="_blank" href="https://u14117413.ct.sendgrid.net/wf/click?upn=VvNoeEPAfxyjeKu3nupILOCFXO806W8w3o-2BlvNA-2FTXnLYZM7OChR5kNO9F1-2FIM5me61I-2B-2F1KenWr2h98NhIzag-3D-3D_UZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbD9IuNatFopKskytniFqfiqgwd7fWL0FV0xyOC5sHbO9aCut8rLOGd-2Fcjflhnl-2FWy3fMXjBQ-2FvmZjLLwvMYP6aXA4DmLgrWGwVGcfCFYjdDiFxS-2BM3vdnze3vJzwXFCPYlMcmjL1tJddo3871mXTR7hJhqBXg8HfL8j9HI-2F6UrNEEPbkc1OcbJUKcSBWRJ48EO" style="color:#232323;text-decoration:none;"> <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fstayclassy.in%2Fwp-content%2Fuploads%2F2019%2F02%2Ffina_fb-1.png&amp;t=1580899143&amp;ymreqid=2e5c3bcb-17e7-aeda-1c73-260001016700&amp;sig=NU4BDstoxH23e2Wamh46Rw--~C"></a>
            </td>
              
              <td style="font-family:Arial, sans-serif;line-height:1.3em;min-height:18px;font-size:11px;padding:2px 4px;">
              <a rel="nofollow" target="_blank" href="https://u14117413.ct.sendgrid.net/wf/click?upn=VvNoeEPAfxyjeKu3nupILBmdKf6wbzU84VIq6tpv6FfDheC0t9k8DgsR6WoDYUjhhISDjbswuMk1xTPyR3adyw-3D-3D_UZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbDz2tjlciHzY1IT-2B5OqoRQJNkcMYxQNY-2BcAlKc4FIVCl6G4Rc2Fw5Al7OLhCjb958ihM-2FAoyDJRb8bALB0CBOirOm5lu7xSbi85sQNJACUiul9XX-2FAb-2FKvIiZbm-2BVjzTTFapw66XtYdZt0ciYGVkLqS1ky7dL5kBn7xJBIYSNqhWRadcN1wLSO9KxbVHcuemjR" style="color:#232323;text-decoration:none;"> <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fstayclassy.in%2Fwp-content%2Fuploads%2F2019%2F02%2Finsta-1.png&amp;t=1580899143&amp;ymreqid=2e5c3bcb-17e7-aeda-1c73-260001016700&amp;sig=_CYQrHQmSABno4fLY2D5Gw--~C"></a>
            </td>
              
              
              </tr></tbody></table>
            </td>
              </tr></tbody></table>
            </td>
              </tr></tbody></table>
        
            </td>
              </tr>
            </tbody></table>
            </td>
              </tr></tbody></table>
            <img src="https://ecp.yusercontent.com/mail?url=https%3A%2F%2Fu14117413.ct.sendgrid.net%2Fwf%2Fopen%3Fupn%3DUZaV8Rhnm-2B4CiojqqaiAQJYGRbkX3uFsBTjHXghm5IEYWHbCxeQN1EE45PJ0AmbDWd-2BPmdYt2iOUi-2FR9lqNmP8ZhidV1j88eps30UbnwOV7zK7o2zAXor8KP4o9mna5mI-2F13ieV0lp6MZ-2BGUZl1sOCEwRotJtAIiMfZ3hcFdzknsamH3x5VgkNBm-2BXAm742z-2FqeFKES1ib4uOV-2Fwr6xOs5i-2BV64HqfBqfewkDmblzYq2F7d9hi6m-2BSNaikGTUAOV&amp;t=1580899143&amp;ymreqid=2e5c3bcb-17e7-aeda-1c73-260001016700&amp;sig=HTTcxJ6A_Q3YiSl1i7Hn9g--~C" alt="" width="1" height="1" border="0" style="min-height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important;"></div>` // Plain text body
        };
        transport.sendMail(message, function(err, info) {
            if (err) {
                console.log("error mail")
              console.log(err)
              reject(err)
            } else {
                console.log("success mail")
              console.log(info);
              resolve(info)
            }
        });
    })
   
}


exports.send_forget_password_mail = function(otpdata){
  return new Promise(function(resolve, reject){
    let otpid = otpdata._id
    let otpbody = otpdata.tempotp
    // let mailotp = generateOTP()
    // let htmlmessage = `<p>Here is the otp ( One Time Password ) to reset your password. :  ${mailotp}</p>
    // <p>Enter this otp in below page to reset your password...</p>
    // <a href="http://patelsolartechnology.com/jaydeep2/coverclient/forgetpass.html#${otpid}">Reset Password</a>`

    let htmlmessage = `<p>Here is the otp ( One Time Password ) to reset your password. :  ${otpbody}</p>
    <p>Enter this otp in below page to reset your password...</p>
    <a href="http://localhost/coverclient/forgetpass.html#${otpid}">Reset Password</a>`
    const message = {
      from: 'casemateinbox@gmail.com', // Sender address
      to: 'sharshil43@yahoo.com',         // List of recipients
      subject: 'Forget Password', // Subject line
      html: htmlmessage
    }
    transport.sendMail(message, function(err, info) {
      if (err) {
          console.log("error mail")
        console.log(err)
        reject(err)
      } else {
          console.log("success mail")
        console.log(info);
        resolve(info)
      }
  });
  })
}


function generateOTP()
{

    var digits = '0123456789';

    var otpLength = 6;

    var otp = '';

    for(let i=1; i<=otpLength; i++)

    {

        var index = Math.floor(Math.random()*(digits.length));

        otp = otp + digits[index];

    }

    return otp;

}

// exports.post_order_confirm_sms = function(req, res) {
//   let mobilenumber = req.body.mobilenumber
//   let user_name = req.body.user_name
//   let order_id = req.body.orderid_user
//   let smscontent =`Dear, ${user_name}  Your order has been received Successfully.Your order no. ${order_id}.confirmation call will be received within 24-48 hours.Thank you`
//   console.log(req.connection.localAddress)
//   //res.json({"run":"runa"})
//   fetch(`https://api.msg91.com/api/sendhttp.php?authkey=156882AcKCbmqX8fWL5e16b85cP1&mobiles=${mobilenumber}&country=91&message=${smscontent}&sender=TESTIN&route=4`, { mode: 'no-cors'})
//     .then(response => {       
//       console.log(response)
//       res.status(200).json({user:response})
//     })
//     .catch(error => {
//       res.status(200).json({user:response})
//       console.log(error)
//     })
// }