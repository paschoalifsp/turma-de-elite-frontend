#!/bin/bash
curl 'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXIaX1Y2g_jnIrvrewlVvmhR4iwpejxEc' \
-H 'Content-Type: application/json' \
--data-binary '{"email":"patricia@email.com","password":"123456"}'
node -v
npm run e2e
