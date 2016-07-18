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
      mkdir -p /tmp/docker /tmp/docker/repo
      if [[ -e /tmp/docker/image.tar ]]; then docker load -i /tmp/docker/image.tar; fi
      git clone -b #{ branch } #{ repo } /tmp/docker/repo
      cd /tmp/docker/repo && docker build --tag mttrs-frontend .
      docker save mttrs-frontend > /tmp/docker/image.tar
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
    # todo
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
