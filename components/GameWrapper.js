function GameWrapper({ currentGame, onNextGame }) {
    try {
        const GameComponent = currentGame.component;

        return (
            <div data-name="game-wrapper" className="game-container">
                <GameComponent />
                <div data-name="game-controls" className="fixed bottom-4 left-0 right-0 flex justify-center">
                    <button 
                        data-name="next-game-button"
                        className="btn-primary"
                        onClick={onNextGame}
                    >
                        Next Game
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameWrapper render error:', error);
        reportError(error);
        return null;
    }
}
