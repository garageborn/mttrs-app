source 'https://rubygems.org'

group :development do
  gem 'activesupport', '5.0.2'
  gem 'pronto', '0.9.3'
  gem 'pronto-brakeman', '0.9.0', require: false
  gem 'pronto-eslint_npm', '0.9.0', require: false
  gem 'pronto-flay', '0.9.0', require: false
  gem 'pronto-rubocop', '0.9.0', require: false

  gem 'fastlane', '~>2.39.1'
  gem 'rake', '12.0.0'
  gem 'byebug', '9.0.6'
end

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval(File.read(plugins_path), binding) if File.exist?(plugins_path)
