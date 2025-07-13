
install:
	gem update --system
	sudo gem install jekyll bundler
	sudo bundle install

docs:
	bundle exec jekyll serve --watch

.PHONY: docs
