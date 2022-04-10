require 'rails_helper'

RSpec.describe "Show Project", type: :request do
  describe "GET /projects/:id" do
    let! (:project) { create(:project) }

    def endpoint(record_or_id)
      "/api/projects/#{record_or_id.to_param}"
    end

    context "Successful request" do
      before do
        get endpoint(project)
      end

      it "returns 200 status" do
        expect(response).to have_http_status(200)
      end

      it "returns proper json structure" do
        expect(response).to match_schema(ProjectSinglularSchema)
      end
    end

  end
end