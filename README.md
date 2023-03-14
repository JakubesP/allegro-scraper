## Setup

```bash
# run database container
$ docker compose up -d
```

Create `.env` file:

```text
PAGE_URL=https://allegro.pl/kategoria/sluchawki-66887 
PAGES_NUMBER=10
MONGO_DB_URL=mongodb://admin:admin@localhost:27017?authMechanism=DEFAULT
MONGO_DB_NAME=allegro
BUTTON_ACTIONS_DELAY=5000
HEADLESS=false
```

Run:

```bash
$ npm run start
```