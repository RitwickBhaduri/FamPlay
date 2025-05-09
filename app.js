function App() {
    try {
        const [currentGame, setCurrentGame] = React.useState(null);
        const [showTutorial, setShowTutorial] = React.useState(true);

        React.useEffect(() => {
            if (!currentGame) {
                setCurrentGame(getRandomGame());
            }
        }, []);

        const handleNextGame = () => {
            setCurrentGame(getRandomGame(currentGame));
            setShowTutorial(true);
        };

        if (!currentGame) return null;

        return (
            <div data-name="app-container">
                <Header currentGame={currentGame} />
                
                {showTutorial && (
                    <Tutorial 
                        game={currentGame} 
                        onClose={() => setShowTutorial(false)} 
                    />
                )}
                
                <GameWrapper 
                    currentGame={currentGame}
                    onNextGame={handleNextGame}
                />
            </div>
        );
    } catch (error) {
        console.error('App render error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
