function PriceIsRight() {
    try {
        const [currentItem, setCurrentItem] = React.useState(0);
        const [score, setScore] = React.useState(0);
        const [gameOver, setGameOver] = React.useState(false);
        
        const items = [
            {
                name: "1kg Rice",
                correctPrice: 60,
                options: [40, 60, 80, 100],
                image: "https://source.unsplash.com/featured/?rice"
            },
            {
                name: "1L Milk",
                correctPrice: 50,
                options: [30, 40, 50, 60],
                image: "https://source.unsplash.com/featured/?milk"
            },
            {
                name: "Bread",
                correctPrice: 40,
                options: [25, 40, 55, 70],
                image: "https://source.unsplash.com/featured/?bread"
            },
            {
                name: "Notebook",
                correctPrice: 30,
                options: [20, 30, 40, 50],
                image: "https://source.unsplash.com/featured/?notebook"
            }
        ];

        const handleGuess = (price) => {
            if (price === items[currentItem].correctPrice) {
                setScore(s => s + 1);
            }
            
            if (currentItem === items.length - 1) {
                setGameOver(true);
            } else {
                setCurrentItem(prev => prev + 1);
            }
        };

        const handleReset = () => {
            setCurrentItem(0);
            setScore(0);
            setGameOver(false);
        };

        return (
            <div data-name="price-right" className="price-right">
                <div data-name="score-display" className="text-center mb-6">
                    <p className="text-accent-color">Score: {score}/{items.length}</p>
                </div>

                {!gameOver ? (
                    <React.Fragment>
                        <div data-name="item-display" className="text-center mb-6">
                            <img 
                                src={items[currentItem].image}
                                alt={items[currentItem].name}
                                className="w-32 h-32 mx-auto mb-4 rounded-lg object-cover"
                            />
                            <h3 className="text-xl font-bold mb-2">
                                {items[currentItem].name}
                            </h3>
                            <p className="text-gray-400">Select the correct price</p>
                        </div>

                        <div data-name="price-options" className="flex flex-col gap-4">
                            {items[currentItem].options.map((price, index) => (
                                <button
                                    key={index}
                                    data-name={`price-option-${price}`}
                                    className="price-option"
                                    onClick={() => handleGuess(price)}
                                >
                                    ₹{price}
                                </button>
                            ))}
                        </div>
                    </React.Fragment>
                ) : (
                    <div data-name="game-over" className="text-center">
                        <h3 className="text-xl font-bold mb-4">Game Over!</h3>
                        <p className="mb-6">Final Score: {score}/{items.length}</p>
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
        console.error('PriceIsRight render error:', error);
        reportError(error);
        return null;
    }
}
