const offerLetterEmail = (companyName, employeeName, email, registrationNo, phone, joiningDate) => {
    return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offer Letter</title>
      <style>
          body {
              background-color: #f4f4f4;
              font-family: Arial, sans-serif;
              font-size: 16px;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
              color: #333333;
          }
  
          .body {
              font-size: 18px;
              margin-bottom: 20px;
              text-align: left;
              color: #666666;
          }
  
          .info {
              margin-bottom: 10px;
          }
  
          .info p {
              margin: 5px 0;
          }
  
          .highlight {
              font-weight: bold;
              color: #FFA500;
          }
  
          .cta {
              display: inline-block;
              padding: 10px 20px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
          }
  
          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <a href="/"><img class="logo" src="" alt="${companyName}"></a>
          <div class="message">Offer Letter from ${companyName}</div>
          <div class="body">
              <p>Dear <span class="highlight">${employeeName}</span>,</p>
              <div class="info">
                  <p>We are pleased to offer you the position at <span class="highlight">${companyName}</span>.</p>
                  <p><span class="highlight">Employee Name:</span> ${employeeName}</p>
                  <p><span class="highlight">Email:</span> ${email}</p>
                  <p><span class="highlight">Registration No:</span> ${registrationNo}</p>
                  <p><span class="highlight">Phone Number:</span> ${phone}</p>
                  <p><span class="highlight">Joining Date:</span> ${joiningDate}</p>
              </div>
              <p>Please sign and return the offer letter as soon as possible. If you have any questions, feel free to contact us.</p>
              <a href="mailto:${email}" class="cta">Confirm your Acceptance</a>
          </div>
          <div class="support">
              <p>If you have any further questions, please reach out to us at ${companyName}.</p>
              <p>Best regards, <br> The ${companyName} Team</p>
          </div>
      </div>
  </body>
  
  </html>`;
};

module.exports = { offerLetterEmail };
