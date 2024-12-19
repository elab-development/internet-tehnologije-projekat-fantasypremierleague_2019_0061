Ovo je web aplikacija izgrađena koristeći **Laravel** kao backend i **React** kao frontend. Ispod se nalaze uputstva za lokalno pokretanje projekta.

## Priprema

Pre nego što započnete pokretanje, osigurajte se da imate sledeće alate instalirane na svom računaru:

- **PHP** (verzija 8.x ili novija)
- **Composer** (za upravljanje PHP paketima)
- **Node.js** (verzija 16.x ili novija)
- **npm** (za upravljanje JavaScript paketima)
- **SQLite**

## Instalacija

### 1. Klonirajte repozitorijum

```bash
git clone https://github.com/elab-development/internet-tehnologije-projekat-fantasypremierleague_2019_0061.git
cd fantasy_four

### 2. Instalirajte PHP zavisnosti

Koristite Composer za instalaciju svih potrebnih Laravel zavisnosti:
```bash
composer install

### 3. Instalirajte JavaScript zavisnosti

Koristite npm za instalaciju svih React zavisnosti:
```bash
npm install

### 4. Pokretanje lokalnog servera

Pokrenite Laravel server:
```bash
php artisan serve

Pokrenite frontend aplikaciju:
```bash
npm start

Server radi!!!

## Aplikacija će biti dostupna na:

- Backend (Laravel): http://localhost:8000
- Frontend (React): http://localhost:3000



