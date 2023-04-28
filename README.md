# NFT Minting Engine

1. yarn install
2. cp .env-sample .env
3. update required information in .env file
4. update database username/password at config/config.json
5. update minter information at db/seeders/minters.json
6. update nfts information at db/seeders/nfts.json
7. yarn db:create
8. yarn db:migrate
9. yarn db:seed
10. yarn db:drop
11. yarn start
12. yarn start:queue
