import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandleBarsMailTamplete';
interface IMailContact {
  name: string;
  email: string;
}
interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}
interface IParseMailTemplate {
  file: string;
  variebles: ITamplateVarieble;
}
interface ITamplateVarieble {
  [key: string]: string | number;
}
export default class EtherialMail {
  static async sendMail({ to,from,subject,templateData }: ISendMail) {
    const account  =  await nodemailer.createTestAccount();
    const mailTemplate  = new HandlebarsMailTemplate()
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
      from:{
        name: from?.name || "Equipe API Vendas",
        address: from?.email || "apivendas@gmail.com",
      },
      to:{
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
