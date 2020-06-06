import React, {Component} from "react";
import styles from "./card.module.css";

class Card extends Component {
    render() {

        let value = null;
        let card = this.props.card;

        if(card.isMatched) {
            value = styles.matched
        } else if(card.isFaceUp) {
            value = styles.card;
        } else /*if(!card.isFaceUp)*/ {
            value = styles.faceDown;
        }


        // console.log(this.props.card.isMatched)
        return(
            <div className={`${styles.container} ${value}`} onClick={this.props.onClick}>
                <div className={`${value}`}>
                    {
                        this.props.card.isFaceUp? card.emoji: ''
                    }
                </div>
                {/* <span>X</span> */}
            </div>
        );
    }
}



export default Card;