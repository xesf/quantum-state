
install:
	gem update --system
	sudo gem install jekyll bundler
	sudo bundle install

docs:
	bundle exec jekyll serve --watch

run:
	http-server ./src -c-1 -p 4040

.PHONY: docs
