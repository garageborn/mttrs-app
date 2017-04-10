module Fastlane
  module Actions
    class IncrementAndroidReleaseAction < Action
      class << self
        def run(_params = {})
          UI.message 'Persist Next Release'

          new_content = File.read(build_file_path).tap do |build_file|
            build_file[version_name_matcher, 1] = next_version_name.to_s
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

        def version_name_matcher
          Fastlane::Actions::GetAndroidReleaseAction::VERSION_NAME_MATCHER
        end

        def version_code_matcher
          Fastlane::Actions::GetAndroidReleaseAction::VERSION_CODE_MATCHER
        end

        def next_version_name
          version_name = current_release[:version_name]
          version = version_name.split('.').map(&:to_i)
          version[version.size - 1] += 1
          version.join('.')
        end

        def next_version_code
          current_release[:version_code] + 1
        end

        def current_release
          GetAndroidReleaseAction.run
        end
      end
    end
  end
end
