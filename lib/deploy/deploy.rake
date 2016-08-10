require 'httparty'

namespace :deploy do
  desc 'Load aws login'
  task :setup do
    system "eval `aws ecr get-login`"
  end

  desc 'Build docker image'
  task :build do
    branch = ENV['branch'] || ENV['CIRCLE_BRANCH'] || `git rev-parse --abbrev-ref HEAD`.chomp
    repo = `git config --get remote.origin.url`.chomp

    system <<-CMD
      mkdir -p ~/docker/repo
      if [[ -e ~/docker/image.tar ]]; then docker load -i ~/docker/image.tar; fi
      git clone -b #{ branch } #{ repo } ~/docker/repo
      docker build --tag mttrs-frontend ~/docker/repo
      docker save mttrs-frontend > ~/docker/image.tar
    CMD
  end

  desc 'Push docker image to amazon'
  task :push do
    system <<-CMD
      docker tag mttrs-frontend:latest 845270614438.dkr.ecr.us-east-1.amazonaws.com/mttrs-frontend:latest
      docker push 845270614438.dkr.ecr.us-east-1.amazonaws.com/mttrs-frontend:latest
    CMD
  end

  desc 'Publish application'
  task :publish do
    circle_url = 'https://circleci.com/api/v1.1/project/github/' \
             'garageborn/server/tree/master' \
             '?circle-token=66745267a877024ad3be6dd5a321b3af459873f8'
    HTTParty.post(circle_url)
  end

  task :run do
    Rake::Task['deploy:setup'].invoke
    Rake::Task['deploy:build'].invoke
    Rake::Task['deploy:push'].invoke
    Rake::Task['deploy:publish'].invoke
  end
end

desc 'Deploy'
task :deploy do
  Rake::Task['deploy:run'].invoke
end

Dir.glob('lib/deploy/tasks/*.rake').each { |r| load r }
