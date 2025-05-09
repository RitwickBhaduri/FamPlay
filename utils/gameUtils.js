const GAMES = [
    {
        id: 'coin-catcher',
        title: 'Coin Catcher',
        component: CoinCatcher,
        shortDescription: 'Catch falling coins to reach the target amount',
        tutorial: 'Move the basket left and right to catch falling coins. Match the target amount to win!'
    },
    {
        id: 'budget-builder',
        title: 'Budget Builder',
        component: BudgetBuilder,
        shortDescription: 'Plan your weekly budget wisely',
        tutorial: 'Distribute ₹500 across different categories. Think carefully about your choices!'
    },
    {
        id: 'save-spend',
        title: 'Save or Spend',
        component: SaveOrSpend,
        shortDescription: 'Make smart financial decisions',
        tutorial: 'Choose between saving money or spending it on immediate purchases. Think long-term!'
    },
    {
        id: 'needs-wants',
        title: 'Needs vs Wants Sorter',
        component: NeedsWantsSorter,
        shortDescription: 'Sort items into needs and wants',
        tutorial: 'Drag items into either the "Needs" or "Wants" category. Think about what\'s essential!'
    },
    {
        id: 'price-right',
        title: 'Price is Right',
        component: PriceIsRight,
        shortDescription: 'Guess the correct price of items',
        tutorial: 'Select the correct price for each item from the multiple choice options.'
    },
    {
        id: 'make-change',
        title: 'Make Change',
        component: MakeChange,
        shortDescription: 'Calculate the correct change',
        tutorial: 'Calculate and give the correct change using different coin and note denominations.'
    }
];

function getRandomGame(currentGame = null) {
    let availableGames = GAMES;
    if (currentGame) {
        availableGames = GAMES.filter(game => game.id !== currentGame.id);
    }
    const randomIndex = Math.floor(Math.random() * availableGames.length);
    return availableGames[randomIndex];
}
