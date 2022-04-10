FactoryBot.define do
  factory :task do
    name { "MyString" }
    due_date { "2022-03-17 02:40:02" }
    critical { false }
    project { nil }
    user { nil }
  end
end
