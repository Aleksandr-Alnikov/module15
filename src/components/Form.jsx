import React from "react";

export const Form = ({ name, price, year, setName, setPrice, setYear, handleEdit, setIsVisible }) => {
    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        handleEdit(e);
        setIsVisible(false);
    };

    return (
        <div className="overlay">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="text"
                    placeholder="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Год"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
                <button className="button" type="submit">Редактировать</button>
            </form>
        </div>
    );
};
