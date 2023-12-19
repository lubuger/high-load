# high-load

Do following:

1) npm i
2) configure your postgres DB in src/db.js
3) npm run start
4) Run tests via node tests/userBalanceParallel.js
   (Sends 10 000 parallel requests on backend,
    changes user balance by -2 on each request.)