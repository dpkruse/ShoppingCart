// ============================================================
// GLOBAL SCOPE — available to all questions in the block
// ============================================================

window._questionEngines = window._questionEngines || {};

// ITEM_REGISTRY — 240 items across 10 categories
// Basket conditions: healthy, neutral, unhealthy
// Source: Excel baskets tab (populated from "default conditions" tab via --populate-baskets)

window.ITEM_REGISTRY = {
    // [AUTO-GENERATED-START]
    // --- Bakery (19 items) ---
    "Apple danish":             { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: false } },
    "Bagel plain":              { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "BBQ cheese & bacon roll":  { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Butter croissant":         { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Cheese & bacon roll":      { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Choc Chip hot cross bun":  { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cinnamon scroll":          { category: "bakery", tag: "unhealthy", preselect: { healthy: true , neutral: true , unhealthy: true  } },
    "Double choc muffin":       { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Fruit filled tart":        { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Ham & cheese croissant":   { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "High fibre white bread":   { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Jam filled doughnut":      { category: "bakery", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Multigrain bread":         { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Rye bread":                { category: "bakery", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Wholemeal wrap":           { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: true , unhealthy: false } },
    "Wholemeal bread":          { category: "bakery", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Wholemeal english muffin": { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Wholemeal pizza base":     { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Wholemeal roll":           { category: "bakery", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    // --- Dairy Eggs Fridge (28 items) ---
    "Reduced fat custard":            { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Reduced fat milk":               { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Ricotta cheese":                 { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Soy milk":                       { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Protein greek yoghurt":          { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: true  } },
    "Eggs":                           { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: true  } },
    "Cottage cheese":                 { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Reduced fat cheddar cheese":     { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Fresh napoli sauce":             { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tofu":                           { category: "dairy_eggs_fridge", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Leg ham":                        { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Coconut yoghurt":                { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Salami":                         { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Roast Pastrami Sliced":          { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chicken breast sliced":          { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Fresh carbonara pasta sauce":    { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Middle Bacon":                   { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Silverside sliced":              { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate chip yoghurt":         { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Maple Bacon":                    { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chicken shredded":               { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Kabana":                         { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Prosciutto Sliced":              { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Turkey breast sliced":           { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "High protein chocolate pudding": { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Sliced Pancetta":                { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Smiley Fritz":                   { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Short cut bacon":                { category: "dairy_eggs_fridge", tag: "unhealthy", preselect: { healthy: true , neutral: true , unhealthy: true  } },
    // --- Drinks (13 items) ---
    "Natural spring water":              { category: "drinks", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: false } },
    "Lightly sparkling water":           { category: "drinks", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Soda water":                        { category: "drinks", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Orange juice":                      { category: "drinks", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tropical punch juice":              { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate flavoured coconut water": { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Electrolyte sport drink":           { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Flavoured water wildberry":         { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Energy drink":                      { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "High protein chocolate shake":      { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Protein water berry":               { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cola flavoured soda":               { category: "drinks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Protein water citrus":              { category: "drinks", tag: "", preselect: { healthy: false, neutral: false, unhealthy: false } },
    // --- Snacks (28 items) ---
    "Multigrain crackers and light cheese": { category: "snacks", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Wholegrain rice cracker":              { category: "snacks", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Multigrain crispbread cracker":        { category: "snacks", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Rice crisps milk chocolate":           { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Mix lollies":                          { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Jelly":                                { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Jelly bean":                           { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Liquorice":                            { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Marshmallow":                          { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Milk chocolate":                       { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: false } },
    "Hazelnut spread":                      { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Mayple syrup":                         { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Snake lollies":                        { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Plain cracker":                        { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pretzel":                              { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Original potato chip":                 { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Chicken flavoured potato chips":       { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Salt & Vinegar chips":                 { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cheese corn chip":                     { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Choclate chip cookie":                 { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Biscuits shortbread creams":           { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate coated biscuit":             { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Chocolate cream wafer":                { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Nut bars chocolate peanut & almond":   { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: false } },
    "Rice bubbles snack bar":               { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Flavoured rainbow stick":              { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Crunchy oats & honey bars":            { category: "snacks", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate oat slices":                 { category: "snacks", tag: "unhealthy", preselect: { healthy: true , neutral: false, unhealthy: true  } },
    // --- Fruit (20 items) ---
    "Nectarine":                              { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Grape":                                  { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Watermelon":                             { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Strawberry":                             { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Blueberry":                              { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pear":                                   { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pineapple":                              { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Apple":                                  { category: "fruit", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Banana":                                 { category: "fruit", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: true  } },
    "Orange":                                 { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Kiwi fruit":                             { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Canned peache":                          { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Canned fruit salad":                     { category: "fruit", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Dried apple":                            { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Dried mango":                            { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Banana Chip":                            { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Freeze dried fruit dipped in chocolate": { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Fruit Jelly Cup":                        { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Fruit string":                           { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Fruit roll up":                          { category: "fruit", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    // --- Meat Seafood (22 items) ---
    "Lean beef mince":          { category: "meat_seafood", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Steak":                    { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Lamb leg diced":           { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pork sizzle steak":        { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Lean pork mince":          { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Kangaroo diced":           { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chicken breast fillet":    { category: "meat_seafood", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: true  } },
    "Turkey mince":             { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Basa fillet":              { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Salmon":                   { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Barramundi":               { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tuna steak":               { category: "meat_seafood", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Thin Bbq sausage":         { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Beef sausage":             { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Beef burgers pattie":      { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Lamb burger":              { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Beef Bbq burger":          { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Kransky bite":             { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Beef brisket burgers":     { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Beef chevap":              { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Deli continental chorizo": { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Roll chicken":             { category: "meat_seafood", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    // --- Freezer (29 items) ---
    "Frozen mixed berries":     { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Frozen mango":             { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Frozen strawberries":      { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Frozen broccoli":          { category: "frozen", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Frozen vegetable mix":     { category: "frozen", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Frozen cauliflower":       { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Frozen Peas":              { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Frozen beans":             { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chinese stir fry mix veg": { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Frozen carrots":           { category: "frozen", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Flavoured iceblocks":      { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: false } },
    "Chocolate icecream":       { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "French Cream Cheesecake":  { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: false } },
    "Tiramisu":                 { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Apple pie":                { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate bavarian":       { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Strawberry cheesecake":    { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate cake":           { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Meatlovers pizza":         { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Icecream cake":            { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Strawberry icecream":      { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Vanilla icecream":         { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cheese & bacon pizza":     { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Hawaiin pizza":            { category: "frozen", tag: "unhealthy", preselect: { healthy: true , neutral: true , unhealthy: true  } },
    "Puff pastry sheet":        { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Shortcrust Pastry":        { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Beef curry puff":          { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Quiche cheese & bacon":    { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Dim sim":                  { category: "frozen", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    // --- Pantry (44 items) ---
    "Bolognese sauce":                   { category: "pantry", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Butter chicken sauce":              { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Sweet and sour stir fry sauce":     { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Rogan josh sauce":                  { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tikka masala sauce":                { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tortilla":                          { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Oats":                              { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Rice":                              { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Spaghetti":                         { category: "pantry", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Pasta penne":                       { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Glass noodle":                      { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cous cous":                         { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tri colour quinoa":                 { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Kidney beans":                      { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chickpeas":                         { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Black beans reduced salt":          { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Baked beans":                       { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Red lentils dried":                 { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Whole green lentils":               { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Lentil soup mix dried":             { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tuna in springwater":               { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Salmon in springwater":             { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Unsalted mixed nut":                { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Unsalted cashew":                   { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Organic peanut butter":             { category: "pantry", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Beetroot canned":                   { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Corn Kernels no added salt canned": { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Organic tomatoes canned":           { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pumpkin seed":                      { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Black chia seed":                   { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Sunflower seed":                    { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Walnut":                            { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Almond":                            { category: "pantry", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Korma simmer sauce":                { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Vindaloo simmer sauce":             { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Honey soy stir fry sauce":          { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pappadams":                         { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate flavoured cereal":        { category: "pantry", tag: "unhealthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Rainbow flavoured cereal":          { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chocolate coated peanuts":          { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Choc coated almonds":               { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Beef jerky":                        { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chicken flavoured noodle cup":      { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Ramen noodle cup mild":             { category: "pantry", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    // --- Ready to eat (20 items) ---
    "Lentil salad with olive oil":           { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Green salad":                           { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chicken & corn soup":                   { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Chicken noodle soup":                   { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tomato & basil soup":                   { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Broccoli, cauliflower & parmesan soup": { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pea & ham soup":                        { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Minestrone soup":                       { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Ultra green soup":                      { category: "ready_to_eat", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Butter chicken with rice":              { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: true , neutral: true , unhealthy: false } },
    "Beef stroganoff with rice":             { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Macaroni cheese":                       { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: true , unhealthy: true  } },
    "Chicken & bacon pasta bake":            { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Protein BBQ chicken burrito":           { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Pulled pork smokey chipolte burrito":   { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Easy enchilada":                        { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: true  } },
    "Pastie":                                { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Meat pie":                              { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Microwaveable sausage Roll":            { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Samosa":                                { category: "ready_to_eat", tag: "unhealthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    // --- Vegetables (17 items) ---
    "Broccoli":      { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Carrots":       { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: false } },
    "Zucchini":      { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Tomato":        { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: false } },
    "Capsicum":      { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cucumber":      { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: false } },
    "Lettuce":       { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: false } },
    "Potatoe":       { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Cauliflower":   { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Brown onion":   { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Pumpkin":       { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Sweet corn":    { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Bok Choy":      { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Green beans":   { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: false, unhealthy: false } },
    "Eggplant":      { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Celery":        { category: "vegetables", tag: "healthy", preselect: { healthy: false, neutral: false, unhealthy: false } },
    "Sweet potatoe": { category: "vegetables", tag: "healthy", preselect: { healthy: true , neutral: true , unhealthy: false } }
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
            var $cb = jQuery(this);
            var choiceId = $cb.attr("choiceid");
            if (choiceId) {
                try { engine.setChoiceValue(choiceId, false); } catch(e) {}
            }
            $cb.prop("checked", false);
        });

        // Apply registry pre-selections
        var applied = 0;
        var missing = [];

        $q.find("input[type='checkbox']").each(function() {
            var $cb = jQuery(this);
            var choiceId = $cb.attr("choiceid");
            var label = window.getItemLabel($cb);
            var item = window.ITEM_REGISTRY[label];

            if (item && item.preselect && item.preselect[condition]) {
                try {
                    engine.setChoiceValue(choiceId, true);
                    applied++;
                } catch(e) {
                    console.error("setChoiceValue failed for:", label, e);
                }
                $cb.prop("checked", true);
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
    // "Healthy" -> "healthy", "Neutral" -> "neutral", "Unhealthy" -> "unhealthy"
    function getConditionKey($radio) {
        var label = jQuery("label[for='" + $radio.attr("id") + "']").text().trim();
        if (!label) label = $radio.closest("li").text().trim();
        return label.toLowerCase().replace(/\W+/g, "_").replace(/^_|_$/g, "");
    }

    // Apply on change — guard against Qualtrics firing a spurious change event
    // during page submission (which would trigger applyAllPreselections and overwrite
    // embedded data after addOnPageSubmit has already written the correct values).
    $q.on("change", "input[type='radio']", function() {
        if (window._pageSubmitting) return;
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