require './lib/head_tags_helper'
require './lib/webfonts_helper'

helpers HeadTagsHelper
helpers WebfontsHelper
compass_config { |config| config.output_style = :compact }

configure :build do
  activate :automatic_image_sizes
  activate :cache_buster
  activate :relative_assets
end

