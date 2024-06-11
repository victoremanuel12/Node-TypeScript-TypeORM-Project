import nodemailer from 'nodemailer';

interface ISendMail {
  sendTo: string;
  body: string;
}
export default class EtherialMail {
  static async sendMail({ sendTo, body }: ISendMail) {
    const account  =  await nodemailer.createTestAccount()
    const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    const message = await transporter.sendMail({
      from: 'Sistema Vendas',
      to: sendTo,
      subject: 'Recuperçaõ de senha Sistema Vendas',
      text: body,
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
