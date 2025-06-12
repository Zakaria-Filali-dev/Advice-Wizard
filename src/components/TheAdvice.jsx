import { useState, useEffect } from "react";
import TheDice from "./TheDice";
import LoadingTruck from "./LooadingTruck";
import AddToFav from "./AddToFavorites";
import ShowFav from "./ShowFavorites";

export default function TheAdvice() {
    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fav, setFav] = useState(() => {
        // Load favorites from localStorage on mount
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });

    // Persist favorites to localStorage whenever fav changes
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(fav));
    }, [fav]);

    const fetchAdvice = async () => {
        setLoading(true);
        try {
            const fetchPromise = fetch('https://api.adviceslip.com/advice?timestamp=' + new Date().getTime())
                .then(res => res.json())
                .then(data => setAdvice(data.slip));
            await Promise.all([
                fetchPromise,
                new Promise(resolve => setTimeout(resolve, 2000))
            ]);
        } catch (e) {
            alert(`there have been an error ${e}, please refresh and try again`)
            // handle error if needed
        } finally {
            setLoading(false);
        }
    };
    
    const handleFav = () => {
        
        if (fav.some(newAdvice=>(newAdvice.advice===advice.advice||newAdvice.id===advice.id))) {
            
                setFav(fav.filter(newFavItem => newFavItem.id !== advice.id ))
            
        } else {
            setFav([
                ...fav,
                { advice: advice.advice, id: advice.id }
            ]
        )
    }
}

return (
    <>
            <ShowFav favList={fav} />
            
            <div className="theContainer" style={{ position: 'relative' }}>

{loading ? (
    <LoadingTruck />
): advice ? (
    <>
    <AddToFav onClick={handleFav} />
                            
                            <div className="advice-container">
                            <div>#{advice.id}</div>
                            <div>
                                <b className="quoteMarks">“</b> {advice.advice}
                                <b className="quoteMarks">”</b>
                            </div>
                            
                            <TheDice onClick={() => { fetchAdvice(); }} />
                            
                            <button
                                onClick={() => { setAdvice(null) }}
                                className="hideTheAdvice"
                            >
                                <b>x</b>
                            </button>
                            </div>
                        </>


) : (
    
    <div>
                                <p>Wanna Hear Some Wisdom ?</p>
                                <TheDice onClick={() => { fetchAdvice() }} />
                            </div>
                )}
            </div>
        </>
    );
}
