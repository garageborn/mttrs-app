module Fastlane
  module Actions
    class SentryReleaseAction < Action
      class << self
        SENTRY_ORGANIZATION = 'garage-born'.freeze
        SENTRY_TOKEN = 'cb656b3c64924e48a38150b665ff456b7bde20c4b19c40258eb52bffebcb48af'.freeze
        SENTRY_APP_NAME = 'mttrs-app'.freeze
        JSBUNDLE_NAME = 'main.jsbundle'.freeze
        JSBUNDLE_META_NAME = 'main.jsbundle.meta'.freeze
        JSBUNDLE_MAP_NAME = 'main.jsbundle.map'.freeze
        JSBUNDLE_MAP_PATH = File.expand_path("../../../#{ JSBUNDLE_MAP_NAME }", __FILE__)

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
              --bundle-output #{ JSBUNDLE_NAME } \
              --sourcemap-output #{ JSBUNDLE_MAP_NAME }
          CMD
          remove_pwd_from_sourcemap
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
              -F file=@#{ JSBUNDLE_NAME } \
              -F name="/#{ JSBUNDLE_NAME }"
          CMD
        end

        def upload_jsbundle_map
          UI.message 'Create upload jsbundle map'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            curl https://sentry.io/api/0/projects/#{ SENTRY_ORGANIZATION }/#{ SENTRY_APP_NAME }/releases/#{ sentry_release }/files/ \
            -X POST \
            -H 'Authorization: Bearer #{ SENTRY_TOKEN }' \
            -F file=@#{ JSBUNDLE_MAP_NAME } \
            -F name="/#{ JSBUNDLE_MAP_NAME }"
          CMD
        end

        def cleanup
          UI.message 'cleanup'
          sh <<-CMD
            cd #{ ENV['PWD'] } &&
            rm -rf #{ JSBUNDLE_NAME } #{ JSBUNDLE_MAP_NAME } #{ JSBUNDLE_META_NAME }
          CMD
        end

        def platform
          lane_context[:PLATFORM_NAME]
        end

        def sentry_release
          GetReleaseIdAction.run(platform: platform)
        end

        def remove_pwd_from_sourcemap
          new_content = File.read(JSBUNDLE_MAP_PATH)
          new_content.gsub!(ENV['PWD'], '')
          File.write(JSBUNDLE_MAP_PATH, new_content)
        end
      end
    end
  end
end
