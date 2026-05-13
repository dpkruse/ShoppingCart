// ============================================================
// GLOBAL SCOPE — available to all questions in the block
// ============================================================

window._questionEngines = window._questionEngines || {};

// Detect back-navigation: if the user has already advanced past the shopping page,
// restore their saved choices instead of re-applying condition preselections.
window._restoreFromEmbedded = false;
try {
    if (Qualtrics.SurveyEngine.getEmbeddedData('_selections_saved') === 'true') {
        window._restoreFromEmbedded = true;
    }
} catch(e) {}

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
// Age-fact lookup table (ages 18–98, sourced from Wikipedia number pages)
// ============================================================
var AGE_FACTS = {
    18: "18 is the only positive number that is twice the sum of its own digits (1+8=9, 9×2=18).",
    19: "19 is a prime number used in the Metonic cycle, which aligns the lunar and solar calendars every 19 years.",
    20: "20 is the number of faces on a regular icosahedron.",
    21: "21 is the number of dots on a standard six-sided die (1+2+3+4+5+6 = 21).",
    22: "22 is the number of letters in the Hebrew alphabet.",
    23: "23 is a prime number and the number of pairs of chromosomes in a typical human cell.",
    24: "24 is 4 factorial (4! = 4×3×2×1) and the number of hours in a day.",
    25: "25 is the smallest square that is the sum of two other non-zero squares (3²+4² = 9+16 = 25).",
    26: "26 is the number of letters in the modern English alphabet.",
    27: "27 is 3 cubed (3³) and the number of bones in a human hand.",
    28: "28 is a perfect number — equal to the sum of its proper divisors (1+2+4+7+14 = 28).",
    29: "29 is a prime number and the number of days in February during a leap year.",
    30: "30 is the smallest number with exactly eight positive divisors.",
    31: "31 is a Mersenne prime (2⁵ − 1 = 31) and the maximum number of days in any calendar month.",
    32: "32 is 2 to the power of 5 and the freezing point of water in degrees Fahrenheit.",
    33: "33 is the number of vertebrae in the human spine.",
    34: "34 is the ninth Fibonacci number (1, 1, 2, 3, 5, 8, 13, 21, 34…).",
    35: "35 is the number of hexominoes — distinct flat shapes made from six squares joined edge to edge.",
    36: "36 is both a perfect square (6²) and a triangular number (1+2+3+4+5+6+7+8 = 36).",
    37: "37 is a prime number and the number of plays traditionally attributed to William Shakespeare.",
    38: "38 is the number of pockets on an American roulette wheel (1–36 plus 0 and 00).",
    39: "39 is the number of books in the Old Testament of the Protestant Bible.",
    40: "40 is the only number in the English language whose letters appear in alphabetical order.",
    41: "41 is a prime number; the formula n²+n+41 produces a prime for every integer n from 0 to 39.",
    42: "42 is the number of dots on a standard double-six set of dominoes.",
    43: "43 is a prime number and the international dialling code for Austria.",
    44: "44 is the total number of candles lit across all eight nights of Hanukkah, including the shamash.",
    45: "45 is the sum of all single-digit numbers (1+2+3+4+5+6+7+8+9 = 45).",
    46: "46 is the number of chromosomes in a typical human cell.",
    47: "47 is a prime number; fans of Star Trek claim it appears unusually often throughout the franchise.",
    48: "48 is the number of traditional constellations catalogued by the ancient Greek astronomer Ptolemy.",
    49: "49 is 7 squared and the number of strings on a standard concert harp.",
    50: "50 is the atomic number of tin and the number of states in the United States.",
    51: "51 is the product of the distinct primes 3 and 17, and the international dialling code for Peru.",
    52: "52 is the number of cards in a standard deck (excluding jokers) and the number of weeks in a year.",
    53: "53 is a prime number and the atomic number of iodine.",
    54: "54 is the number of coloured squares on the outside of a standard Rubik's Cube (9 per face × 6 faces).",
    55: "55 is the tenth Fibonacci number and the largest two-digit triangular number.",
    56: "56 is the number of people who signed the United States Declaration of Independence.",
    57: "57 is associated with Heinz '57 Varieties', though H.J. Heinz always made far more than 57 products.",
    58: "58 is the sum of the first seven prime numbers (2+3+5+7+11+13+17 = 58).",
    59: "59 is a prime number and a safe prime, since (59−1)÷2 = 29 is also prime.",
    60: "60 is the smallest number divisible by every integer from 1 to 6, and the basis of the sexagesimal time system.",
    61: "61 is a prime number and the international dialling code for Australia.",
    62: "62 is the atomic number of samarium, a rare-earth metal used in powerful permanent magnets.",
    63: "63 is a Mersenne number (2⁶ − 1 = 63), though not a prime as it equals 7 × 9.",
    64: "64 is 2⁶, 4³, and 8² simultaneously — and the number of squares on a chessboard.",
    65: "65 is the smallest number expressible as the sum of two squares in two distinct ways (1²+8² and 4²+7²).",
    66: "66 is a triangular number (1+2+…+11 = 66) and the total number of books in the Christian Bible.",
    67: "67 is a prime number and a lucky prime.",
    68: "68 is the atomic number of erbium, a rare-earth element used in optical fibre amplifiers.",
    69: "69 is a semiprime — the product of the two primes 3 and 23.",
    70: "70 is the smallest weird number: it is abundant (the sum of its divisors exceeds it) but not semiperfect.",
    71: "71 is a prime and a permutable prime, since rearranging its digits gives 17, which is also prime.",
    72: "72 appears in the Rule of 72: dividing 72 by an annual interest rate approximates the years needed to double money.",
    73: "73 is prime; in binary it is 1001001, a palindrome — and the 21st prime, whose reversal 12 gives the 12th prime, 37, the reversal of 73.",
    74: "74 is the atomic number of tungsten (W), the element with the highest melting point of all metals.",
    75: "75 is a Keith number: starting from its digits (7, 5), each term equals the sum of the previous two (7, 5, 12, 17, 29, 46, 75).",
    76: "76 is the number celebrated in the song '76 Trombones' from the musical The Music Man.",
    77: "77 is a semiprime (7 × 11) and the largest number that cannot be expressed as the sum of distinct primes that are also all factors of 77.",
    78: "78 is the number of cards in a standard tarot deck.",
    79: "79 is a prime number and the atomic number of gold (Au).",
    80: "80 is the number of days in which Phileas Fogg circumnavigates the globe in Jules Verne's novel.",
    81: "81 is 3 to the power of 4 (3⁴) and 9 squared (9²) — and its digits sum to 9, which is also 3².",
    82: "82 is the atomic number of lead (Pb), the heaviest stable element.",
    83: "83 is a prime number and the atomic number of bismuth, the last naturally occurring stable element.",
    84: "84 is the atomic number of polonium (Po), the element discovered by Marie Curie and named after her homeland.",
    85: "85 is the product of the primes 5 and 17, and equals 2² + 3⁴ (4 + 81 = 85).",
    86: "86 is the atomic number of radon (Rn), a naturally occurring radioactive noble gas.",
    87: "87 is known in Australian cricket as 'the devil's number' — it is 13 runs short of a century.",
    88: "88 is the number of constellations recognised by the International Astronomical Union.",
    89: "89 is both a prime and a Fibonacci number (the 11th in the sequence), making it a Fibonacci prime.",
    90: "90 is the number of degrees in a right angle.",
    91: "91 is the number of handshakes that occur when 14 people each shake hands with everyone else (14×13÷2 = 91).",
    92: "92 is the number of naturally occurring chemical elements found on Earth.",
    93: "93 is the international dialling code for Afghanistan.",
    94: "94 is the atomic number of plutonium (Pu), a fissile element used in nuclear reactors and weapons.",
    95: "95 is the number of theses Martin Luther is said to have posted to a church door in Wittenberg in 1517.",
    96: "96 is four dozen (4 × 24) and equal to 2⁵ × 3, making it divisible by every power of 2 up to 32.",
    97: "97 is the largest two-digit prime number.",
    98: "98 is the atomic number of californium (Cf), an element first synthesised at the University of California in 1950."
};

// ============================================================
// Q1 addOnReady — reads condition assigned by Survey Flow randomizer
// ============================================================
Qualtrics.SurveyEngine.addOnload(function() {});

Qualtrics.SurveyEngine.addOnReady(function() {
    if (window._restoreFromEmbedded) return;
    var condition = Qualtrics.SurveyEngine.getEmbeddedData('condition');
    if (!condition) {
        console.error('ShoppingCart: condition embedded data is missing — randomizer may not be configured in Survey Flow.');
        return;
    }
    console.log('Condition assigned by randomizer:', condition);

    var age = Qualtrics.SurveyEngine.getEmbeddedData('respondent_age');
    window.DEBUG_MODE = (String(age).trim() === '99');

    if (window.DEBUG_MODE) {
        jQuery('.QuestionBody').append(
            '<div style="background:#fffbe6;border:1px solid #f0c040;padding:6px 10px;' +
            'font-size:13px;margin-top:10px;border-radius:4px;">' +
            '&#x1F6A7; DEBUG: condition = <strong>' + condition + '</strong></div>'
        );
    } else {
        var ageInt = parseInt(age, 10);
        var fact = AGE_FACTS[ageInt] || 'Really?? I don\'t believe you.';
        Qualtrics.SurveyEngine.setEmbeddedData('age_fact', fact);
        jQuery('.QuestionBody').append(
            '<div style="font-size:16px;color:#555;margin-top:8px;">' + fact + '</div>'
        );
    }

    // Category questions register their engines in their own addOnload, which fires
    // after Q1's addOnReady. Poll until all 10 are registered, then apply.
    var attempts = 0;
    var apply = setInterval(function() {
        var engineCount = Object.keys(window._questionEngines || {}).length;
        attempts++;
        if (engineCount >= 10 || attempts >= 40) {
            clearInterval(apply);
            if (engineCount > 0) {
                console.log('Engines ready (' + engineCount + '), applying preselections for:', condition);
                window.applyAllPreselections(condition);
            } else {
                console.error('ShoppingCart: no category engines registered after timeout.');
            }
        }
    }, 100);
});

Qualtrics.SurveyEngine.addOnPageSubmit(function() {
    var condition = Qualtrics.SurveyEngine.getEmbeddedData('condition');
    console.log('Condition on submit:', condition);
});

Qualtrics.SurveyEngine.addOnUnload(function() {});
