# DevTinder's API List

## Auth Routes

- POST /auth/signup
- POST /auth/login/email
- POST /auth/login/phone
- POST /auth/logout
- POST /auth/verify-email
- POST /auth/forgot-password/login

## Profile Routes

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection Request Routes

- POST /request/send/:status/:userId
- POST /request/review/:status/:userId

## User Routes

- GET /user/connections
- GET /user/requests
- GET /user/feed
