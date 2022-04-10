require 'rails_helper'

RSpec.describe "Update Project", type: :request do
  describe "PATCH /projects/:id" do
    let! (:project) { create(:project) }

    def endpoint(record_or_id)
      "/api/projects/#{record_or_id.to_param}"
    end

    context "Successful request" do
      let! (:params) do
        {
          name: "New Name",
          description: "New Description",
          identifier: "New ID",
          company_id: project.company.to_param
        }
      end

      before do
        patch endpoint(project), params: { project: params }
      end

      it "returns 200 ok" do
        expect(response).to have_http_status(:ok)
      end

      it "returns proper json structure" do
        expect(response).to match_schema(ProjectSinglularSchema)
      end

      it "returns proper data" do
        project = json_hash['data']['attributes']
        expect(project).to include({
          name: params[:name],
          identifier: params[:identifier],
          description: params[:description]
        })
      end
    end

    context "Unsuccessful request" do
      context "Validations" do
        before do
          patch endpoint(project), params: { project: invalid_params }
        end

        context "Invalid identifier" do
          let! (:invalid_params) {
            attributes_for(:project).merge(identifier: "")
          }

          it "returns 422" do
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_body.errors.first.status).to eql('422')
          end

          it "returns proper error json" do
            errors = json_body.errors
            expect(errors.first.detail).to eql("Identifier is missing")
            expect(errors.first.source.pointer).to eql("data/params/identifier")
          end
        end

        context "Invalid name" do
          let! (:invalid_params) {
            attributes_for(:project).merge(name: "")
          }

          it "returns 422" do
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_body.errors.first.status).to eql('422')
          end

          it "returns proper error json" do
            errors = json_body.errors
            expect(errors.first.detail).to eql("Name is missing")
            expect(errors.first.source.pointer).to eql("data/params/name")
          end
        end
      end
    end

  end
end