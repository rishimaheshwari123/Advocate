const welcomeEmailTemplate = (name, email, password) => {
    return `<!DOCTYPE html>
      <html>
      
      <head>
          <meta charset="UTF-8">
          <title>Welcome to the Company</title>
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
                  max-width: 150px;
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
                  text-align: left;
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
                  background-color: #007BFF;
                  color: #ffffff;
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
              <img class="logo" src="LOGO_URL" alt="Company Logo">
              <div class="message">Congratulations, ${name}!</div>
              <div class="body">
                  <p>We are excited to welcome you to the company!</p>
                  <p>Here are your account details:</p>
                  <div class="info">
                      <p><span class="highlight">Email:</span> ${email}</p>
                      <p><span class="highlight">Password:</span> ${password}</p>
                  </div>
                  <p>Click the button below to log in and get started:</p>
                  <a href="https://www.sdtaxation.com/companies-login" class="cta">Login to Your Account</a>
              </div>
              <div class="support">
                  If you have any questions or need assistance, feel free to contact us.
              </div>
          </div>
      </body>
      
      </html>`;
};

module.exports = { welcomeEmailTemplate };
