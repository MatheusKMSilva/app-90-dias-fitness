"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Target, Calendar, TrendingUp, Play, Bell, Lightbulb, Award } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [progress] = useState(45); // Dias completados de 90

  const quickGoals = [
    { id: 1, title: "Beber 2L de água", completed: true },
    { id: 2, title: "Treino do dia", completed: false },
    { id: 3, title: "5 refeições saudáveis", completed: true },
    { id: 4, title: "8h de sono", completed: false },
  ];

  const motivationalTip = "A disciplina é a ponte entre objetivos e conquistas. Continue firme!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Banner Principal */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Bem-vindo ao Desafio 90 Dias!
          </h1>
          <p className="text-xl opacity-90">
            Transforme seu corpo e sua vida em apenas 90 dias
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Progresso do Usuário */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Seu Progresso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dias Restantes */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Dias Completados</span>
                <span className="text-orange-600 font-bold">{progress} de 90 dias</span>
              </div>
              <Progress value={(progress / 90) * 100} className="h-3" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Faltam apenas {90 - progress} dias para completar o desafio!
              </p>
            </div>

            {/* Peso Atual x Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950 dark:to-pink-950 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Peso Atual</p>
                <p className="text-3xl font-bold text-orange-600">78 kg</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Meta</p>
                <p className="text-3xl font-bold text-green-600">72 kg</p>
              </div>
            </div>

            {/* Botão Começar Treino */}
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg"
              onClick={() => router.push("/treinos")}
            >
              <Play className="w-5 h-5 mr-2" />
              Começar o Treino de Hoje
            </Button>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold">{progress}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Dias Ativos</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Dumbbell className="w-8 h-8 mx-auto mb-2 text-pink-600" />
              <p className="text-2xl font-bold">32</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Treinos</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold">-6kg</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Perdidos</p>
            </CardContent>
          </Card>
        </div>

        {/* Metas Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-orange-600" />
              Metas de Hoje
            </CardTitle>
            <CardDescription>Complete todas para ganhar pontos extras!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickGoals.map((goal) => (
              <div
                key={goal.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  goal.completed
                    ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                    : "bg-gray-50 dark:bg-gray-800"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    goal.completed
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  {goal.completed && (
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
                  )}
                </div>
                <span
                  className={`flex-1 ${
                    goal.completed
                      ? "text-green-700 dark:text-green-300 line-through"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {goal.title}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notificações/Lembretes */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Bell className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Lembrete Importante
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Não esqueça de registrar suas refeições de hoje! Mantenha o controle da sua dieta.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dica do Dia */}
        <Card className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950 dark:to-pink-950 border-orange-200 dark:border-orange-800">
          <CardContent className="py-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">
                  💪 Dica do Dia
                </h3>
                <p className="text-sm text-orange-800 dark:text-orange-200 italic">
                  "{motivationalTip}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
