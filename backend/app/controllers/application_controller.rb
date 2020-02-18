class ApplicationController < ActionController::API
  
  # need to hide the secret in an ENV file for production (already done and changed, leaving here for debugging):
  # https://www.viget.com/articles/storing-secret-credentials-in-rails-5-2-and-up/
  def secret
    ENV['JWTsecret']
  end


end
