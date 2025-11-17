"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, Clock, Target, TrendingUp, Play, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TreinosPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    {
      id: "beginner",
      name: "💪 Iniciante",
      description: "Perfeito para quem está começando",
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },
    {
      id: "intermediate",
      name: "🔥 Intermediário",
      description: "Para quem já tem experiência",
      color: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },
    {
      id: "advanced",
      name: "⚡ Avançado",
      description: "Desafio máximo para atletas",
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
  ];

  const workoutsByDay = [
    {
      day: 1,
      name: "Cardio",
      duration: "30 min",
      difficulty: "Iniciante",
      exercises: 5,
      description: "Aquecimento e cardio leve",
    },
    {
      day: 2,
      name: "Pernas",
      duration: "45 min",
      difficulty: "Intermediário",
      exercises: 8,
      description: "Fortalecimento de membros inferiores",
    },
    {
      day: 3,
      name: "Abdômen",
      duration: "25 min",
      difficulty: "Iniciante",
      exercises: 6,
      description: "Core e estabilidade",
    },
    {
      day: 4,
      name: "Peito e Tríceps",
      duration: "50 min",
      difficulty: "Intermediário",
      exercises: 9,
      description: "Treino de empurrar",
    },
    {
      day: 5,
      name: "Costas e Bíceps",
      duration: "50 min",
      difficulty: "Intermediário",
      exercises: 9,
      description: "Treino de puxar",
    },
    {
      day: 6,
      name: "Ombros",
      duration: "40 min",
      difficulty: "Avançado",
      exercises: 7,
      description: "Desenvolvimento de ombros",
    },
    {
      day: 7,
      name: "Descanso Ativo",
      duration: "20 min",
      difficulty: "Iniciante",
      exercises: 3,
      description: "Alongamento e mobilidade",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <Dumbbell className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Seus Treinos</h1>
          <p className="text-lg opacity-90">
            Plano personalizado para seus objetivos
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">32</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Treinos</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 mx-auto mb-2 text-pink-600" />
              <p className="text-2xl font-bold">45min</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Média</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">85%</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Progresso</p>
            </CardContent>
          </Card>
        </div>

        {/* Treinos por Nível */}
        <Card>
          <CardHeader>
            <CardTitle>Escolha seu Nível</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedLevel === level.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950"
                    : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">{level.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {level.description}
                    </p>
                  </div>
                  {selectedLevel === level.id && (
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Playlist de Treinos por Dia */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Timer className="w-6 h-6 text-orange-600" />
            Treinos da Semana
          </h2>
          {workoutsByDay.map((workout) => (
            <Card key={workout.day} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Dia {workout.day}
                      </Badge>
                      <Badge
                        className={
                          workout.difficulty === "Iniciante"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : workout.difficulty === "Intermediário"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }
                      >
                        {workout.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{workout.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {workout.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workout.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-4 h-4" />
                      {workout.exercises} exercícios
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700">
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Treino
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Timer/Cronômetro Info */}
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <Timer className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                  Cronômetro Integrado
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Cada treino inclui timer automático para controlar seus intervalos e séries
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
