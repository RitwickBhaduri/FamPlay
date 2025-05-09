function Header({ currentGame }) {
    try {
        return (
            <header data-name="header" className="header">
                <h1 data-name="game-title" className="text-xl font-bold mb-2">
                    {currentGame.title}
                </h1>
                <p data-name="game-description" className="text-sm text-gray-400">
                    {currentGame.shortDescription}
                </p>
            </header>
        );
    } catch (error) {
        console.error('Header render error:', error);
        reportError(error);
        return null;
    }
}
