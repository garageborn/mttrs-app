require 'active_support/all'

namespace :deploy do
  def ios_version
    versions = `git diff | grep CURRENT_PROJECT_VERSION`.chomp.scan(/\d+/).uniq.map(&:to_i)
    { last_version: versions.min, current_version: versions.max }
  end

  def android_version
    versions = `git diff | grep versionCode`.chomp.scan(/\d+/).uniq.map(&:to_i)
    { last_version: versions.min, current_version: versions.max }
  end

  def ios_changes_message
    return if ios_version[:current_version].blank?
    "iOS version #{ ios_version[:last_version] } => #{ ios_version[:current_version] }"
  end

  def android_changes_message
    return if android_version[:current_version].blank?
    "android version #{ android_version[:last_version] } => #{ android_version[:current_version] }"
  end

  task :all do
    Rake::Task['deploy:ios'].execute
    Rake::Task['deploy:android'].execute
    Rake::Task['deploy:commit'].execute
  end

  desc 'Commit all changes'
  task :commit do
    message = "#{ ios_changes_message } #{ android_changes_message }".strip
    system "git commit -am '#{ message }'"
  end

  desc 'Release new iOS version'
  task :ios do
    match_password = ENV['MATCH_PASSWORD']
    if match_password.blank?
      STDOUT.puts 'Enter MATCH_PASSWORD'
      match_password = STDIN.gets.strip
    end
    system("MATCH_PASSWORD=\"#{ match_password }\" bundle exec fastlane ios beta")
  end

  desc 'Release new Android version'
  task :android do
    system('bundle exec fastlane android alpha')
  end
end
