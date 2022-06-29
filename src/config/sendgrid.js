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
    console.log(data);
    const message = {
        templateId: process.env.APP_BOOKING_TEMPLATE_ID,
        personalizations: [
            {
                to: {
                    email: 'congchien0104@gmail.com',
                },
                
                dynamic_template_data: {
                    subject: "Bạn đã đặt vé thàn công",
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

const companyConfirm = async (data) => {
    console.log(data);
    const message = {
        templateId: process.env.APP_CONFIRM_TEMPLATE_ID,
        personalizations: [
            {
                to: {
                    email: 'chientesting1@yopmail.com',
                },
                
                dynamic_template_data: {
                    subject: "Xét duyệt đối tác thành công",
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

module.exports = { confirmationEmail, reservationEmail, companyConfirm }