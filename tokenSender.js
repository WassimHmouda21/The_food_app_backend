const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587, // Port 587 with TLS
  secure: false, // Do not use secure or TLS here
  auth: {
    user: "wessim88hamouda@outlook.fr",
    pass: "ihu54SD22"
  }
});

// Define the sendVerificationEmail function
const sendVerificationEmail = async (toEmail) => {
  try {
    const token = jwt.sign({
      data: 'Token Data',
    }, 'ourSecretKey', { expiresIn: '10m' });

    const mailConfigurations = {
      from: 'wessim88hamouda@outlook.fr',
      to: toEmail,
      subject: 'Food app Email Verification',
      text: `Hi! Happy to verify the email
             Please follow the given link to verify your reclamation email
             http://localhost:3000/auth/verify/${token} 
             Thanks`
    };

    const info = await transporter.sendMail(mailConfigurations);
    console.log('Email Sent Successfully', info.response);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendVerificationEmail,
};
