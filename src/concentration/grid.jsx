import React, { Component } from "react";
import styles from "./grid.module.css";
import Card from './components/card/card';

/**
 * TODO: Add the ability for the user to add Number of cards
 * TODO: Add New Game Button
 * TODO: Add Restart Button
 * TODO: Make the cards flip
 */
const NUMBER_OF_PAIRS_OF_CARDS = 8;
let indexOfTheOnlyFacedUpCard = -1;

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
        };

    }

    componentDidMount() {
    // initialize the grid in here.
        this.intializeGame();
    
    }

    
    handleClick = (index) => {

        
        let grid = [...this.state.grid];
        let card = grid[index];
        
        if(card.isMatched) {
            return;
        }
        // one card up
        if(indexOfTheOnlyFacedUpCard === -1) { // all cards are facedown we clicked one card.
            // make all the cards face down put this card face up
            grid.map((card) => card.isFaceUp = false);
            grid[index].isFaceUp = true;
            this.setState({grid})
            indexOfTheOnlyFacedUpCard = index;
        } else {
            if(index !== indexOfTheOnlyFacedUpCard) {
                // face that card up.
                grid[index].isFaceUp = true;
                this.setState({grid}); // update the game
                
                if(grid[index].identifier === grid[indexOfTheOnlyFacedUpCard].identifier) {
                    // match them 
                    grid[index].isMatched = true;
                    grid[indexOfTheOnlyFacedUpCard].isMatched = true;
                } else {
                    // if they are not matched now what?
                }
                this.setState({grid});

                indexOfTheOnlyFacedUpCard = -1;
            }

        
        }

        
    }

    newGame = () => {
        this.intializeGame();
    }

    // initializes game. also called for new Game or restart.
    intializeGame = () => {
        const grid = [];
        const emojies = ['👹', '👺', '🤡', '💩', '👻', '👾', '🤖', '👽'];
        for (let i = 0; i < NUMBER_OF_PAIRS_OF_CARDS; i++) {

            //each card has the following properties.
            const card = {
                isFaceUp: false,
                isMatched: false,
                identifier: i,
                emoji: emojies[i],
            };
            let secondCard = { ...card };
            grid.push(card);
            grid.push(secondCard);
        }

        // randomize the cards
        for (let i = 0; i < NUMBER_OF_PAIRS_OF_CARDS * 2; i++) {
            let temp = grid[i];
            let rand = Math.floor(Math.random() * i);
            grid[i] = grid[rand];
            grid[rand] = temp;
        }

        this.setState({ grid });
    }

    renderCard = (index) => {
        return (
            <Card
                key={index} 
                card={this.state.grid[index]}
                onClick={() => this.handleClick(index)}
            />
        );
        
    }

    render() {
        return (
            <div className={`${styles.grid}`}>
        
                {
                    this.state.grid.map((_, index) => {
                        //return console.log(card);
                        return this.renderCard(index)
                    })
                }
                <div className={styles.menu}>
                    <button onClick={this.newGame}>New Game / Restart</button>
                </div>
            </div>
        );
    }
}

export default Grid;
