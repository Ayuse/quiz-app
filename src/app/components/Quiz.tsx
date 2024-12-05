'use client'

import { useState } from 'react'
import { quizQuestions } from '../utils/quizQuestions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

type QuizProps = {
  onComplete: (score: number) => void
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleAnswer = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion)
      setSelectedAnswer(null)
    } else {
      onComplete(score + (selectedAnswer === quizQuestions[currentQuestion].correctAnswer ? 1 : 0))
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Question {currentQuestion + 1} of {quizQuestions.length}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{quizQuestions[currentQuestion].question}</p>
        <RadioGroup value={selectedAnswer || ''} onValueChange={setSelectedAnswer}>
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAnswer} disabled={!selectedAnswer} className="w-full">
          {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </CardFooter>
    </Card>
  )
}

