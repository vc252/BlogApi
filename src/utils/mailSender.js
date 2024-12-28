import nodemailer from 'nodemailer'

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: "blogxnode@outlook.com",
    pass: "mukesh@4708"
  }
});

const mailSender = async (email,subject,html) => {
  try {
    const info = await transporter.sendMail({
      from: '"blogX" blogxnode@outlook.com',
      to: email,
      subject,
      html
    });
    console.log('Email info',info);
    return info
  } catch (error) {
    console.log(error.message);
  }
}

export default mailSender;