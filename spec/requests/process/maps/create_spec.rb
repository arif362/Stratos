require 'rails_helper'

RSpec.describe "Create ProcessMap", type: :request do
  describe "POST /process/maps" do
    let! (:project) { create(:project) }
    let! (:params)  {
      attributes_for(:process_map)
        .merge(project_id: project.id)
    }

    def endpoint
      "/api/process/maps"
    end

    context "Successful request" do
      before do
        post endpoint, params: { process_map: params }
      end

      it "returns 201 created" do
        expect(response).to have_http_status(:created)
      end

      # it "returns proper json structure" do
      #   expect(response).to match_schema(ProjectSinglularSchema)
      # end
    end

    context "Unsuccessful request" do
      context "Invalid params" do

      end
    end
  end
end