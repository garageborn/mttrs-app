module Fastlane
  module Actions
    class GetReleaseIdAction < Action
      class << self
        def run(params = {})
          UI.message 'Get Next Release ID'

          platform = params[:platform]
          "#{ platform }_#{ version_number(platform) }_#{ build_number(platform) }"
        end

        def is_supported?(platform)
          %i(ios android).include?(platform)
        end

        private

        def version_number(platform)
          if platform == :ios
            GetVersionNumberAction.run(xcodeproj: 'ios/mttrs.xcodeproj')
          else
            GetAndroidReleaseAction.run[:version_name]
          end
        end

        def build_number(platform)
          if platform == :ios
            GetBuildNumberAction.run(xcodeproj: 'ios/mttrs.xcodeproj')
          else
            GetAndroidReleaseAction.run[:version_code]
          end
        end
      end
    end
  end
end
