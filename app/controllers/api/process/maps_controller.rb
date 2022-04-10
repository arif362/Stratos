module Api
  module Process
    class MapsController < ApiController

      # TODO: Need to use policies and scope to limit what's returned here
      # for proper user authorization
      # related components: Users/User roles & permissions
      def index
        authorize(ProcessMap)
        process_maps = ProcessMap.all
        render json: serialize(ProcessMapSerializer, process_maps),
          status: :ok
      end


      schema(:create) do
        required(:process_map).hash do
          required(:project_id).filled(:integer)
          required(:name).filled(:string)
          optional(:description).filled(:string)
          optional(:template_id).filled(:integer)
        end
      end
      def create
        process_map = ProcessMap.new(permitted_attributes(ProcessMap))
        authorize(process_map)
        if process_map.valid? && process_map.save
          render json: serialize(ProcessMapSerializer, process_map),
            status: :created
        else
          render json: serialize(ValidationsSerializer, process_map),
            status: :unprocessable_entity
        end
      end


      schema(:show) do
        required(:id).value(:integer)
      end
      def show
        process_map = ProcessMap.find(safe_params[:id])
        authorize(process_map)
        render json: serialize(ProcessMapSerializer, process_map),
          status: :ok
      end

    end
  end
end