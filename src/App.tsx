import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { SpaceShip } from './components/SpaceShip';
import { Environment } from './components/Environment';
import { Menu } from './components/UI/Menu';
import { useGameStore } from './stores/gameStore';

function App() {
  const gameState = useGameStore((state) => state.gameState);

  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
        { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
        { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
        { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
        { name: 'up', keys: ['Space'] },
        { name: 'down', keys: ['ShiftLeft', 'ShiftRight'] },
      ]}
    >
      <div className="h-screen w-screen">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 75 }}
          style={{ background: '#000008' }}
        >
          <Environment />
          {gameState === 'playing' && <SpaceShip />}
          <EffectComposer>
            <Bloom
              intensity={1.5}
              luminanceThreshold={0.5}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        </Canvas>
        <Menu />
      </div>
    </KeyboardControls>
  );
}

export default App;