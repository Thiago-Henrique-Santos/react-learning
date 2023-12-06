import './App.css';
import CrudSection from './components/CrudSection/CrudSection';

export default function App() {
  return (
    <div id="App">
      <header>React Learning - Consumindo <a href="https://github.com/Thiago-Henrique-Santos/LearningProjects/tree/main">Simple Object Register API</a></header>
      
      <main>
        <CrudSection title="Registrar"/>
        <CrudSection title="Atualizar"/>
      </main>

      <footer>
        Desenvolvido por <a href="https://github.com/Thiago-Henrique-Santos">Thiago Santos</a>.
      </footer>
    </div>
  );
};
