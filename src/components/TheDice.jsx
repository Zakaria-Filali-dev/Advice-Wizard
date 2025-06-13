import diceImg from"../assets/icon-dice.svg"

export default function TheDice({ onClick }) {
    return (
        <button
            className="dicebtn"
            onClick={onClick}
            style={{ position: 'absolute', left: '50%', bottom: '-28px', transform: 'translateX(-50%)' }}
        >
            <img
                className="diceImg"
                src={diceImg}
                alt="dice image"
            />
        </button>
    );
}