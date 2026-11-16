import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Player = 'X' | 'O' | null;

const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: Player[]): Player {
  for (const [a, b, c] of WINNING_LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function TicTacToeScreen() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((cell) => cell !== null);

  const handlePress = (index: number) => {
    if (board[index] || winner) return;

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  let statusText = `Novbe: ${isXNext ? 'X' : 'O'}`;
  if (winner) {
    statusText = `Qalib: ${winner}!`;
  } else if (isDraw) {
    statusText = 'Hec-hece!';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.status}>{statusText}</Text>

      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => handlePress(index)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.cellText,
                cell === 'X' ? styles.xColor : styles.oColor,
              ]}
            >
              {cell}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetText}>Yeniden basla</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  status: {
    fontSize: 22,
    color: '#e0e0e0',
    marginBottom: 25,
    fontWeight: '600',
  },
  board: {
    width: 300,
    height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#2c2c2c',
    borderRadius: 12,
    overflow: 'hidden',
  },
  cell: {
    width: 100,
    height: 100,
    borderWidth: 1.5,
    borderColor: '#444444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  xColor: {
    color: '#4fc3f7',
  },
  oColor: {
    color: '#ff8a65',
  },
  resetButton: {
    marginTop: 30,
    backgroundColor: '#2979ff',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 10,
  },
  resetText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});