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
            <div className={`${value}`} onClick={this.props.onClick}>
                {
                    this.props.card.isFaceUp? card.emoji: ''
                }
                {/* <span>X</span> */}
            </div>
        );
    }
}



export default Card;