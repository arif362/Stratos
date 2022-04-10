require 'rails_helper'

RSpec.describe "List ProcessMaps", type: :request do
  describe "GET /process/maps" do
    let! (:process_maps) { create_list(:process_map, 3) }

    def endpoint
      "/api/process/maps"
    end

    context "Successful request" do
      before do
        get endpoint
      end

      it "returns 200 status" do
        expect(response).to have_http_status(200)
      end

      it "returns proper data" do
        expect(json_body.data.length).to eql(3)
      end

      # it "returns proper json structure" do
      #   expect(response).to match_schema(ProjectCollectionSchema)
      # end
    end

  end
end
