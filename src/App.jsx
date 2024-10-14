import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import {Form} from "./components/Form";


const App = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://f8710d69a6cd6ab6.mokky.dev/products');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        setData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  const handleEditor = (item) => {
    setEditItem(item);
    setName(item.name);
    setPrice(item.price);
    setYear(item.year);
    setIsVisible(true);
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const updatedItem = { ...editItem, name, price, year };

    console.log("Updating item with id:", editItem.id)

    try {
      const response = await fetch(`https://f8710d69a6cd6ab6.mokky.dev/products/${editItem.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('error');
      }

      const updatedData = await response.json();
      setData(prevData =>
          prevData.map(item => (item.id === updatedData.id ? updatedData : item))
      );
      resetForm();
    } catch (error) {
      console.error (error);
    }
  };

  const resetForm = () => {
    setIsVisible(false);
    setEditItem(null);
    setName('');
    setPrice('');
    setYear('');
  };

  const removeItem = async (id) => {
    try {
      await fetch(`https://f8710d69a6cd6ab6.mokky.dev/products/${id}`, { method: "DELETE" });
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();

    const newItem = {
      id: Date.now().toString(),
      name,
      price,
      year,
    };

    try {
      const response = await fetch('https://f8710d69a6cd6ab6.mokky.dev/products', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('error');
      }

      const data = await response.json();
      setData(prevData => [...prevData, data]);
      setName('');
      setPrice('');
      setYear('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <main>
        <div className="container">
          <form onSubmit={addItem}>
            <input
                type="text"
                placeholder="Название"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Год"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
            />
            <button type="submit">Добавить</button>
          </form>
          <ul>
            {data.map(item => (
                <Card key={item.id} item={item} edit={() => handleEditor(item)} removeItem={removeItem} />
            ))}
          </ul>
        </div>
        {isVisible &&
            <Form
                name={name}
                price={price}
                year={year}
                setName={setName}
                setPrice={setPrice}
                setYear={setYear}
                handleEdit={updateItem}
                setIsVisible={setIsVisible}
            />}
      </main>
  );
};


export default App;