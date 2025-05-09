function Tutorial({ game, onClose }) {
    try {
        return (
            <div data-name="tutorial-overlay" className="tutorial-overlay fade-in">
                <div data-name="tutorial-content" className="tutorial-content">
                    <h2 data-name="tutorial-title" className="text-xl font-bold mb-4">How to Play</h2>
                    <p data-name="tutorial-description" className="mb-6">{game.tutorial}</p>
                    <button 
                        data-name="start-button"
                        className="btn-primary"
                        onClick={onClose}
                    >
                        Start Playing
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Tutorial render error:', error);
        reportError(error);
        return null;
    }
}
