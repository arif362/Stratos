Rails.application.routes.draw do
  devise_for :users, ActiveAdmin::Devise.config

  ActiveAdmin.routes(self)

  namespace :api do
    resources :projects, only: [:create, :update, :show, :index] do
      resources :risks, only: [:index, :show, :create, :update]
      resources :tasks, only: [:index, :show, :create, :update]
    end
    resources :user_roles, only: [:index]
    resources :categories, only: [:index, :create, :update]
    resources :sub_categories, only: [:index, :create, :update]
    resources :category_breakdowns, only: [:index, :create, :update]
    resources :line_items, only: [:index, :create, :update]
    resources :budget_items, only: [:index, :show, :create, :update]
    resources :contracts, only: [:index, :show, :create, :update]
    resources :invoices, only: [:index, :show, :create, :update]
    resources :risks, only: [:index, :show, :create, :update]
    resources :tasks, only: [:index, :show, :create, :update] do
      collection do
        get 'critical', to: 'tasks#index', defaults: {critical: true}
        get 'mine', to: 'tasks#index', defaults: {mine: true}
      end
    end
    resources :contacts, only: [:index, :show, :create, :update]
    resources :companies, only: [:index, :show, :create, :update]
    namespace :process do
      resources :maps, only: [:index, :show, :create]
      resources :phases, only: [:create]
      resources :modules, only: [:create]
      resources :steps, only: [:create]
      resources :tasks, only: [:create]
    end
  end

  root 'client#app'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  # DHH - "Source mapping is still not fully supported yet"
  # https://github.com/rails/jsbundling-rails/issues/40
  #
  # Adds route to avoid 404s for source maps
  # TODO - this should work or there should be a fix for this soon
  if Rails.env.development?
    redirector = lambda { |params, _req|
      ApplicationController.helpers.asset_path(params[:name].split('-').first + '.map')
    }
    constraint = ->(request) { request.path.ends_with?('.map') }
    get 'assets/*name', to: redirect(redirector), constraints: constraint
  end

  get '*path', to: 'client#app'
end
