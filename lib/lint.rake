require 'active_support/all'

desc 'Run pronto'
task :lint do
  format = ENV['CI_PULL_REQUEST'].blank? ? 'github' : 'github_pr'
  system("bundle exec pronto run -f #{ format }") || raise($?.to_s)
end
