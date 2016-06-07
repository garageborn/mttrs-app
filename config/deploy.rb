lock '3.5.0'

set :application, 'mttrs-frontend'
set :repo_url, 'git@github.com:alexandrebini/mttrs-frontend.git'
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')
set :deploy_to, '/home/ubuntu/mttrs-frontend'
set :branch, -> {
  ENV['branch'] || ask(:branch, `git rev-parse --abbrev-ref HEAD`.chomp)
}
set :log_level, :info
set :ssh_options, { forward_agent: true }

# npm
set :npm_flags, '--only-dev --silent --no-progress'

# passenger
set :passenger_restart_options, -> { "#{ deploy_to }/current/web --ignore-app-not-running" }

# assets
after 'deploy:updated', 'assets:precompile'
namespace :assets do
  task :precompile do
    on roles(:all) do
      execute "NODE_ENV=#{ fetch(:stage) } cd #{ release_path } && NODE_ENV=#{ fetch(:stage) } npm run build-web"
    end
  end
end

# slack
set :slack_webhook, "https://hooks.slack.com/services/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"
