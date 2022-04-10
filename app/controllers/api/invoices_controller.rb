module Api
  class InvoicesController < ApiController

    def index
      authorize(Invoice)

      invoices = Invoice.where(project_id: params[:project_id])
      render json: serialize(InvoiceSerializer, invoices),
             status: :ok
    end

    schema(:show) do
      required(:id).value(:integer)
    end

    def show
      invoice = policy_scope(Invoice).find(safe_params[:id])
      authorize(invoice)
      render json: serialize(InvoiceSerializer, invoice),
             status: :ok
    end

    schema(:create, :update) do
      optional(:id).value(:integer) # for update
      required(:invouce).hash do
        required(:value).filled(:integer)
        optional(:number).filled(:integer)
        required(:status).filled(:integer)
        required(:recommended_status_date).filled(:datetime)
        required(:firm_name).filled(:string)
        required(:contract_breakdown).filled(:string)
        optional(:files).filled(:array)
        required(:contract_id).filled(:integer)
        required(:project_id).filled(:integer)
      end
    end

    def create
      invoice = Invoice.new(permitted_attributes(Invoice))
      authorize(invoice)
      if invoice.valid? && invoice.save
        render json: serialize(InvoiceSerializer, invoice),
               status: :created
      else
        render json: serialize(ValidationsSerializer, invoice),
               status: :unprocessable_entity
      end
    end

    def update
      invoice = policy_scope(Invoice).find(safe_params[:id])
      invoice.assign_attributes(permitted_attributes(invoice))

      if authorize(invoice) && invoice.save
        render json: serialize(InvoiceSerializer, invoice),
             status: :ok
      else
        render json: serialize(ValidationsSerializer, invoice),
               status: :unprocessable_entity
      end
    end

  end
end
