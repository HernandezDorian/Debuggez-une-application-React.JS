import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1) // Inversion du >
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < (byDateDesc?.length || 0) - 1 ? index + 1 : 0), // Ajout du -1 la lenght pour éviter une page blanche sur le dernier state et ajout du (byDateDesc?.length || 0) pour éviter un soucis si il n'est pas défini
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <React.Fragment key={`${event.title}-Fragment`}>
          {/* ajout du react fragment avec une key titre-fragment */}
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={`${e.title}-Radio`} // Nouvelle key titre-radio + (Changement du _ en e par convention car il est finalement utilisé)
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Remplacement de idx par index
                  readOnly // Ajout d'un readonly pour que l'utilisateur comprenne qu'il ne peut pas intéragir avec
                />
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Slider;
