# **🌍 African Proverbs 🇳🇬**

Curated list of african proverbs 🦁

## **🍇 Tech Stack 🦹‍♀️**

- Typescript 🍨
- ExpressJs 🍫
- MongoDB 🪣

## **🧣 Features 🪄**

- Caching (Redis) ❌.
- Email Services.
- 🪛 JWT Role Based Authentication & Authorization .
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
https://localhost:5000/api/proverb
```

- **Fetch a random proverb which filter params matches `country` or `native`**
  - _GET_ Method
  - Returns proverb object

```curl
https://localhost:5000/api/proverb/filter?filter=kenya
```

### **❇️ GraphQl**

Currently not completed.
