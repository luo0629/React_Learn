import { useState} from "react";
import Board from './Checkerboard';
export default function Game(){

    //xIsNext的值可以有currentMove得出所以不需要再浪费一个状态
    // const [xIsNext,setxIsNext]=useState(true);   //判断下一个执棋者
    const [history,sethistory]=useState<Array<Array<string|null>>>([Array(9).fill(null)]); //用于储存历史状态
    const [currentMove,setCurrentMove]=useState(0); //用来保存当前进行第几步的状态
    const [isAscending,setIsAscending]=useState(true);   //保存顺序的状态
    const currentSquares=history[currentMove]; //获取最新的一次状态 便于渲染
    const xIsNext=currentMove%2===0;  //判断下一个执棋者

    function handlePlay(nextSquares:Array<string|null>){
        const nextHistory=[...history.slice(0,currentMove+1),nextSquares]; //保存当前状态
        sethistory(nextHistory);  //保存下棋的历史 用于后续的回滚
        setCurrentMove(nextHistory.length-1); //更新move的值
    }

    function jumpTo(nextMove:number){
        setCurrentMove(nextMove); //跳转时更新move 并且重新渲染状态
    }

    const baseMoves=history.map((_squares:Array<string|null>,move:number)=>{
        let description;
        if(move>0){
            description='Go to move #'+move;
        }else{
            description='Go to game start';
        }
        return (
            <li key={move}>
                {move===currentMove?`You are at move #${move}`:<button onClick={()=>jumpTo(move)} >{description}</button>}
            </li>
        )
    })
    const moves=isAscending? baseMoves:baseMoves.slice().reverse(); //根据状态改变列表顺序
    //这里baseMoves.slice().reverse(); 返回的是浅复制 对baseMoves本身没有任何影响
    return (
        <div className="game">
            <div className="game-board">              
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <button onClick={()=>setIsAscending(!isAscending)}>
                    Sort {isAscending ? "Descending" : "Ascending"}
                </button>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}
