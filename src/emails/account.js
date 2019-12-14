const sgMail = require('@sendgrid/mail');
const sendEmailApi = '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';

sgMail.setApiKey(sendEmailApi);
const sendEmail = (user) => {
  sgMail.send({
    to: user.email,
    from: 'ahmed.saeed.elmasry@gmil.com',
    subject: `welcome new user ${user.email}`,
    text: 'Hi Most Welcomed '
  })
}
module.exports = sendEmail;
//sgMail.send(msg);