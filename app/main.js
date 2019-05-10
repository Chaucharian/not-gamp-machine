const rootElement = document.getElementById('root');
fetch('http://localhost:3000/data').then(data => console.log(data), () => {});