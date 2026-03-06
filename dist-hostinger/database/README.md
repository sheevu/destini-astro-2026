# Destini Numbers Database Setup

This project was originally static HTML/CSS/JS. The database layer below matches `database.docx` and adds a lightweight PHP API for site integration.

## 1. Create the Database

Run these SQL files in order (MySQL/MariaDB):

1. `database/schema.sql`
2. `database/seed.sql`

Using MySQL CLI:

```bash
mysql -u YOUR_DB_USER -p < database/schema.sql
mysql -u YOUR_DB_USER -p < database/seed.sql
```

Or import both files through phpMyAdmin/cPanel.

## 2. Configure API Credentials

Copy the template and fill in your DB details:

```bash
cp api/config.example.php api/config.php
```

Edit `api/config.php`:

- `host`
- `port`
- `username`
- `password`
- `database` (`destini_numbers`)

## 3. API Endpoints Added

- `POST api/submit-contact.php`
  - Saves contact form leads into `form_submissions`.
  - Accepts: `name`, `email`, `phone`, `message`
  - Optional: `topic`, `service_id`

- `GET api/products.php`
  - Returns products list from `products`.

- `GET api/services.php`
  - Returns services list from `services`.

- `POST api/create-order.php`
  - Creates an order in `orders`.
  - Accepts: `customer_name`, `total_amount`
  - Optional: `status` (`Pending`, `Shipped`, `Completed`, `Cancelled`)

## 4. Frontend Integration Done

`contact.html` + `assets/js/main.js` were updated so inquiry submissions now try to save to database first.

Fallback behavior remains:

- If API is unavailable, the old `mailto:` flow is used automatically.

## 5. Notes

- Product and service prices are set to `0.00` where site content currently marks items as inquiry-based.
- The schema follows the document fields exactly (plus indexing/constraints for performance and integrity).
