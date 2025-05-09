function SaveOrSpend() {
    try {
        const [savings, setSavings] = React.useState(0);
        const [currentScenario, setCurrentScenario] = React.useState(0);
        const [decisions, setDecisions] = React.useState([]);
        const [gameOver, setGameOver] = React.useState(false);
        
        const scenarios = [
            {
                item: "Movie ticket",
                cost: 200,
                impact: "Entertainment now vs saving for later",
                icon: "fa-ticket"
            },
            {
                item: "New game",
                cost: 500,
                impact: "Immediate fun vs future purchases",
                icon: "fa-gamepad"
            },
            {
                item: "Street food",
                cost: 100,
                impact: "Quick snack vs saving for a meal",
                icon: "fa-burger"
            },
            {
                item: "Premium app",
                cost: 300,
                impact: "Digital purchase vs physical savings",
                icon: "fa-mobile-screen"
            },
            {
                item: "Fancy shoes",
                cost: 1000,
                impact: "Style upgrade vs emergency fund",
                icon: "fa-shoe-prints"
            }
        ];

        const handleChoice = (save) => {
            const scenario = scenarios[currentScenario];
            const decision = {
                item: scenario.item,
                saved: save,
                amount: scenario.cost
            };
            
            setDecisions(prev => [...prev, decision]);
            
            if (save) {
                setSavings(prev => prev + scenario.cost);
            }

            if (currentScenario === scenarios.length - 1) {
                setGameOver(true);
            } else {
                setCurrentScenario(prev => prev + 1);
            }
        };

        const handleReset = () => {
            setSavings(0);
            setCurrentScenario(0);
            setDecisions([]);
            setGameOver(false);
        };

        return (
            <div data-name="save-spend" className="save-spend">
                <div data-name="savings-display" className="text-center mb-6">
                    <h3 className="text-lg font-bold">Your Savings</h3>
                    <p className="text-2xl text-accent-color">₹{savings}</p>
                </div>

                {!gameOver ? (
                    <div data-name="scenario-card" className="scenario-card">
                        <i className={`fas ${scenarios[currentScenario].icon} text-3xl mb-4 text-accent-color`}></i>
                        <h4 className="text-lg mb-2">{scenarios[currentScenario].item}</h4>
                        <p className="mb-4">Cost: ₹{scenarios[currentScenario].cost}</p>
                        <p className="mb-6 text-gray-400">{scenarios[currentScenario].impact}</p>
                        
                        <div className="flex gap-4 justify-center">
                            <button 
                                data-name="spend-button"
                                className="btn-secondary"
                                onClick={() => handleChoice(false)}
                            >
                                <i className="fas fa-shopping-cart mr-2"></i>
                                Spend
                            </button>
                            <button 
                                data-name="save-button"
                                className="btn-primary"
                                onClick={() => handleChoice(true)}
                            >
                                <i className="fas fa-piggy-bank mr-2"></i>
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <div data-name="game-summary" className="scenario-card">
                        <h3 className="text-xl font-bold mb-4">Game Summary</h3>
                        <p className="mb-4">Total Saved: ₹{savings}</p>
                        
                        <div className="mb-6">
                            {decisions.map((decision, index) => (
                                <div 
                                    key={index}
                                    className={`flex justify-between items-center p-2 mb-2 rounded ${
                                        decision.saved ? 'bg-green-800' : 'bg-red-800'
                                    }`}
                                >
                                    <span>{decision.item}</span>
                                    <span>₹{decision.amount}</span>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className="btn-primary"
                            onClick={handleReset}
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('SaveOrSpend render error:', error);
        reportError(error);
        return null;
    }
}
