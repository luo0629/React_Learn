import { type MouseEventHandler } from "react";

type SquareProps = {
  value: string | null;
  onSquareClick: MouseEventHandler;
  isHighlighted?: boolean;
};

type BoardProps = {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
};

type WinnerResult = {
  winner: string;
  line: number[];
};

//单个元素格式
function Square({ value, onSquareClick, isHighlighted = false }: SquareProps) {
  const className = isHighlighted ? "square highlight" : "square";
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  const result = calculateWinner(squares);
  const winner = result?.winner ?? null;
  const winningLine = result?.line ?? [];
  const winningSet = new Set(winningLine);
  const isDraw = !winner && squares.every((value) => value !== null);

  //定义响应事件 通过父组件的相应事件来改变 父组件和子组件的状态
  //引入变量i，从而是的点击第i个方块就会变为X
  function handleClick(i: number) {
    if (squares[i] || result) {
      //判断是否重复点击 以及是否有人获胜
      return; //防止被覆盖 如果已经有'X' or 'O'就直接返回
    }
    const nextSquares = squares.slice(); //React 要求状态是不可变的，如果直接改原数组 React 检测不到变化。
    nextSquares[i] = xIsNext ? "X" : "O"; //保持底层数据不变性，便于后续的撤销和重做
    onPlay(nextSquares);
  }

  let state;
  if (winner) {
    state = `Winner: ${winner}`;
  } else if (isDraw) {
    state = "Draw: No winner this time";
  } else {
    state = `Next Player : ${xIsNext ? "X" : "O"}`;
  }

  //使用双重循环进行创建
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const cell = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      cell.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isHighlighted={winningSet.has(index)}
        />
      );
    }
    boardRows.push(
      <div className="board-row" key={row}>
        {cell}
      </div>
    );
  }

  return (
    <>
      <div className="status">{state}</div>
      {boardRows}
    </>
  );
}

//宣布获胜者
function calculateWinner(squares: Array<string | null>): WinnerResult | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as string, line: lines[i] };
    }
  }
  return null;
}
