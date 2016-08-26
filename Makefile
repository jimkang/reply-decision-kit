test:
	node tests/basictests.js

pushall:
	git push origin master && npm publish

lint:
	./node_modules/.bin/eslint .
