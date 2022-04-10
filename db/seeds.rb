# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  company = Company.where(
    name: "Nicholson"
  ).first_or_create

  # CONTACT
  contact_admin = Contact.where(
    first_name: 'Admin',
    last_name: 'Admin'
  ).first_or_create(
    first_name: 'Admin',
    last_name: 'Admin',
    title: 'Engineer',
    phone: '999999999'
  )

  # USER ROLES
  [{ name: 'Owner(Client)', company_id: company.id },
   { name: 'Director', company_id: company.id },
   { name: 'Consultant', company_id: company.id },
   { name: 'Architect/Engineer', company_id: company.id },
   { name: 'Contractor', company_id: company.id },
  ].each do |attributes|
    UserRole.where(
      company_id: attributes[:company_id],
      name: attributes[:name]
    ).first_or_create!(
      attributes
    )
  end

  contact_other = Contact.where(
    first_name: 'John',
    last_name: 'Doe'
  ).first_or_create(
    first_name: 'John',
    last_name: 'Doe',
    title: 'Systems',
    phone: '111111111'
  )

  admin = User.where(
    email: 'admin@example.com'
  ).first_or_create(
    password: 'password',
    password_confirmation: 'password',
    company_id: company.id,
    contact_id: contact_admin.id,
    user_role_id: UserRole.first.id
  )

  other_user = User.where(
    email: 'user@example.com'
  ).first_or_create(
    password: 'password',
    password_confirmation: 'password',
    company_id: company.id,
    contact_id: contact_other.id,
    user_role_id: UserRole.first.id
  )

  [
    {
      identifier: "N001",
      name: "Nicholson Marketplace",
      description: "Some long description for Nicholson Marketplace",
      company: company
    },
    {
      identifier: "ML-001",
      name: 'Manhattan Library',
      company: company,
      location: "New York",
      due_date: '2022-11-22',
      description: "This is a description for the Manhattan Library",
      budget: 100,
      cost: 70
    },
    {
      identifier: "AC-002",
      name: 'Adrenwood Courthouse',
      company: company,
      location: "New Jersey",
      due_date: '2022-06-10',
      description: "This is a description for the Adrenwood Courthouse",
      budget: 90,
      cost: 100
    },
    {
      identifier: "AKS-987",
      name: 'Arkshire Shops',
      company: company,
      location: "Philadelphia, PA",
      due_date: '2022-02-17',
      description: "This is a description for Arkshire shops",
      budget: 150,
      cost: 70
    }
  ].each do |attributes|
    Project.where(
      identifier: attributes[:identifier]
    ).first_or_create(
      attributes
    )
  end

  project = Project.first

  [
    {
      project_id: project.id,
      name: "Glass Change Order from Supply Depot #1",
      user_id: admin.id,
      due_date: "11/11/2022",
      impact: "Time",
      rank: "high"
    },
    {
      project_id: project.id,
      name: "Steel from SteelBrothers & Co.",
      user_id: admin.id,
      due_date: "20/12/2022",
      impact: "Time",
      rank: "high"
    },
    {
      project_id: project.id,
      name: "Wood from A1 Building Supply",
      user_id: other_user.id,
      due_date: "30/11/2022",
      impact: "Time",
      rank: "medium"
    },
    {
      project_id: project.id,
      name: "December Concrete from Acme",
      user_id: other_user.id,
      due_date: "13/11/2022",
      impact: "Time",
      rank: "low"
    }
  ].each do |attributes|
    Risk.where(
      project_id: attributes[:project_id],
      name: attributes[:name]
    ).first_or_create!(
      attributes
    )
  end

  [
    { project_id: project.id, user_id: admin.id, name: "Order the things from the thing", due_date: "11/11/2022", critical: 1 },
    { project_id: project.id, user_id: other_user.id, name: "Send the thing to the other person", due_date: "20/12/2022", critical: 0 },
    { project_id: project.id, user_id: admin.id, name: "Follow up on that thing for that person", due_date: "11/10/2022", critical: 1 },
    { project_id: project.id, user_id: other_user.id, name: "Close the thing for that thing", due_date: "11/12/2022", critical: 1 }
  ].each do |attributes|
    Task.where(
      project_id: attributes[:project_id],
      name: attributes[:name]
    ).first_or_create!(
      attributes
    )
  end

  Rake::Task['categories:create_major_and_sub_categories'].invoke
end
