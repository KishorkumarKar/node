export const forgotPassEmailTemplate = (name: string, password: string) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f7; color:#333;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f4f4f7">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="border-radius: 8px; overflow: hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          <tr>
            <td align="center" bgcolor="#4f46e5" style="padding: 20px;">
              <h1 style="margin:0; color:#ffffff; font-size:24px;">Reset Your Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="font-size:16px; line-height:1.6; margin:0 0 20px;">
                We received a request to reset your password. Click the button below to reset it:
              </p>
              <!-- <p style="text-align:center; margin:30px 0;">
                
                <a href="{{reset_link}}" target="_blank" 
                   style="background:#4f46e5; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:6px; font-size:16px; display:inline-block;">
                   Reset Password
                </a>
              </p> -->
              <p style="text-align:center; margin:30px 0;">
                Your Password is <strong>${password}</strong>
              </p>
              <p style="font-size:14px; line-height:1.6; color:#555;">
                If you didn’t request a password reset, you can safely ignore this email.
              </p>
              <p style="font-size:14px; line-height:1.6; color:#555; margin-top:30px;">
                Thanks,<br>
                The {{app_name}} Team
              </p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#f9fafb" style="padding: 20px; text-align:center; font-size:12px; color:#999;">
              © {{year}} {{app_name}}. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
