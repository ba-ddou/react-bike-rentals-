## **Getting Started in a dev environment**

This app relies on firebase, so in order to use it you must first create a firebase project and web app inside that project.

### **Firebase SDK configuration**

Save your firebase web app's sdk configuration in `config/firebase_config.json`

### **Firebase admin SDK configuration**

Certain workflow are performed throught next's API using firebase's admin SDK, so before running the app that needs to be configured as well.

Save your firebase project's service account in `lib/service_account.json`

### **run the development server:**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<br />

# **Usage guide**

You can use a live deployment of this app on https://react-bike-rentals-qaujmresnq-uc.a.run.app

### **User access**

User can signin/signup from the main from the web app's root page `/`

> User signup doesn't require any email verification

### **Admin access**

The admin dashboard is under `/dashboard` (https://react-bike-rentals-qaujmresnq-uc.a.run.app/dashboard).

You can use the following auth credentials:

```
email: manager@bike.com
password: root000
```
