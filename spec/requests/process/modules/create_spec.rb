require 'rails_helper'

RSpec.describe "Create ProcessModule", type: :request do
  describe "POST /process/modules" do
    let! (:project) { create(:project) }
    let! (:parent) {
      map = create(:process_map, project_id: project.id)
      phase = create(:process_phase, parent_id: map.id, project_id: project.id)
      phase
    }

    let! (:files)    { [
        fixture_file_upload('glasses.png', 'image/png'),
        fixture_file_upload('glasses_2.png', 'image/png')
      ]
    }

    let! (:params) {
      attributes_for(:process_module)
        .merge(
          parent_id: parent.id,
          project_id: project.id,
          files: files
        )
    }

    def endpoint
      "/api/process/modules"
    end

    context "Successful request" do
      before do
        post endpoint, params: { process_module: params }
      end

      it "returns 201 created" do
        expect(response).to have_http_status(:created)
      end

      it "uploads the files" do
        expect(ActiveStorage::Blob.count).to eql(2)
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