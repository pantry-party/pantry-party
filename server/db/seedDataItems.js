const items = [
    {
        name: "apple",
        dateMoved: "2024-01-01",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "produce",
        expiry: "2024-01-08", 
        ownerId: 7,
        householdId: 5
    },
    {
        name: "broccoli",
        dateMoved: "2024-01-01",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "produce",
        expiry: "2024-01-08", 
        ownerId: 8,
        householdId: 5
    },
    {
        name: "milk",
        dateMoved: "2024-01-01",
        inPantry: true, 
        sharing: null,
        isLow: true,
        category: "dairy",
        expiry: "2024-01-06", 
        ownerId: null,
        householdId: 5
    },
    {
        name: "ground turkey",
        dateMoved: "2024-01-08",
        inPantry: false, 
        sharing: null,
        isLow: false,
        category: "proteins",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "crushed tomatoes",
        dateMoved: "2024-01-08",
        inPantry: true, 
        sharing: false,
        isLow: false,
        category: "cans & bottles",
        expiry: null, 
        ownerId: 6,
        householdId: 5
    },
    {
        name: "lemonade",
        dateMoved: "2024-01-08",
        inPantry: true, 
        sharing: true,
        isLow: false,
        category: "cans & bottles",
        expiry: "2024-01-22", 
        ownerId: 5,
        householdId: 5
    },
    {
        name: "soy sauce",
        dateMoved: "2024-01-15",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "cans & bottles",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "parmesan cheese",
        dateMoved: "2024-01-15",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "dairy",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "maui onion potato chips",
        dateMoved: "2024-01-15",
        inPantry: false, 
        sharing: null,
        isLow: false,
        category: "dry goods",
        expiry: null, 
        ownerId: 6,
        householdId: 5
    },
    {
        name: "fusili",
        dateMoved: "2024-01-22",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "dry goods",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "ice cream",
        dateMoved: "2024-01-22",
        inPantry: true, 
        sharing: false,
        isLow: false,
        category: "freezer",
        expiry: null, 
        ownerId: 5,
        householdId: 5
    },
    {
        name: "mac & cheese",
        dateMoved: "2024-01-22",
        inPantry: false, 
        sharing: null,
        isLow: false,
        category: "meals",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "cookie dough",
        dateMoved: "2024-01-22",
        inPantry: false, 
        sharing: null,
        isLow: false,
        category: "other",
        expiry: null, 
        ownerId: 8,
        householdId: 5
    },
    {
        name: "spaghetti",
        dateMoved: "2024-01-22",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "dry goods",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "lettuce",
        dateMoved: "2024-01-29",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "produce",
        expiry: "2024-02-05", 
        ownerId: 7,
        householdId: 5
    },
    {
        name: "cheese",
        dateMoved: "2024-01-29",
        inPantry: false, 
        sharing: null,
        isLow: false,
        category: "dairy",
        expiry: null, 
        ownerId: 8,
        householdId: 5
    },
    {
        name: "chocolate",
        dateMoved: "2024-02-05",
        inPantry: true, 
        sharing: null,
        isLow: true,
        category: "other",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "strawberries",
        dateMoved: "2024-02-05",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "produce",
        expiry: "2024-02-07", 
        ownerId: 6,
        householdId: 5
    },
    {
        name: "chicken",
        dateMoved: "2024-02-05",
        inPantry: true, 
        sharing: null,
        isLow: false,
        category: "proteins",
        expiry: "2024-02-07", 
        ownerId: null,
        householdId: 5
    },
    {
        name: "apple juice",
        dateMoved: "2024-02-05",
        inPantry: true, 
        sharing: false,
        isLow: false,
        category: "cans & bottles",
        expiry: null, 
        ownerId: 7,
        householdId: 5
    },
    {
        name: "bananas",
        dateMoved: "2024-02-12",
        inPantry: false, 
        sharing: false,
        isLow: false,
        category: "produce",
        expiry: null, 
        ownerId: 8,
        householdId: 5
    },
    {
        name: "popsicles",
        dateMoved: "2024-02-12",
        inPantry: false, 
        sharing: false,
        isLow: false,
        category: "freezer",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "orange juice",
        dateMoved: "2024-02-12",
        inPantry: false, 
        sharing: false,
        isLow: false,
        category: "cans & bottles",
        expiry: null, 
        ownerId: null,
        householdId: 5
    },
    {
        name: "rice",
        dateMoved: "2024-02-19",
        inPantry: false, 
        sharing: false,
        isLow: false,
        category: "dry goods",
        expiry: null, 
        ownerId: 5,
        householdId: 5
    }
]

module.exports = {items}