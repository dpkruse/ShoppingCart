// ============================================================
// GLOBAL SCOPE — available to all questions in the block
// ============================================================

window._questionEngines = window._questionEngines || {};

// ITEM_REGISTRY — 240 items across 10 categories
// Basket conditions: healthy_a, healthy_b, unhealthy_a, unhealthy_b
// Additional categories (auto-assigned baskets, seed=42): Drinks, Snacks, Fruit, Meat Seafood, Freezer, Pantry, Ready to eat, Vegetables
//
// ⚠️  Label mismatches fixed vs CSV (Qualtrics is authoritative at runtime):
//     CSV "Bagel plain"              → "Bagel Plain"
//     CSV "Wholemeal roll"           → "Wholemeal Roll"
//     CSV "Wholemeal English Muffin" → "Wholemeal english muffin"
//     CSV "Wholegrain Wrap"          → "Wholemeal Wrap"  (confirmed same item)

window.ITEM_REGISTRY = {
    // --- Bakery (19 items) ---
    "Apple danish":             { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: true,  unhealthy_b: false } },
    "Bagel Plain":              { category: "bakery", tag: "healthy",   preselect: { healthy_a: true,  healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "BBQ Cheese & Bacon Roll":  { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Butter croissant":         { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cheese & Bacon Roll":      { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Choc Chip hot cross bun":  { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cinnamon scroll":          { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: true  } },
    "Double Choc Muffin":       { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Fruit filled tart":        { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: true,  unhealthy_b: false } },
    "Ham & Cheese Croissant":   { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "High fibre white bread":   { category: "bakery", tag: "healthy",   preselect: { healthy_a: true,  healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Jam filled doughnut":      { category: "bakery", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: true  } },
    "Multigrain bread":         { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: true,  unhealthy_a: false, unhealthy_b: false } },
    "Rye Bread":                { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Wholemeal Wrap":           { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Wholemeal bread":          { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Wholemeal english muffin": { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: true,  unhealthy_a: false, unhealthy_b: false } },
    "Wholemeal Pizza Base":     { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Wholemeal Roll":           { category: "bakery", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Dairy Eggs Fridge (28 items) ---
    "Reduced fat custard":           { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: true,  healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Reduced fat milk":              { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Ricotta cheese":                { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: true,  unhealthy_a: false, unhealthy_b: false } },
    "Soy Milk":                      { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Protein greek yoghurt":         { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Eggs":                          { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cottage cheese":                { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: true,  unhealthy_a: false, unhealthy_b: false } },
    "Reduced Fat Cheddar Cheese":    { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Fresh Napoli Sauce":            { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: true,  healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tofu":                          { category: "dairy_eggs_fridge", tag: "healthy",   preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Champagne Leg Ham":             { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Coconut yoghurt":               { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: true,  unhealthy_b: false } },
    "Salami":                        { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: true  } },
    "Roast Pastrami Sliced":         { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: true,  unhealthy_b: false } },
    "Chicken Breast Thinly Sliced":  { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Fresh Carbonara Pasta Sauce":   { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Middle Bacon":                  { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: true  } },
    "Silverside sliced":             { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate chip yoghurt":        { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Maple Bacon":                   { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chicken shredded":              { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Kabana":                        { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Prosciutto Sliced":             { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Turkey breast sliced":          { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "High Protein Chocolate Pudding":{ category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sliced Pancetta":               { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Smiley Fritz":                  { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Short Cut Bacon":               { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // [AUTO-GENERATED-START]
    // --- Drinks (13 items) ---
    "Spring Water":                             { category: "drinks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sparkling Water":                          { category: "drinks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Soda water":                               { category: "drinks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Orange Juice No added Sugar":              { category: "drinks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tropical punch juice":                     { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate flavoured coconut water":        { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sports Drink Flavoured":                   { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Flavoured water wildberry":                { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Energy Drink":                             { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "High protein chocolate shake":             { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Protein Water Berry Whey Protein Isolate": { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cola flavoured soda":                      { category: "drinks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Protein water citrus":                     { category: "drinks", tag: "", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Snacks (28 items) ---
    "Multigrain crackers and light cheese": { category: "snacks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Wholegrain rice crackers":             { category: "snacks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Multigrain crispbread crackers":       { category: "snacks", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Mini rice crisps milk chocolate":      { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Mix lollies":                          { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Jelly":                                { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Jelly beans":                          { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Liquorice":                            { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Marshmallows":                         { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Milk chocolate":                       { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Hazelnut spread":                      { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Mayple syrup":                         { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Snake lollies":                        { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Plain crackers":                       { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pretzels":                             { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Original potato chips":                { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "chicken potato chips":                 { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Salt & Vinegar chips":                 { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cheese corn chips":                    { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Choclate chip cookies":                { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Biscuits shortbread creams":           { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate coated biscuits":            { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate cream wafers":               { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Nut bars chocolate peanut & almond":   { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Rice bubbles snack bars":              { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Flavoured rainbow Sticks":             { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Crunchy oats & honey bars":            { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate oat slices":                 { category: "snacks", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Fruit (20 items) ---
    "Nectarine":                              { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Grapes":                                 { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Watermelon":                             { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Strawberries":                           { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "blueberries":                            { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "pears":                                  { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "pineapple":                              { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Apple":                                  { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Bannanas":                               { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Oranges":                                { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Kiwi fruit":                             { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Canned peaches":                         { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Canned fruit salad":                     { category: "fruit", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Dried apple":                            { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Dried mango":                            { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Banana Chips":                           { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Freeze dried fruit dipped in chocolate": { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Fruit Jelly Cup":                        { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Fruit string":                           { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Fruit roll up":                          { category: "fruit", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Meat Seafood (22 items) ---
    "Extra lean beef mince":    { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef sizzle steak":        { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Lamb leg diced":           { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pork sizzle steaks":       { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Extra lean pork mince":    { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Kangaroo diced":           { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chicken breast fillets":   { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Turkey mince":             { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Basa":                     { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Salmon":                   { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Barramundi":               { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tuna steaks":              { category: "meat_seafood", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Thin Bbq sausages":        { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef sausages":            { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef burgers patties":     { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Lamb burgers":             { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef Bbq burgers":         { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Kransky bites":            { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef brisket burgers":     { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef chevap":              { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Deli continental chorizo": { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Roll chicken":             { category: "meat_seafood", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Freezer (29 items) ---
    "Frozen mixed berries":                                 { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen mango":                                         { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen strawberries":                                  { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Broccoli":                                      { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Vegetable Mix":                                 { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Cauliflower":                                   { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Peas":                                          { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Beans":                                         { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chinese Stir Fry Mix Veg":                             { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Carrots":                                       { category: "frozen", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Flavoured Iceblocks":                                  { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Frozen Dessert Cones - Brownie":                       { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "French Cream Cheesecake":                              { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tiramisu":                                             { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Apple pie":                                            { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate Bavarian":                                   { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Strawberry cheesecake":                                { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate cake":                                       { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Meatlovers Pizza":                                     { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Icecream cake":                                        { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Connoisseur Camarosa Strawberry Gourmet Ice Cream 1L": { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Connoisseur Ice Cream Classic Vanilla Tub 1L":         { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cheese & Bacon Pizza":                                 { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Hawaiin Pizza":                                        { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Puff Pastry Sheets":                                   { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Shortcrust Pastry":                                    { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef Curry Puff":                                      { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Quiche Cheese & Bacon":                                { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Dim Sim":                                              { category: "frozen", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Pantry (44 items) ---
    "Bolognese sauce":                   { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Butter chicken sauce":              { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sweet and sour stir fry sauce":     { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Rogan josh sauce":                  { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tikka masala sauce":                { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tortillas":                         { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Oats":                              { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Long grain rice":                   { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pasta spaghetti":                   { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pasta penne":                       { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Glass noodles":                     { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cous cous":                         { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tri colour quinoa":                 { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Kidney beans":                      { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chick peas":                        { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Black beans":                       { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Baked beans":                       { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Red split lentils":                 { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Whole green lentils":               { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Lentil soup mix dried":             { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Springwater tuna":                  { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sprinwater salmon":                 { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Unsalted mixed nuts":               { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Unsalted cashews":                  { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Organic peanut butter":             { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beetroot":                          { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Corn Kernels no added salt canned": { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Organic tomatoes canned":           { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pumpkin seeds":                     { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Black chia seeds":                  { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sunflower seeds":                   { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Walnuts":                           { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Almonds":                           { category: "pantry", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Korma simmer sauce":                { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Vindaloo simmer sauce":             { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Honey soy stir fry sauce":          { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pappadams":                         { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate flavoured cereal":        { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Rainbow flavoured cereal":          { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chocolate coated peanuts":          { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Choc coated almonds":               { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef jerky":                        { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chicken flavoured noodle cup":      { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Ramen noodle cup mild":             { category: "pantry", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Ready to eat (20 items) ---
    "Lentil salad with olive oil":           { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Green salad bowl":                      { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chicken & corn soup":                   { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chicken noodle soup":                   { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Tomato & basil soup":                   { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Broccoli, cauliflower & parmesan soup": { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pea & ham soup":                        { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Minestrone soup":                       { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Ultra green soup":                      { category: "ready_to_eat", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Butter chicken with rice":              { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef stroganoff with rice":             { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Macaroni cheese":                       { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Chicken & bacon pasta bake":            { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Protein BBQ chicken burrito":           { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pulled pork smokey chipolte burrito":   { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Easy enchilada":                        { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pastie":                                { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Beef cheese & bacon pie":               { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Microwaveable sausage Roll":            { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Samosa":                                { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    // --- Vegetables (17 items) ---
    "Broccoli":       { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Carrots":        { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Zucchini":       { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "tomatoes":       { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Capsicum":       { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cucumber":       { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Lettuce":        { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Potatoe":        { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Cauliflower":    { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Brown onion":    { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Pumpkin":        { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sweet corn":     { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Asian choy pak": { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Green beans":    { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Eggplant":       { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Celery":         { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } },
    "Sweet potatoe":  { category: "vegetables", tag: "healthy", preselect: { healthy_a: false, healthy_b: false, unhealthy_a: false, unhealthy_b: false } }
};

// ------------------------------------------------------------
// GLOBAL HELPER — shared by Q1 and all category questions
// ------------------------------------------------------------
window.getItemLabel = function($checkbox) {
    var id = $checkbox.attr("id");
    var label = id ? jQuery("label[for='" + id + "']").filter("[id$='-label']").text().trim() : "";
    if (!label) label = $checkbox.closest("li").find("span").last().text().trim();
    if (!label) label = $checkbox.closest("li").text().trim();
    return label || "Item";
};

// ------------------------------------------------------------
// GLOBAL PRE-SELECTION — called when condition changes
// ------------------------------------------------------------
window.applyAllPreselections = function(condition) {
    var engines = window._questionEngines || {};
    console.log("Applying pre-selections for condition:", condition);
    console.log("Registered question engines:", Object.keys(engines));

    Object.keys(engines).forEach(function(qid) {
        var engine = engines[qid];
        var $q = jQuery("#" + qid);

        // Clear all checkboxes first
        $q.find("input[type='checkbox']").each(function() {
            var choiceId = jQuery(this).attr("choiceid");
            if (choiceId) {
                try { engine.setChoiceValue(choiceId, false); } catch(e) {}
            }
        });

        // Apply registry pre-selections
        var applied = 0;
        var missing = [];

        $q.find("input[type='checkbox']").each(function() {
            var choiceId = jQuery(this).attr("choiceid");
            var label = window.getItemLabel(jQuery(this));
            var item = window.ITEM_REGISTRY[label];

            if (item && item.preselect && item.preselect[condition]) {
                try {
                    engine.setChoiceValue(choiceId, true);
                    applied++;
                } catch(e) {
                    console.error("setChoiceValue failed for:", label, e);
                }
            } else if (!item) {
                missing.push(label);
            }
        });

        console.log("Q" + qid + ": applied " + applied + " pre-selections");
        if (missing.length) {
            console.warn("⚠️ Not in registry:", missing);
        }

        // Tell each category question to refresh its display
        $q.trigger("cart:update");
    });
};

// ============================================================
// Q1 addOnReady — condition picker behaviour
// ============================================================
Qualtrics.SurveyEngine.addOnload(function() {});

Qualtrics.SurveyEngine.addOnReady(function() {
    var qid = this.questionId;
    var $q = jQuery("#" + qid);

    // Derive condition key from radio label text
    // "Healthy A" → "healthy_a", "Unhealthy" → "unhealthy"
    function getConditionKey($radio) {
        var label = jQuery("label[for='" + $radio.attr("id") + "']").text().trim();
        if (!label) label = $radio.closest("li").text().trim();
        return label.toLowerCase().replace(/\W+/g, "_").replace(/^_|_$/g, "");
    }

    // Apply on change
    $q.on("change", "input[type='radio']", function() {
        var condition = getConditionKey(jQuery(this));
        console.log("Condition changed to:", condition);
        Qualtrics.SurveyEngine.setEmbeddedData("condition", condition);
        window.applyAllPreselections(condition);
    });

    // If a radio is already selected on load (e.g. back-navigation), apply it
    var $preChecked = $q.find("input[type='radio']:checked");
    if ($preChecked.length) {
        var condition = getConditionKey($preChecked);
        Qualtrics.SurveyEngine.setEmbeddedData("condition", condition);
        window.applyAllPreselections(condition);
    }
});

Qualtrics.SurveyEngine.addOnPageSubmit(function() {
    var qid = this.questionId;
    var $q = jQuery("#" + qid);
    var $checked = $q.find("input[type='radio']:checked");
    if ($checked.length) {
        var label = jQuery("label[for='" + $checked.attr("id") + "']").text().trim();
        var condition = label.toLowerCase().replace(/\W+/g, "_").replace(/^_|_$/g, "");
        Qualtrics.SurveyEngine.setEmbeddedData("condition", condition);
        console.log("onPageSubmit — condition:", condition);
    }
});

Qualtrics.SurveyEngine.addOnUnload(function() {});