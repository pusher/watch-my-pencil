class ApplicationController < ActionController::Base
	protect_from_forgery

	before_filter :set_pusher_key

	def set_pusher_key
		@pusher_key = Pusher.key
	end
end
