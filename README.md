# auth-n-query

Demo nodejs project with jwt authentication, auth middleware for specific route, mongo database queries and event emitter for non required awaiting procedures like adding analytics and a demo sending email service.


#### Register and login
Token is generated and exported
<p float="left">
<img src="https://github.com/athangk/auth-n-query/blob/main/Capture_1_register.JPG" height="250">
<img src="https://github.com/athangk/auth-n-query/blob/main/Capture_2_login.JPG" height="250">
</p>
  
#### Auth Middleware
Based on valid bearer token user can go to specific auth route
<p float="left">
<img src="https://github.com/athangk/auth-n-query/blob/main/Capture_3_auth_middleware.JPG" height="250">
</p>

#### Update user analytics via event emitter
Whenever user logins, the current timestamp is pushed to the logins array field 
<p float="left">
<img src="https://github.com/athangk/auth-n-query/blob/main/Capture_4_user_analytic.JPG" width="350">
</p>
