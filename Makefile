# run npm lint
lint:
	npm run lint

# run npm format
format:
	npm run format

# run npm build
build:
	npm run build

# run npm test:unit
test:
	npm run test:unit

# run npm dev
dev:
	npm run dev

# run lint, format, and dev in sequence
all: lint format dev