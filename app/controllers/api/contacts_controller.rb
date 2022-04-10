module Api
  class ContactsController < ApiController
    before_action :find_contact, only: [:show, :update]

    def index
      authorize(Contact)

      contacts = Contact.all
      render json: serialize(ContactSerializer, contacts),
             status: :ok
    end

    schema(:update) do
      required(:contact).hash do
        required(:id).filled(:integer)
        optional(:first_name).filled(:string)
        optional(:last_name).filled(:string)
        optional(:title).filled(:string)
        optional(:phone).filled(:string)
      end
    end

    def update
    end

    schema(:create) do
      required(:contact).hash do
        required(:first_name).filled(:string)
        required(:last_name).filled(:string)
        optional(:title).filled(:string)
        optional(:phone).filled(:string)
      end
    end

    def create
      contact = Contact.new(permitted_attributes(Contact))
      if contact.valid? && contact.save
        render json: serialize(ContactSerializer, contact),
               status: :created
      else
        render json: serialize(ValidationsSerializer, contact),
               status: :unprocessable_entity
      end
    end

    def show
      authorize(@contact)
      render json: serialize(ContactSerializer, @contact),
             status: :ok
    end

    private

    def find_contact
      @contact = Contact.find params[:id]
    end
  end
end
