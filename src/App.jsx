import './App.css';

function CrudSection() {
  return (
    <div class="CrudSection">
      <h1>Título da seção</h1>

    </div>
  );
}

export default function App() {
  return (
    <div id="App">
      <header>React Learning - Consuming Simple Object Register API</header>
      
      <main>
        <CrudSection/>
      </main>

      <footer>
        Desenvolvido por <a href="https://github.com/Thiago-Henrique-Santos">Thiago Santos</a>.
      </footer>
    </div>
  );
};
