set :stages, %w(dev testing release)
set :default_stage, "dev"
set :stage_dir,     "deploy/stages"
require "capistrano/ext/multistage"
