const Card = ({ item, removeItem, edit }) => {
    return (
        <li className="card">
            <h2>{item.name}</h2>
            <h3>{item.price}</h3>
            <h4>{item.year}</h4>
            <button onClick={() => removeItem(item.id)}>Удалить</button>
            <button onClick={edit}>Редактировать</button>
        </li>
    );
};

export default Card;