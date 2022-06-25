const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.APP_SENDGRID_API_KEY);

const confirmationEmail = async (data) => {
    console.log(data);
    const message = {
        templateId: process.env.APP_AUTH_TEMPLATE_ID,
        personalizations: [
            {
                to: {
                    email: data.email,
                },
                
                dynamic_template_data: {
                    subject: "Xác thực tài khoản",
                    name: data.name,
                    link: `http://localhost:3000/confirm/${data.confirmationcode}`,
                }
            },
        ],
        from: {
            email: process.env.APP_EMAIL_SENDGRID_FROM,
        },
    };

    const result = await sgMail.send(message);
    
    return result;
}

const reservationEmail = async (data) => {
    const message = {
        templateId: process.env.APP_PLAN_PAID_PERCENT_TEMPLATE_ID,
        personalizations: [
            {
                to: {
                    email: 'congchien0104@gmail.com',
                },
                
                dynamic_template_data: {
                    subject: "Test Email",
                }
            },
        ],
        from: {
            email: process.env.APP_EMAIL_SENDGRID_FROM,
        },
    };

    const result = await sgMail.send(message);
    
    return result;
}

module.exports = { confirmationEmail, reservationEmail }