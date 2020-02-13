class ApplicationController < ActionController::API
  
  # need to hide this in an ENV file for production:
  # https://www.viget.com/articles/storing-secret-credentials-in-rails-5-2-and-up/
  def secret
    "dontTellThisToAnyone"
  end
end
