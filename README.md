# ΩEDIPUS Card Game

A strategic card game where two players compete to create sequences in different directions.

## Game Versions

- **index.html**: Basic version of the game with core functionality
- **game v1.html**: Enhanced version featuring cards arranged in a diagonal pattern
- **game v2.html**: AI-enabled version (in development)

## Game Rules

### Setup
- Uses a standard 52-card deck (no jokers)
- Game is played on a 5x5 grid
- Each player is dealt 5 cards at the start

### Players
- **Player 1**: Aims to create horizontal sequences
- **Player 2**: Aims to create vertical sequences

### Gameplay
1. Players take turns to either:
   - Draw a card
   - Place a card on the board

2. Card Placement Rules:
   - Cards can only replace existing cards of the same suit
   - Aces can be used as either high or low
   - Face cards (Jack, Queen, King) count in sequences
   - Players may inadvertently help their opponent when placing cards

### Winning Conditions
- Player 1 wins by creating a horizontal sequence of 5 cards (ascending or descending)
- Player 2 wins by creating a vertical sequence of 5 cards (ascending or descending)
- Sequences can be formed in either ascending or descending order

### Strategic Elements
- Players must balance between:
  - Building their own sequences
  - Blocking their opponent's progress
  - Managing their hand effectively
  - Considering the implications of card placement, as it might help the opponent

## Interface Features
- Greek-inspired visual design
- "ΩEDIPUS" title with lightning bolt (⚡) decorations
- Player hand display
- Turn-based gameplay with "Next Player Ready?" confirmation
- Responsive game board layout 