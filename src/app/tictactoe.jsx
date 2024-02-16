"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// store data
let data = ["", "", "", "", "", "", "", "", ""];
let bord = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const Tictactoe = () => {
  // count moves
  let [count, setCount] = useState(0);

  // lock board if someone win
  let [lock, setLock] = useState(false);

  // set winner player (X,O,Draw)
  let [player, setPlayer] = useState(null);

  // for choice buttons
  let [cross, setCross] = useState(true);
  let [circle, setCircle] = useState(false);

  // disable choice button once game is started
  let [lockButton, setLockButton] = useState(false);

  // referance for each box
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();
  const ref7 = useRef();
  const ref8 = useRef();
  const ref9 = useRef();

  let box = [ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9];

  const toggle = (e, num) => {
    // if winner is found in checkwinner() then board is lock this if will return 0

    if (lock) {
      return 0;
    } else {
      // just change count value based on user preference same see below
      // 0 - x, 1 - o, 2 - x, 3 - o, 4 - x ..... initial count is 0 even num = x
      // 1 - o, 2 - x, 3 - o, 4 - x, 5 - o ..... initial count is 1 even num = x

      if (count % 2 === 0 && data[num] === "") {
        e.target.innerHTML = `<Image src="/cross.png" alt='cross'/>`;
        data[num] = "x";
        setCount(++count);
        checkWinner("X");
      } else if (count % 2 != 0 && data[num] === "") {
        e.target.innerHTML = '<Image src="/circle.png" alt="circle" />';
        data[num] = "o";
        setCount(++count);
        checkWinner("O");
      }
    }
  };

  const checkWinner = (winner) => {
    // checking winner and changeing color for box
    if (
      (data[0] === data[1] &&
        data[1] === data[2] &&
        data[2] != "" &&
        ( (box[0].current.className = "column bg-green-900"),
        (box[1].current.className = "column bg-green-900"),
        (box[2].current.className = "column bg-green-900"))) ||
      (data[3] === data[4] &&
        data[4] === data[5] &&
        data[5] != "" &&
        ((box[3].current.className = "column bg-green-900"),
        (box[4].current.className = "column bg-green-900"),
        (box[5].current.className = "column bg-green-900"))) ||
      (data[6] === data[7] &&
        data[7] === data[8] &&
        data[8] != "" &&
        (box[6].current.className = "column bg-green-900") &&
        (box[7].current.className = "column bg-green-900") &&
        (box[8].current.className = "column bg-green-900")) ||
      (data[0] === data[3] &&
        data[3] === data[6] &&
        data[6] != "" &&
        (box[0].current.className = "column bg-green-900") &&
        (box[3].current.className = "column bg-green-900") &&
        (box[6].current.className = "column bg-green-900")) ||
      (data[1] === data[4] &&
        data[4] === data[7] &&
        data[7] != "" &&
        (box[1].current.className = "column bg-green-900") &&
        (box[4].current.className = "column bg-green-900") &&
        (box[7].current.className = "column bg-green-900")) ||
      (data[2] === data[5] &&
        data[5] === data[8] &&
        data[8] != "" &&
        (box[2].current.className = "column bg-green-900") &&
        (box[5].current.className = "column bg-green-900") &&
        (box[8].current.className = "column bg-green-900")) ||
      (data[0] === data[4] &&
        data[4] === data[8] &&
        data[8] != "" &&
        (box[0].current.className = "column bg-green-900") &&
        (box[4].current.className = "column bg-green-900") &&
        (box[8].current.className = "column bg-green-900")) ||
      (data[2] === data[4] &&
        data[4] === data[6] &&
        data[6] != "" &&
        (box[2].current.className = "column bg-green-900") &&
        (box[4].current.className = "column bg-green-900") &&
        (box[6].current.className = "column bg-green-900"))
    ) {
      // console.log("data = ",data)
      setLock(!lock);
      setPlayer(winner);
      setCount(0);
    }

    // check if board is full then draw
    else if (data.every((currentValue) => currentValue != "")) {
      setPlayer("Draw");
    }
  };

  const reset = () => {
    setLock(false); // unlock board

    setPlayer(null); // reset winner name

    setCross(true); // make x default choice
    setCircle(false);

    setCount(0); // make move 0

    setLockButton(false); // unlock choice buttons

    data = ["", "", "", "", "", "", "", "", ""];

    // make board empty again
    box.map((ref) => {
      ref.current.innerHTML = "";
      ref.current.className = "column bg-neutral-800 ";
    });
  };

  return (
    <div className="text-center w-full h-auto">
      <h1 className="mt-5 text-white text-[40px] font-bold max-sm:text-[30px] max-sm:flex max-sm:flex-col">
        Tic Tac Toe Game In
        <span className="text-emerald-400"> Next Js</span>
      </h1>

      {/* winner display */}

      {player != null && player != "Draw" && (
        <div className="text-white text-[30px] font-bold flex gap-1 justify-center items-center m-2">
          Congratulations :
          {player === "X" ? (
            <Image src="/cross.png" width={30} height={80} alt="cross" />
          ) : (
            <Image src="/circle.png" width={30} height={80} alt="circle" />
          )}
          wins
        </div>
      )}

      {player != null && player === "Draw" && (
        <div className="text-white text-[30px] font-bold flex gap-1 justify-center items-center m-2">
          Draw !!
        </div>
      )}

      {/* choose first move either X or O and lock button (reduce opecity) once game is start */}

      {player === null && (
        <div className="flex justify-center items-center gap-5 mt-2 w-auto ">
          <button
            disabled={lockButton}
            onClick={() => {
              setCross(!cross);
              setCircle(false);
              setCount(0);
            }}
            className={`w-[110px] h-[50px] m-2 bg-neutral-800 rounded flex justify-center items-center
               ${
                 cross && "ring ring-emerald-400"
               } text-[20px] disabled:opacity-65 shrink-0 max-sm:w-[80px]`}
          >
            <Image src="/cross.png" width={30} height={80} alt="cross" />
          </button>

          <button
            disabled={lockButton}
            onClick={() => {
              setCircle(!circle);
              setCross(false);
              setCount(1);
            }}
            className={`w-[110px] h-[50px] m-2 bg-neutral-800 rounded flex justify-center items-center
              ${
                circle && "ring ring-emerald-400"
              } text-[20px] disabled:opacity-65 shrink-0 max-sm:w-[80px]`}
          >
            <Image src="/circle.png" width={40} height={80} alt="circle" />
          </button>
        </div>
      )}

      {/* Board div */}

      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 mt-5 gap-2">
          {/* using map to render box and aasign different referece so that whenever reset button is 
          clicked it remove image from box */}

          {bord.map((number) => (
            <div
              ref={box[number]}
              key={number}
              className="column "
              onClick={(e) => {
                setLockButton(true);
                (cross || circle) && toggle(e, number);
              }}
            ></div>
          ))}

          {/* //create multiple div like this for board
                   <div
            className="column"
            onClick={(e) => {
              toggle(e, 9);
            }}
          ></div> */}
        </div>
      </div>

      <button
        onClick={reset}
        className="w-[110px] h-[50px] m-5 bg-emerald-400 rounded-full text-[20px] 
        text-neutral-700 max-sm:w-[90px] active:ring active:ring-emerald-400 
        active:bg-neutral-700 active:text-white "
      >
        Reset
      </button>
    </div>
  );
};

export default Tictactoe;
