'use client'

import { useState, useEffect } from 'react'
import { Quiz } from './components/Quiz'
import { Leaderboard } from './components/Leaderboard'
import { registerUser, submitScore, getLeaderboard } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [user, setUser] = useState<{ name: string; score: number } | null>(null)
  const [leaderboard, setLeaderboard] = useState<{ name: string; score: number }[]>([])
  const [name, setName] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)

  useEffect(() => {
    getLeaderboard().then(setLeaderboard)
  }, [])

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name) {
      const newUser = await registerUser(name)
      setUser(newUser)
      setShowQuiz(true)
    }
  }

  const handleQuizComplete = async (score: number) => {
    if (user) {
      await submitScore(user.name, score)
      setUser({ ...user, score })
      setShowQuiz(false)
      const updatedLeaderboard = await getLeaderboard()
      setLeaderboard(updatedLeaderboard)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Simple Quiz</h1>
      {!user ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Register to Play</CardTitle>
          </CardHeader>
          <form onSubmit={handleRegister}>
            <CardContent>
              <Input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Start Quiz</Button>
            </CardFooter>
          </form>
        </Card>
      ) : showQuiz ? (
        <Quiz onComplete={handleQuizComplete} />
      ) : (
        <div className="text-center mb-8">
          <p className="text-xl mb-4">Thanks for playing, {user.name}!</p>
          <p className="text-lg">Your score: {user.score}</p>
          <Button onClick={() => setShowQuiz(true)} className="mt-4">Play Again</Button>
        </div>
      )}
      <div className="mt-8 w-full max-w-md">
        <Leaderboard users={leaderboard} />
      </div>
    </main>
  )
}

