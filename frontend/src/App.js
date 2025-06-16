import PageRender from './Page'
import './App.css';
import databook from './Book.json'
import { useEffect, useState } from 'react';
import Header from './components/HeaderComps/Header';
import StartMessage from './components/StartingComps/StartMessage';
import { useCallback } from 'react';  


function App() {
  console.log(databook);
  const [ index, setIndex ] = useState(0);
  const [page, setPage] = useState({
    data : databook[0].data,
  });
  const [isLanched, setIsLanched] = useState(false);
  const spacePressed = useCallback((e) => {
    if (e.keyCode === 32) {
      setIsLanched(true);
      setIndex((prevIndex) => (prevIndex + 1) % databook.length);
      if (page) {
        setPage({
          data: databook[index],
        });
      }
    }
  }, [page]);
  useEffect(() => {
    window.addEventListener('keydown', spacePressed);
    return () => {
      window.removeEventListener('keydown', spacePressed);
    };
  }, [spacePressed, page]);


  return (
    <div className="App" >
      <Header />
      { isLanched ? (<PageRender data={page} />) : (<StartMessage />)}    
    </div>
  );
}

export default App;