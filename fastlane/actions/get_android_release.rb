module Fastlane
  module Actions
    class GetAndroidReleaseAction < Action
      BUILD_FILE_PATH = File.expand_path('../../../android/app/build.gradle', __FILE__)
      VERSION_CODE_MATCHER = /versionCode\s+(\d+)/.freeze
      VERSION_NAME_MATCHER = /versionName\s+"(\d+\.\d+.\d+)"/.freeze

      class << self
        def run(_params = {})
          UI.message 'Get Android Release'

          { version_code: version_code, version_name: version_name }
        end

        def is_supported?(platform)
          platform == :android
        end

        private

        def version_code
          build_file[VERSION_CODE_MATCHER, 1].to_i
        end

        def version_name
          build_file[VERSION_NAME_MATCHER, 1]
        end

        def build_file
          File.read(BUILD_FILE_PATH)
        end
      end
    end
  end
end
