namespace :categories do
  desc "Added Major and sub categories"
  task create_major_and_sub_categories: :environment do

    Category.destroy_all
    SubCategory.destroy_all
    CategoryBreakdown.destroy_all

    ['Land Cost', 'Bond Cost', 'Building Cost', 'Soft Cost', 'Hard Cost', 'Contingency'].each do |category|
      Category.where(name: category).first_or_create!
    end

    land_cost = Category.find_by(name: 'Land Cost')
    cat1 = SubCategory.where(name: 'Land Purchase', category_id: land_cost.id).first_or_create!
    ['Land Cost', 'Realtor Costs', 'Land Purchase Legal Costs', 'Pre-Closing Costs (Appraisal, Inspection, Survey)',
     'Closing Costs', 'Real Estate Taxes', 'Other Owner Land Puchase Costs'].each do |category|
      CategoryBreakdown.where(name: category, sub_category_id: cat1.id).first_or_create!
    end

    soft_cost = Category.find_by(name: 'Soft Cost')
    ['Financing Costs', 'Consultant Fees', 'Professional Service Costs', 'Fixtures, Furnishing & Equipments',
     'Moving Costs', 'Legal', 'Owner Insurance Costs', 'Other Owner Soft Costs'].each do |cat|
      SubCategory.where(name: cat, category_id: soft_cost.id).first_or_create!
    end

    legal = SubCategory.find_by(name: 'Legal')
    CategoryBreakdown.where(name: 'Miscellaneous Legal Costs', sub_category_id: legal.id).first_or_create!

    other_soft_cost = SubCategory.find_by(name: 'Other Owner Soft Costs')
    CategoryBreakdown.where(name: 'Miscellaneous Other Owner Soft Costs', sub_category_id: other_soft_cost.id).first_or_create!

    soft_cost1 = SubCategory.find_by(name: 'Financing Costs')
    ['Debit Issuance Costs', 'Other Financing Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: soft_cost1.id).first_or_create!
    end

    soft_cost2 = SubCategory.find_by(name: 'Consultant Fees')
    ['Owner Representative', 'Architect / Engineering Consultants', 'Architect', 'Civil Engineer', 'MEP Engineer',
     'Structural Engineer', 'Interior Designer', 'Acoustics Engineer', 'Lighting Designer', 'A/V Designer', 'IT Designer',
     'Kitchen Designer', 'Building Envelope Consultant', 'Furniture Designer', 'Space Planner', 'Material Testing Consultant',
     'Surveyor', 'Soil Testing', 'Environmental Consultant', 'Title Company - Waiver Reviews', 'Artwork Consultant',
     'Security Consultant', 'Other Consultant Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: soft_cost2.id).first_or_create!
    end

    soft_cost3 = SubCategory.find_by(name: 'Fixtures, Furnishing & Equipments')
    ['Furniture', 'Signage', 'Miscellaneous Fixtures', 'IT / Data / ELV Equipment', 'Phone System', 'A/V Equipment', 'Artwork',
      'Security Equipment', 'Other FF&E Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: soft_cost3.id).first_or_create!
    end

    soft_cost4 = SubCategory.find_by(name: 'Moving Costs')
    ['Move Enabling Costs', 'Moving Company Costs', 'Other Moving Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: soft_cost4.id).first_or_create!
    end

    soft_cost5 = SubCategory.find_by(name: 'Owner Insurance Costs')
    ['Builders Risk Insurance Costs', 'Other Insurance Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: soft_cost5.id).first_or_create!
    end

    building_cost = Category.find_by(name: 'Building Cost')
    ['Building Construction', 'Environmental Remediation', 'Site Utilities', 'Permitting and Zoning Fees'].each do |cat|
      SubCategory.where(name: cat, category_id: building_cost.id).first_or_create!
    end

    hard_cost1 = SubCategory.find_by(name: 'Building Construction')
    ['Construction Cost (base contract)', 'Change orders (Signed)', 'Change orders (Pending)', 'Change Order Contingency',
     'Construction Risk Items', 'Phasing', 'Other Construction Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: hard_cost1.id).first_or_create!
    end

    hard_cost2 = SubCategory.find_by(name: 'Site Utilities')
    ['Electric Connection Costs', 'Gas Connection Costs', 'Phone and Data Connection Costs', 'Water Connection Costs',
     'Sewer Connection Costs', 'Other Utility Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: hard_cost2.id).first_or_create!
    end

    hard_cost3 = SubCategory.find_by(name: 'Environmental Remediation')
    ['Abatement Costs', 'Enabling Work Costs', 'Other Remediation Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: hard_cost3.id).first_or_create!
    end

    hard_cost4 = SubCategory.find_by(name: 'Permitting and Zoning Fees')
    ['Building Permit Costs', 'Water and Sewer Permit Costs', 'Health Department Costs', 'Zoning Fee Costs',
     'Development Impact Costs', 'Environmental Permit Costs', 'Other Permitting, Impact and Zoning Costs'].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: hard_cost4.id).first_or_create!
    end

    contingency = Category.find_by(name: 'Contingency')
    owner = SubCategory.where(name: 'Owner Contingency', category_id: contingency.id).first_or_create!
    ['General Owner Contingency Costs', 'Owner Contingency for Land Costs', 'Owner Contingency for Hard Costs',
     'Owner Contingency for Soft Costs '].each do |cat|
      CategoryBreakdown.where(name: cat, sub_category_id: owner.id).first_or_create!
    end
  end
end
