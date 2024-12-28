import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

async function sendVerificationEmail(email,otp) {
  try {
    const msg = {
      to: email,  // Recipient email
      from: process.env.SENDGRID_USER,  // Verified sender email
      subject: 'Verification mail',
      html: `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`,
      text: 'Please confirm your OTP code: ' + otp  // Optional: You can add a text version too
    };
    await sgMail.send(msg);
    // console.log("email sent successfully: ",mailResponse);
  } catch (error) {
    console.log(error.response.body);
    throw new customMailError('not able to send otp to this email');
  }
}

export default sendVerificationEmail;