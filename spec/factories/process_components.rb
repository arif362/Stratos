FactoryBot.define do
  factory :process_map do
    project
    identifier { Faker::Number.unique.number(digits: 10) }
    type { "ProcessMap" }
    name { Faker::App.unique.name}
    description { Faker::Lorem.paragraph }
  end

  factory :process_phase do
    project
    identifier { Faker::Number.unique.number(digits: 10) }
    type { "ProcessPhase" }
    name { Faker::App.unique.name}
    description { Faker::Lorem.paragraph }
  end

  factory :process_module do
    project
    identifier { Faker::Number.unique.number(digits: 10) }
    type { "ProcessModule" }
    name { Faker::App.unique.name}
    description { Faker::Lorem.paragraph }
  end

  factory :process_step do
    project
    identifier { Faker::Number.unique.number(digits: 10) }
    type { "ProcessStep" }
    name { Faker::App.unique.name}
    description { Faker::Lorem.paragraph }
  end

  factory :process_task do
    project
    identifier { Faker::Number.unique.number(digits: 10) }
    type { "ProcessTask" }
    name { Faker::App.unique.name}
    description { Faker::Lorem.paragraph }
  end
end