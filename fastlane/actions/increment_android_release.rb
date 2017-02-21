module Fastlane
  module Actions
    class IncrementAndroidReleaseAction < Action
      class << self
        def run
          UI.message 'Increment Android Release'

          current_release = GetAndroidReleaseAction.run
          new_version_code = current_release[:version_core] + 1

          new_content = File.read(build_file_path).tap do |build_file|
            versionCode = build_file[matcher, 1].to_i
            build_file[version_code_matcher, 1] = new_version_code.to_s
            build_file
          end

          File.write(build_file_path, new_content)
        end

        def is_supported?(platform)
          platform == :android
        end

        private

        def build_file_path
          Fastlane::Actions::GetAndroidReleaseAction::BUILD_FILE_PATH
        end

        def version_code_matcher
          Fastlane::Actions::GetAndroidReleaseAction::VERSION_CODE_MATCHER
        end
      end
    end
  end
end
