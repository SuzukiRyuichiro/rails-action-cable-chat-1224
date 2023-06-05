class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def spotify
    credentials = request.env["omniauth.auth"]
    user = User.find_for_oauth(credentials)

    if user.persisted?
      sign_in_and_redirect user, event: :authentication
      set_flash_message(:notice, :success, kind: 'Spotify') if is_navigational_format?
    else
      session['devise.spotify_data'] = credentials
      redirect_to new_user_registration_url
    end
  end
end
