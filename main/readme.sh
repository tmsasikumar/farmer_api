
cd main
npm install
cd public/javascripts
node main.js


Running migration script:

cd main
db-migrate up --config config/config.json


create migration script

cd main
db-migrate create add-users --config config/config.json

open -a Google\ Chrome --args --disable-web-security --user-data-dir