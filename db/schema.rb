# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_25_192913) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "activities", force: :cascade do |t|
    t.string "name", null: false
    t.integer "duration", null: false
    t.datetime "baseline_start"
    t.datetime "baseline_end"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.string "predecessor"
    t.string "link_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "project_id", null: false
    t.index ["project_id"], name: "index_activities_on_project_id"
  end

  create_table "budget_items", force: :cascade do |t|
    t.decimal "approved_budget", precision: 20, scale: 2
    t.decimal "anticipated_cost", precision: 20, scale: 2
    t.decimal "expenditures_to_date", precision: 20, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "project_id", null: false
    t.bigint "line_item_id", null: false
    t.index ["line_item_id"], name: "index_budget_items_on_line_item_id"
    t.index ["project_id"], name: "index_budget_items_on_project_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "category_breakdowns", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "sub_category_id", null: false
    t.index ["sub_category_id"], name: "index_category_breakdowns_on_sub_category_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.integer "users_count", default: 0, null: false
    t.integer "projects_count", default: 0, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "title"
    t.string "phone"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["first_name"], name: "index_contacts_on_first_name"
    t.index ["last_name"], name: "index_contacts_on_last_name"
  end

  create_table "contracts", force: :cascade do |t|
    t.string "firm_name", null: false
    t.string "contract_breakdown", null: false
    t.date "commitment_date"
    t.decimal "commitment_value", precision: 20, scale: 2
    t.decimal "expenditures_to_date", precision: 20, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "project_id", null: false
    t.bigint "budget_item_id", null: false
    t.index ["budget_item_id"], name: "index_contracts_on_budget_item_id"
    t.index ["project_id"], name: "index_contracts_on_project_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.decimal "value", precision: 20, scale: 2, null: false
    t.integer "number", null: false
    t.integer "status", default: 0, null: false
    t.string "contract_breakdown"
    t.datetime "recommended_status_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "project_id", null: false
    t.string "firm_name"
    t.bigint "contract_id", null: false
    t.index ["contract_id"], name: "index_invoices_on_contract_id"
    t.index ["project_id"], name: "index_invoices_on_project_id"
  end

  create_table "line_items", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "project_id", null: false
    t.bigint "category_breakdown_id"
    t.index ["category_breakdown_id"], name: "index_line_items_on_category_breakdown_id"
    t.index ["project_id"], name: "index_line_items_on_project_id"
  end

  create_table "process_components", force: :cascade do |t|
    t.bigint "project_id", null: false
    t.bigint "template_id"
    t.bigint "user_role_id"
    t.string "identifier"
    t.string "type"
    t.string "name"
    t.text "description"
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.datetime "completed_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "ancestry"
    t.index ["ancestry"], name: "index_process_components_on_ancestry"
    t.index ["project_id"], name: "index_process_components_on_project_id"
  end

  create_table "projects", force: :cascade do |t|
    t.string "identifier"
    t.string "name"
    t.text "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "company_id", null: false
    t.datetime "due_date"
    t.string "location"
    t.integer "budget_cents"
    t.integer "cost_cents"
    t.index ["company_id"], name: "index_projects_on_company_id"
  end

  create_table "risks", force: :cascade do |t|
    t.string "name", null: false
    t.string "impact"
    t.integer "rank", default: 0, null: false
    t.boolean "critical", default: false, null: false
    t.datetime "due_date", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.index ["project_id"], name: "index_risks_on_project_id"
    t.index ["user_id"], name: "index_risks_on_user_id"
  end

  create_table "sub_categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "category_id", null: false
    t.index ["category_id"], name: "index_sub_categories_on_category_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.datetime "due_date"
    t.boolean "critical"
    t.bigint "project_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["project_id"], name: "index_tasks_on_project_id"
    t.index ["user_id"], name: "index_tasks_on_user_id"
  end

  create_table "user_roles", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "company_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_id"], name: "index_user_roles_on_company_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "company_id"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "contact_id"
    t.bigint "user_role_id"
    t.index ["company_id"], name: "index_users_on_company_id"
    t.index ["contact_id"], name: "index_users_on_contact_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["user_role_id"], name: "index_users_on_user_role_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "activities", "projects"
  add_foreign_key "budget_items", "line_items"
  add_foreign_key "budget_items", "projects"
  add_foreign_key "category_breakdowns", "sub_categories"
  add_foreign_key "contracts", "budget_items"
  add_foreign_key "contracts", "projects"
  add_foreign_key "invoices", "contracts"
  add_foreign_key "invoices", "projects"
  add_foreign_key "line_items", "category_breakdowns"
  add_foreign_key "line_items", "projects"
  add_foreign_key "process_components", "projects"
  add_foreign_key "projects", "companies"
  add_foreign_key "risks", "projects"
  add_foreign_key "risks", "users"
  add_foreign_key "sub_categories", "categories"
  add_foreign_key "tasks", "projects"
  add_foreign_key "tasks", "users"
  add_foreign_key "user_roles", "companies"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "contacts"
  add_foreign_key "users", "user_roles"
end
