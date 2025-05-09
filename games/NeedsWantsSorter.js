function NeedsWantsSorter() {
    try {
        const [items, setItems] = React.useState([
            { id: 1, name: "Rice", category: null, isNeed: true, icon: "fa-bowl-rice" },
            { id: 2, name: "Smartphone", category: null, isNeed: false, icon: "fa-mobile-screen" },
            { id: 3, name: "Water", category: null, isNeed: true, icon: "fa-droplet" },
            { id: 4, name: "Movie ticket", category: null, isNeed: false, icon: "fa-ticket" },
            { id: 5, name: "Medicines", category: null, isNeed: true, icon: "fa-pills" },
            { id: 6, name: "Video game", category: null, isNeed: false, icon: "fa-gamepad" },
            { id: 7, name: "School books", category: null, isNeed: true, icon: "fa-book" },
            { id: 8, name: "Toy", category: null, isNeed: false, icon: "fa-robot" }
        ]);

        const [score, setScore] = React.useState(0);
        const [gameOver, setGameOver] = React.useState(false);

        const handleSort = (itemId, category) => {
            setItems(prev => prev.map(item => {
                if (item.id === itemId) {
                    const isCorrect = (category === 'needs') === item.isNeed;
                    if (isCorrect) {
                        setScore(s => s + 1);
                    }
                    return { ...item, category };
                }
                return item;
            }));

            const allSorted = items.length === items.filter(item => item.category).length + 1;
            if (allSorted) {
                setGameOver(true);
            }
        };

        const handleReset = () => {
            setItems(prev => prev.map(item => ({ ...item, category: null })));
            setScore(0);
            setGameOver(false);
        };

        return (
            <div data-name="needs-wants-sorter">
                <div data-name="score-display" className="text-center mb-6">
                    <p className="text-accent-color">Score: {score}/{items.length}</p>
                </div>

                <div className="sorter-container">
                    <div data-name="needs-column" className="flex flex-col gap-4">
                        <h3 className="text-center font-bold">Needs</h3>
                        {items.filter(item => item.category === 'needs').map(item => (
                            <div key={item.id} data-name={`sorted-item-${item.id}`} className="item-card">
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {item.name}
                            </div>
                        ))}
                    </div>

                    <div data-name="wants-column" className="flex flex-col gap-4">
                        <h3 className="text-center font-bold">Wants</h3>
                        {items.filter(item => item.category === 'wants').map(item => (
                            <div key={item.id} data-name={`sorted-item-${item.id}`} className="item-card">
                                <i className={`fas ${item.icon} mr-2`}></i>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>

                {!gameOver ? (
                    <div data-name="unsorted-items" className="mt-6">
                        <h3 className="text-center font-bold mb-4">Sort These Items</h3>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {items.filter(item => item.category === null).map(item => (
                                <div key={item.id} data-name={`item-${item.id}`} className="flex gap-2">
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => handleSort(item.id, 'needs')}
                                    >
                                        Need
                                    </button>
                                    <div className="item-card">
                                        <i className={`fas ${item.icon} mr-2`}></i>
                                        {item.name}
                                    </div>
                                    <button 
                                        className="btn-secondary"
                                        onClick={() => handleSort(item.id, 'wants')}
                                    >
                                        Want
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div data-name="game-over" className="text-center mt-6">
                        <h3 className="text-xl font-bold mb-4">Game Complete!</h3>
                        <p className="mb-6">Your Score: {score}/{items.length}</p>
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
        console.error('NeedsWantsSorter render error:', error);
        reportError(error);
        return null;
    }
}
