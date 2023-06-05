Rails.application.routes.draw do
  get 'messages/create'
  get 'chatrooms/show'
  devise_for :users
  root to: "pages#home"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :chatrooms, only: :show do
    resources :messages, only: :create
  end
end
