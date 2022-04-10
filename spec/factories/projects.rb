FactoryBot.define do
  factory :project do
    company
    name { Faker::App.unique.name}
    description { Faker::Lorem.paragraph }
    identifier { Faker::IDNumber.valid }
  end
end
