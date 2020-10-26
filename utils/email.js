const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `NWTA <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
      if(process.env.NODE_ENV==='production'){
          return nodemailer.createTransport({
              service: 'SendGrid',
              auth: {
                  user: process.env.SENDGRID_USERNAME,
                  pass: process.env.SENDGRID_PASSWORD
              }
          })

      } else {
        return nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
              user: process.env.MAILTRAP_USERNAME,
              pass: process.env.MAILTRAP_PASSWORD,
            },
          });
      }
    
  }

  async send() {
    const message = {
        from: process.env.SENDGRID_SENDER, // Sender address
        to: this.to,         // List of recipients
        subject: 'Melange - Potwierdź rejestrację', // Subject line
        html: `<html><body style="font-family: Roboto, sans-serif;"><h1>Cześć ${this.name}!</h1><p>Witamy w Melange. By dokończyć rejestrację, kliknij w przycisk poniżej.</p><a href="${this.url}"><button class="btn btn-primary" style="display:inline-block;font-weight:400;color:#fff;text-align:center;vertical-align:middle;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background-color:#007bff;border:1px solid transparent;padding:0.375rem 0.75rem;font-size:1rem;line-height:1.5;border-radius:0.25rem;transition:color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;border-color:#007bff;">Zweryfikuj konto</button></a></body></html>`
    };
    await this.newTransport().sendMail(message);
  }
  
};
