lock '3.5.0'

set :application, 'mttrs-frontend'
set :repo_url, 'git@github.com:alexandrebini/mttrs-frontend.git'
set :linked_dirs, fetch(:linked_dirs, []).push(
  'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system',
  'node_modules', 'web/node_modules'
)
set :deploy_to, '/home/ubuntu/mttrs-frontend'
set :branch, -> {
  ENV['branch'] || ask(:branch, `git rev-parse --abbrev-ref HEAD`.chomp)
}
set :log_level, :info
set :ssh_options, { forward_agent: true }

# passenger
set :passenger_restart_options, -> { "#{deploy_to}/web --ignore-app-not-running" }

# slack
set :slack_webhook, "https://hooks.slack.com/services/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"
