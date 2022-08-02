start-backend:
	npm run start-backend --watch --verbose-watch

start-frontend:
	npx webpack serve

install:
	npm ci

buid:
	npm run buid

lint:
	npx eslint . --ext js,jsx

start:
	heroku local -f Procfile.dev