start-backend:
	npm run start --watch --verbose-watch

start-frontend:
	npx webpack serve

install:
	npm ci

build:
	npm run build

lint:
	npx eslint . --ext js,jsx

start:
	heroku local -f Procfile.dev