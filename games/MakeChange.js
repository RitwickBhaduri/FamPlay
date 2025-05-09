function MakeChange() {
    try {
        const [total, setTotal] = React.useState(0);
        const [selected, setSelected] = React.useState([]);
        const [target, setTarget] = React.useState(147);
        const [gameOver, setGameOver] = React.useState(false);
        
        const denominations = [
            { value: 100, type: "note" },
            { value: 50, type: "note" },
            { value: 20, type: "note" },
            { value: 10, type: "note" },
            { value: 5, type: "coin" },
            { value: 2, type: "coin" },
            { value: 1, type: "coin" }
        ];

        const handleSelect = (denomination) => {
            if (total + denomination.value <= target) {
                setSelected(prev => [...prev, denomination]);
                setTotal(prev => {
                    const newTotal = prev + denomination.value;
                    if (newTotal === target) {
                        setGameOver(true);
                    }
                    return newTotal;
                });
            }
        };

        const handleReset = () => {
            setSelected([]);
            setTotal(0);
            setGameOver(false);
            setTarget(Math.floor(Math.random() * 500) + 50);
        };

        return (
            <div data-name="make-change" className="make-change">
                <div data-name="target-display" className="text-center mb-6">
                    <h3 className="text-lg font-bold">Make Change For</h3>
                    <p className="text-2xl text-accent-color">₹{target}</p>
                    <p className="mt-2">Current Total: ₹{total}</p>
                </div>

                <div data-name="denominations-grid" className="grid grid-cols-3 gap-4">
                    {denominations.map((denom, index) => (
                        <button
                            key={index}
                            data-name={`currency-${denom.value}`}
                            className="currency-btn"
                            onClick={() => handleSelect(denom)}
                            disabled={total + denom.value > target}
                        >
                            ₹{denom.value}
                        </button>
                    ))}
                </div>

                <div data-name="selected-display" className="mt-6">
                    <h4 className="font-bold mb-2">Selected Currency:</h4>
                    <div className="flex flex-wrap gap-2">
                        {selected.map((item, index) => (
                            <span 
                                key={index}
                                className="bg-accent-color text-black px-2 py-1 rounded"
                            >
                                ₹{item.value}
                            </span>
                        ))}
                    </div>
                </div>

                {gameOver && (
                    <div data-name="success-message" className="mt-6 text-center">
                        <p className="text-green-500 mb-4">Perfect! You made the correct change!</p>
                        <button 
                            className="btn-primary"
                            onClick={handleReset}
                        >
                            Try Another Amount
                        </button>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('MakeChange render error:', error);
        reportError(error);
        return null;
    }
}
