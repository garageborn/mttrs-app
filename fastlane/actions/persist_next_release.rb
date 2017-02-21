module Fastlane
  module Actions
    class PersistNextReleaseAction < Action
      BUILD_FILE_PATH = File.expand_path('../../../app/config/release.json', __FILE__)

      class << self
        def run(_params = {})
          UI.message 'Persist Next Release'

          File.write(BUILD_FILE_PATH, new_content.to_json)
        end

        def is_supported?(platform)
          %i(ios android).include?(platform)
        end

        private

        def versions
          {
            ios: GetReleaseIdAction.run(platform: :ios),
            android: GetReleaseIdAction.run(platform: :android)
          }
        end
      end
    end
  end
end
