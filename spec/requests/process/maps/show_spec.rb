require 'rails_helper'

RSpec.describe "Show ProcessMap", type: :request do
  describe "GET /process/maps/:id" do
    let! (:process_map) { create(:process_map) }

    def endpoint(record_or_id)
      "/api/process/maps/#{record_or_id.to_param}"
    end

    context "Successful request" do
      before do
        get endpoint(process_map)
      end

      it "returns 200 status" do
        expect(response).to have_http_status(200)
      end

      # it "returns proper json structure" do
      #   expect(response).to match_schema(ProjectSinglularSchema)
      # end
    end

  end
end