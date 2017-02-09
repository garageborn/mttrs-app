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

  desc 'Commit all changes'
  task :commit do
    message = "#{ ios_changes_message } #{ android_changes_message }".strip
    system "git commit -am '#{ message }'"
  end

  namespace :ios do
    desc 'Release new iOS Beta version'
    task :beta do
      match_password = ENV['MATCH_PASSWORD']
      if match_password.blank?
        STDOUT.puts 'Enter MATCH_PASSWORD'
        match_password = STDIN.gets.strip
      end
      system("MATCH_PASSWORD=\"#{ match_password }\" bundle exec fastlane ios beta")
    end
  end

  namespace :android do
    desc 'Release new Android Alpha version'
    task :alpha do
      system('bundle exec fastlane android alpha')
    end
  end
end
