require './lib/head_tags_helper'
require './lib/webfonts_helper'
require './lib/map_helper'
require './lib/google_analytics_helper'

helpers HeadTagsHelper
helpers WebfontsHelper
helpers MapHelper
helpers GoogleAnalyticsHelper

activate :relative_assets
activate :cache_buster

configure :build do
  activate :automatic_image_sizes

  compass_config { |config|
    config.output_style = :compact
    config.line_comments = false
  }
end

