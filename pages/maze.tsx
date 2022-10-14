import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import ms from '../styles/maze.module.css'

import mazes from '../mazes'

type Maze = boolean[][]

interface Player {
  symbol: string
  x: number
  y: number
  color: string
  visited: Maze
}

const players: Player[] = [
  { x: 1, y: 1, symbol: "☃", color: 'red', visited: [] },
  { x: 0, y: 0, symbol: "☄", color: 'yellow', visited: [] },
]

function moveX(player: Player, move: 1 | -1, maze: Maze) {
  const canGo = maze?.[player.y]?.[player.x + move]
  if (canGo) player.x = player.x + move
}

function moveY(player: Player, move: 1 | -1, maze: Maze) {
  const canGo = maze?.[player.y + move]?.[player.x]
  if (canGo) player.y = player.y + move
}


const Home: NextPage = () => {

  const [tick, setTick] = useState(0)
  const [maze, setMaze] = useState<Maze>([])

  useEffect(() => {
    const maze_: Maze = mazes[Math.floor(Math.random() * mazes.length)].slice(1, -1).split("\n").map((v) => v.split("").map(v => v === '-'))
    setMaze(maze_)
  }, [])

  useEffect(() => {

    const listener = function (event: any) {

      const [p1, p2] = players

      players.forEach(player => (player.visited[player.y] ??= [])[player.x] = true)

      switch (event.key) {
        case 'ArrowLeft':/* */moveX(p1, -1, maze); break
        case 'ArrowUp':/*   */moveY(p1, -1, maze); break
        case 'ArrowRight':/**/moveX(p1, +1, maze); break
        case 'ArrowDown':/* */moveY(p1, +1, maze); break
        case 'a': moveX(p2, -1, maze); break
        case 'w': moveY(p2, -1, maze); break
        case 'd': moveX(p2, +1, maze); break
        case 's': moveY(p2, +1, maze); break
      }

      setTick(tick => tick + 1)

    }

    document.addEventListener('keydown', listener)
    return () => document.removeEventListener('keydown', listener)
  }, [maze])

  return (
    <div className={styles.container}>
      <Head>
        <title>The Maze</title>
      </Head>

      <main className={styles.main}>
        <div className={ms.mazeContainer}>
          {
            maze.map((row, y) => {
              return row.map((cell, x) => {
                return (

                  /* RENDER CELL */
                  <div style={{ backgroundColor: cell ? 'black' : 'gray' }} className={ms.cell} key={`${x}+${y}`}>


                    {
                      /* RENDER PATH */
                      players.map((player) => {
                        return player.visited[y]?.[x] ? <div className={ms.visited} style={{ backgroundColor: player.color }}></div> : null
                      })
                    }


                    {
                      /* RENDER PLAYER */
                      players.map((player) => {
                        return (player.x === x && player.y === y) ? <div className={ms.player} style={{ color: player.color }}>{player.symbol}</div> : null
                      })
                    }

                  </div>
                )
              })
            })
          }
        </div>
      </main>

    </div>
  )
}

export default Home
