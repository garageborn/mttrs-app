module Fastlane
  module Actions
    class SentryReleaseAction < Action
      class << self
        SENTRY_ORGANIZATION = 'garage-born'.freeze
        SENTRY_TOKEN = 'cb656b3c64924e48a38150b665ff456b7bde20c4b19c40258eb52bffebcb48af'.freeze
        SENTRY_APP_NAME = 'mttrs-app'.freeze

        def run(params)
          UI.message 'Sentry Release'

          bundle_app
          create_release
          upload_jsbundle
          upload_jsbundle_map
          cleanup
        end

        def is_supported?(platform)
           %i(ios android).include?(platform)
        end

        private

        def sentry_app_name
          "mttrs-#{ platform }"
        end

        def bundle_app
          UI.message 'Bundle app'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            react-native bundle \
              --dev false \
              --platform #{ platform } \
              --entry-file index.#{ platform }.js \
              --bundle-output #{ jsbundle_name } \
              --sourcemap-output #{ jsbundle_map_name }
          CMD
        end

        def create_release
          UI.message 'Create release'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            curl https://sentry.io/api/0/projects/#{ SENTRY_ORGANIZATION }/#{ SENTRY_APP_NAME }/releases/ \
              -X POST -H 'Authorization: Bearer #{ SENTRY_TOKEN }' \
              -H 'Content-Type: application/json' \
              -d '{"version": "#{ sentry_release }"}'
          CMD
        end

        def upload_jsbundle
          UI.message 'Create upload jsbundle'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            curl https://sentry.io/api/0/projects/#{ SENTRY_ORGANIZATION }/#{ SENTRY_APP_NAME }/releases/#{ sentry_release }/files/ \
              -X POST \
              -H 'Authorization: Bearer #{ SENTRY_TOKEN }' \
              -F file=@#{ jsbundle_name } \
              -F name="/#{ jsbundle_name }"
          CMD
        end

        def upload_jsbundle_map
          UI.message 'Create upload jsbundle map'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            curl https://sentry.io/api/0/projects/#{ SENTRY_ORGANIZATION }/#{ SENTRY_APP_NAME }/releases/#{ sentry_release }/files/ \
            -X POST \
            -H 'Authorization: Bearer #{ SENTRY_TOKEN }' \
            -F file=@#{ jsbundle_map_name } \
            -F name="/#{ jsbundle_map_name }"
          CMD
        end

        def cleanup
          UI.message 'cleanup'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            rm -rf #{ jsbundle_name } #{ jsbundle_map_name } #{ jsbundle_meta_name }
          CMD
        end

        def platform
          lane_context[:PLATFORM_NAME]
        end

        def jsbundle_name
          "main.#{ platform }.jsbundle"
        end

        def jsbundle_meta_name
          "main.#{ platform }.jsbundle.meta"
        end

        def jsbundle_map_name
          "main.#{ platform }.jsbundle.map"
        end

        def sentry_release
          "#{ platform }_#{ version_number }_#{ build_number }"
        end

        def version_number
          if platform == :ios
            GetVersionNumberAction.run(xcodeproj: 'ios/mttrs.xcodeproj')
          else
            GetAndroidReleaseAction.run[:version_name]
          end
        end

        def build_number
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
