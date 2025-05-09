function CoinCatcher() {
    try {
        const [score, setScore] = React.useState(0);
        const [target, setTarget] = React.useState(100);
        const [basketPosition, setBasketPosition] = React.useState(50);
        const [coins, setCoins] = React.useState([]);
        const [gameOver, setGameOver] = React.useState(false);

        React.useEffect(() => {
            const handleMove = (e) => {
                const touch = e.touches[0];
                const container = document.querySelector('.coin-catcher');
                const rect = container.getBoundingClientRect();
                const relativeX = ((touch.clientX - rect.left) / rect.width) * 100;
                setBasketPosition(Math.max(0, Math.min(90, relativeX)));
            };

            document.addEventListener('touchmove', handleMove);
            const coinInterval = setInterval(spawnCoin, 2000);

            return () => {
                document.removeEventListener('touchmove', handleMove);
                clearInterval(coinInterval);
            };
        }, []);

        const spawnCoin = () => {
            if (gameOver) return;
            
            const values = [10, 50, 100];
            const newCoin = {
                id: Date.now(),
                value: values[Math.floor(Math.random() * values.length)],
                position: Math.random() * 90,
                top: -30
            };

            setCoins(prev => [...prev, newCoin]);
            
            const animateCoin = () => {
                setCoins(prev => prev.map(coin => {
                    if (coin.id === newCoin.id) {
                        const newTop = coin.top + 1;
                        
                        // Check collision with basket
                        if (newTop >= 85 && newTop <= 90 && 
                            Math.abs(coin.position - basketPosition) < 10) {
                            setScore(s => {
                                const newScore = s + coin.value;
                                if (newScore === target) {
                                    setGameOver(true);
                                }
                                return newScore;
                            });
                            return null;
                        }
                        
                        // Remove coin if it falls off screen
                        if (newTop > 100) return null;
                        
                        return { ...coin, top: newTop };
                    }
                    return coin;
                }).filter(Boolean));
            };

            const animation = setInterval(animateCoin, 50);
            setTimeout(() => clearInterval(animation), 5000);
        };

        return (
            <div data-name="coin-catcher" className="coin-catcher">
                <div data-name="game-score" className="game-score">
                    ₹{score} / ₹{target}
                </div>
                
                {coins.map(coin => (
                    <div
                        key={coin.id}
                        data-name="coin"
                        className="coin"
                        style={{
                            left: `${coin.position}%`,
                            top: `${coin.top}%`
                        }}
                    >
                        ₹{coin.value}
                    </div>
                ))}
                
                <div
                    data-name="basket"
                    className="basket"
                    style={{ left: `${basketPosition}%` }}
                />
                
                {gameOver && (
                    <div data-name="win-message" className="tutorial-overlay">
                        <div className="tutorial-content">
                            <h2 className="text-xl font-bold mb-4">Congratulations!</h2>
                            <p>You reached the target amount!</p>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('CoinCatcher render error:', error);
        reportError(error);
        return null;
    }
}
