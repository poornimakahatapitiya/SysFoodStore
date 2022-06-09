
const nodemailer =require('nodemailer')

const transpoter= nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'kahatapitiyapoornima@gmail.com',
        pass:'fkisiaoozaiesixd'//application pw
    }
});

let sendEmail=(emailTemplate)=>{
    transpoter.sendMail(emailTemplate,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log('Email sent: ', info.response)
        }
    })
}

module.exports= {sendEmail}