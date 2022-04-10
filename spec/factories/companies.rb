FactoryBot.define do
  factory :company do
    name { Faker::App.unique.name}
  end
end
