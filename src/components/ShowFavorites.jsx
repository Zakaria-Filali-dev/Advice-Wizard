import { useState } from "react"

export default function ShowFav({favList, deleteFavs}) {
    const [showFav,setShowFav]=useState(false)


    const handleShow = () => {
        setShowFav(!showFav)
    }

    return (
        <>
            <div className="showFavContainer">
            <label className="showFav-bookmark" style={{cursor: 'pointer'}}>
                <input type="checkbox" checked={showFav} onChange={handleShow} />
                <div className="bookmark">
                    <svg viewBox="0 0 32 32">
                        <g>
                            <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z"></path>
                        </g>
                    </svg>
                </div>
            </label>
            {showFav &&
                <div className="FavList">
                    {favList.length === 0 ? (
                        <p>No favorites yet.</p>
                    ) : (
                        <>
                        {favList.map((advice) => (
                            <div key={advice.id} className="favAdvice">
                                <ul>
                                    <b># {advice.id} :</b>
                                    <b> "</b> {advice.advice} <b>"</b> 
                                </ul>
                            </div>
                        ))}
                        <button
                            onClick={deleteFavs}
                            className="deleteFavs-btn"
                            title="Clear all favorites"
                            style={{alignSelf: 'center', marginTop: '1rem'}}
                        >
                            <span role="img" aria-label="trash">🗑️</span> Clear All
                        </button>
                        </>
                    )}
                </div>
            }
            </div>
        </>
    )
}