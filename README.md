# **🌍 African Proverbs 🇳🇬**

A curated list of African proverbs 🦁

## **🍇 Tech Stack 🦹‍♀️**

- Typescript 🍨
- ExpressJs 🍫
- MongoDB 🪣

## **🧣 Features 🪄**

- Caching (Redis) ❌.
- Email Services.
- 🪛 JWT Role Based Authentication & Authorization.
- Cookie Management.
- Schema Validation.
- Safe Typing.
- Cron Jobs ❌.
- Rate Limiting.

## **☘️ Integrations 🔌**

- Gmail (email service for production).
- MailTrap (email service for development).
- Nodemailer.

## **🛤️ Endpoints 👮**

### **🚟 REST API**

- **Fetch a random proverb**
  - _GET_ Method
  - Return proverb object

```curl
https://africanproverbs.onrender.com/api/proverb
```

- **Fetch a random proverb whose filter params match `country` or `native`**
  - _GET_ Method
  - Returns proverb object

```curl
https://africanproverbs.onrender.com/api/proverb/filter?filter=kenya
```

### **❇️ GraphQl**

Currently not completed.
