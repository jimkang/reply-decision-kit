test:
	node tests/basictests.js
	node tests/mention-self-tests.js

pushall:
	git push origin master && npm publish

lint:
	./node_modules/.bin/eslint .
