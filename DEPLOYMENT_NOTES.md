Current deployment status

✅ EC2 backend running with PM2
✅ Nginx reverse proxy
✅ HTTPS via Let's Encrypt
✅ Frontend deployed on Vercel
✅ MongoDB connected
✅ Login works
✅ Cookie is created:
  HttpOnly
  Secure
  SameSite=None
✅ CORS:
  origin:
    - http://localhost:5173
    - https://dev-tinder-dusky.vercel.app
  credentials: true

Problem:
- Login succeeds
- Browser stores token cookie
- GET /feed returns 401
- Need to determine whether browser sends cookie on authenticated requests or why backend rejects it.

Things already checked:
- Axios uses withCredentials: true
- CookieParser installed
- JWT generation works
- HTTPS works