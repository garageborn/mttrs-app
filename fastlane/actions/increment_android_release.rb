module Fastlane
  module Actions
    class PersistNextReleaseAction < Action
      class << self
        def run(_params = {})
          UI.message 'Persist Next Release'

          new_content = File.read(build_file_path).tap do |build_file|
            build_file[version_code_matcher, 1] = next_version_code.to_s
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

        def next_version_code
          current_release = GetAndroidReleaseAction.run
          current_release[:version_code] + 1
        end
      end
    end
  end
end
