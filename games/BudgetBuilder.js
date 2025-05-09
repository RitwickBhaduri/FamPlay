function BudgetBuilder() {
    try {
        const [allocations, setAllocations] = React.useState({
            food: 0,
            entertainment: 0,
            savings: 0,
            education: 0,
            transport: 0
        });
        
        const [feedback, setFeedback] = React.useState(null);
        const totalBudget = 500;
        const remaining = totalBudget - Object.values(allocations).reduce((a, b) => a + b, 0);

        const categoryIcons = {
            food: "fa-utensils",
            entertainment: "fa-film",
            savings: "fa-piggy-bank",
            education: "fa-book",
            transport: "fa-bus"
        };

        const handleAllocation = (category, value) => {
            const numValue = parseInt(value) || 0;
            const otherAllocations = Object.entries(allocations)
                .filter(([key]) => key !== category)
                .reduce((sum, [_, val]) => sum + val, 0);

            if (numValue + otherAllocations <= totalBudget) {
                setAllocations(prev => ({
                    ...prev,
                    [category]: numValue
                }));
                
                // Clear any previous feedback
                setFeedback(null);
            } else {
                setFeedback("You've exceeded your budget!");
                setTimeout(() => setFeedback(null), 2000);
            }
        };

        const handleReset = () => {
            setAllocations({
                food: 0,
                entertainment: 0,
                savings: 0,
                education: 0,
                transport: 0
            });
            setFeedback(null);
        };

        return (
            <div data-name="budget-builder" className="budget-builder">
                <div data-name="budget-header" className="text-center mb-6">
                    <h3 className="text-lg font-bold mb-2">Weekly Budget: ₹{totalBudget}</h3>
                    <p className={`text-xl ${remaining === 0 ? 'text-green-500' : 'text-accent-color'}`}>
                        Remaining: ₹{remaining}
                    </p>
                </div>

                {feedback && (
                    <div data-name="feedback" className="text-red-500 text-center mb-4">
                        {feedback}
                    </div>
                )}

                {Object.entries(allocations).map(([category, amount]) => (
                    <div 
                        key={category}
                        data-name={`category-${category}`}
                        className="budget-category"
                    >
                        <div className="flex items-center mb-2">
                            <i className={`fas ${categoryIcons[category]} mr-2`}></i>
                            <label className="capitalize">{category}</label>
                        </div>
                        
                        <input
                            type="range"
                            min="0"
                            max={totalBudget}
                            value={amount}
                            onChange={(e) => handleAllocation(category, e.target.value)}
                            className="w-full mb-2"
                        />
                        
                        <div className="flex justify-between text-sm">
                            <span>₹{amount}</span>
                            <span>{Math.round((amount / totalBudget) * 100)}%</span>
                        </div>
                    </div>
                ))}

                <div className="mt-6 flex justify-center gap-4">
                    <button 
                        data-name="reset-button"
                        className="btn-secondary"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>

                {remaining === 0 && (
                    <div data-name="budget-complete" className="text-center mt-6 p-4 bg-green-800 rounded-lg">
                        <h4 className="text-lg font-bold mb-2">Great job!</h4>
                        <p>You've allocated your entire budget wisely.</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('BudgetBuilder render error:', error);
        reportError(error);
        return null;
    }
}
