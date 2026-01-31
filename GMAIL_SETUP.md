# Gmail Setup - Generate App Password

Your email is set to: **swiftdesire360@gmail.com**

## 🔑 Generate Gmail App Password (5 minutes)

### Step 1: Enable 2-Step Verification
1. Go to: https://myaccount.google.com/security
2. Click **"2-Step Verification"**
3. Follow the prompts (you'll need your phone)
4. Click **"Turn on"**

### Step 2: Generate App Password
1. Go to: https://myaccount.google.com/apppasswords
2. You should see a dropdown for **"Select the app"** and **"Select the device"**
3. Select:
   - App: **Mail**
   - Device: **Windows Computer**
4. Click **"Generate"**
5. Google will show a **16-character password** (like: `abcd efgh ijkl mnop`)

### Step 3: Copy Password to .env
1. Copy the 16-character password (without spaces)
2. Open `.env` file in this project
3. Replace `your_16_char_app_password_here` with your password
4. Save the file

Example:
```
EMAIL_PASSWORD=abcdefghijklmnop
```

## ✅ Run Backend Server

After updating `.env`, open a terminal and run:

```bash
cd c:\Users\Shlok Lokhande\Downloads\matrix\frist
npm run server
```

You should see:
```
Server running on http://localhost:3001
```

## ✅ Run Frontend (New Terminal)

Open another terminal and run:

```bash
npm run dev
```

## ✅ Test Contact Form

1. Open http://localhost:5173 in your browser
2. Click **"Book Free Consultation"**
3. Fill out the form
4. Click **"Send Inquiry"**
5. Check your email for confirmations!

---

## 📧 Where Emails Go

- **Admin Email**: swiftdesire360@gmail.com (gets inquiry details)
- **User Email**: Whoever fills the form (gets confirmation)

Both emails are sent automatically!

## ⚠️ Common Issues

**"Invalid app password"** → Make sure you:
- Enabled 2-Step Verification first
- Copied the full 16 characters
- Used app password (not regular Google password)
- Removed any spaces

**"Still not working"** → Check:
- 2-Step Verification is ON
- App password is correct in `.env`
- Backend server is running (`npm run server`)
- No typos in EMAIL_USER

---

Go generate your app password now! 🔐
