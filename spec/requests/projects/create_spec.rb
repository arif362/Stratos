require 'rails_helper'

RSpec.describe "Create Project", type: :request do
  describe "POST /projects" do
    let! (:company) { create(:company) }
    let! (:params)  { attributes_for(:project).merge(company_id: company.to_param)  }

    def endpoint
      "/api/projects"
    end

    context "Successful request" do
      before do
        post endpoint, params: { project: params }
      end

      it "returns 201 created" do
        expect(response).to have_http_status(:created)
      end

      it "returns proper json structure" do
        expect(response).to match_schema(ProjectSinglularSchema)
      end
    end

    context "Unsuccessful request" do
      context "Invalid params" do
        context "Missing identifier" do
          let! (:invalid_params) { params.except(:identifier) }

          before do
            post endpoint, params: { project: invalid_params }
          end

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

        context "Missing name" do
          let! (:invalid_params) { params.except(:name) }

          before do
            post endpoint, params: { project: invalid_params }
          end

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

        context "Missing project parent container" do
          before do
            post endpoint, params: params # no {project:}
          end

          it "returns 422" do
            expect(response).to have_http_status(:unprocessable_entity)
            expect(json_body.errors.first.status).to eql('422')
          end

          it "returns proper error json" do
            errors = json_body.errors
            expect(errors.first.detail).to eql("Project is missing")
            expect(errors.first.source.pointer).to eql("data/params/project")
          end
        end

        context "Missing all params" do
          let! (:invalid_params) { params.merge(name: "", identifier: "", description: "") }

          before do
            post endpoint, params: { project: invalid_params }
          end

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