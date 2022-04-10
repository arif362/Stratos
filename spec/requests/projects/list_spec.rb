require 'rails_helper'

RSpec.describe "List Projects", type: :request do
  describe "GET /projects" do
    let! (:projects) { create_list(:project, 3) }

    def endpoint
      "/api/projects"
    end

    context "Successful request" do
      before do
        get endpoint
      end

      it "returns 200 status" do
        expect(response).to have_http_status(200)
      end

      it "returns proper json structure" do
        expect(response).to match_schema(ProjectCollectionSchema)
      end

      it "returns proper data" do
        expect(json_body.data.length).to eql(3)
      end
    end

  end
end
