import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'masumrahman73@gmail.com',
      pass: 'dqqq kwgv ftuk jugf',
    },
  });

  await transporter.sendMail({
    from: 'masumrahman73@gmail.com', // sender address
    to, // list of receivers
    subject: 'Reset your password within ten mins!', // Subject line
    text: 'Hi', // plain text body
    html, // html body
  });
};
