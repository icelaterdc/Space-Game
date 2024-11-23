import { useGameStore } from '../../stores/gameStore';
import { RocketIcon, PauseIcon, PlayIcon } from 'lucide-react';

export function Menu() {
  const { gameState, setGameState, score, resetGame } = useGameStore();

  if (gameState === 'menu') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="text-center text-white p-8 rounded-lg">
          <RocketIcon className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-6">Uzay Keşfi</h1>
          <button
            onClick={() => setGameState('playing')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-xl transition-colors"
          >
            Oyuna Başla
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'paused') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="text-center text-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Oyun Duraklatıldı</h2>
          <div className="space-y-4">
            <button
              onClick={() => setGameState('playing')}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Devam Et
            </button>
            <button
              onClick={resetGame}
              className="block w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ana Menüye Dön
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center">
      <div className="text-white text-xl">Puan: {score}</div>
      <button
        onClick={() => setGameState('paused')}
        className="bg-gray-800 p-2 rounded-lg"
      >
        {gameState === 'playing' ? (
          <PauseIcon className="text-white" />
        ) : (
          <PlayIcon className="text-white" />
        )}
      </button>
    </div>
  );
}