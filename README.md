# Cambridge Language Course (Bun + Vite + React + Tailwind + Sass)

## Requirements
- Bun installed

## Install
```bash
bun install
```

## Dev
```bash
bun run dev
```

## Build (for FTP deploy)
```bash
bun run build
```

Upload the generated `dist/` folder contents to your server via FTP.

### Single Page App routing on FTP hosts
Because this uses React Router, direct links like `/unit/3` must be rewritten to `/index.html`.
If your host is Apache, use the provided `public/.htaccess` (copy it into the deployed root).
For Nginx, configure `try_files $uri /index.html;`.
