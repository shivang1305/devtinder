# DevTinder's API List

## Auth Routes

- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- POST /auth/verify-email
- PATCH /auth/forgot-password

## Profile Routes

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## Connection Request Routes

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

## User Routes

- GET /user/connections
- GET /user/requests
- GET /user/feed
