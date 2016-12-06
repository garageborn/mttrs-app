require 'active_support/all'

namespace :release do
  def ios_version
    versions = `git diff | grep CURRENT_PROJECT_VERSION`.chomp.scan(/\d+/).uniq.map(&:to_i)
    { last_version: versions.min, current_version: versions.max }
  end

  def ios_changes_message
    "iOS version #{ ios_version[:last_version] } => #{ ios_version[:current_version] }"
  end

  task :all do
    Rake::Task['release:ios:run'].execute
    Rake::Task['release:android:run'].execute
  end

  desc 'Commit all changes'
  task :commit do
    system "git commit -a -m '#{ ios_changes_message }'"
  end

  namespace :ios do
    desc 'Release new iOS version'
    task :run do
      p '-------------------'
      p ENV['MATCH_PASSWORD']

      # match_password = ENV['MATCH_PASSWORD']
      # if match_password.blank?
      #   STDOUT.puts 'Enter MATCH_PASSWORD'
      #   match_password = STDIN.gets.strip
      # end
      system("bundle exec fastlane ios beta")
    end
  end

  namespace :android do
    desc 'Release new Android version'
    task :run do
      # TODO
    end
  end
end
