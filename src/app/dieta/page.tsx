"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, Apple, Beef, Droplet, Flame, ShoppingCart, Calculator, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DietaPage() {
  const [isPremium] = useState(false);

  const meals = [
    {
      id: 1,
      name: "Café da Manhã",
      time: "07:00",
      calories: 450,
      items: ["2 ovos mexidos", "2 fatias de pão integral", "1 banana", "Café com leite"],
    },
    {
      id: 2,
      name: "Lanche da Manhã",
      time: "10:00",
      calories: 200,
      items: ["1 iogurte natural", "Granola", "Mel"],
    },
    {
      id: 3,
      name: "Almoço",
      time: "12:30",
      calories: 650,
      items: ["Peito de frango grelhado", "Arroz integral", "Feijão", "Salada verde", "Legumes"],
    },
    {
      id: 4,
      name: "Café da Tarde",
      time: "15:30",
      calories: 180,
      items: ["Whey protein", "1 maçã"],
    },
    {
      id: 5,
      name: "Jantar",
      time: "19:00",
      calories: 550,
      items: ["Salmão grelhado", "Batata doce", "Brócolis", "Salada"],
    },
    {
      id: 6,
      name: "Ceia",
      time: "21:30",
      calories: 150,
      items: ["Queijo cottage", "Castanhas"],
    },
  ];

  const shoppingList = [
    "Ovos (2 dúzias)",
    "Pão integral",
    "Bananas",
    "Iogurte natural",
    "Peito de frango (1kg)",
    "Arroz integral",
    "Feijão",
    "Salmão (500g)",
    "Batata doce (1kg)",
    "Brócolis",
    "Verduras variadas",
    "Whey protein",
    "Queijo cottage",
    "Castanhas",
  ];

  const recipes = [
    {
      name: "Omelete Proteico",
      calories: 320,
      time: "10 min",
      difficulty: "Fácil",
    },
    {
      name: "Frango Grelhado com Legumes",
      calories: 450,
      time: "25 min",
      difficulty: "Médio",
    },
    {
      name: "Salada de Quinoa",
      calories: 280,
      time: "15 min",
      difficulty: "Fácil",
    },
  ];

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const targetCalories = 2200;
  const caloriesProgress = (totalCalories / targetCalories) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <UtensilsCrossed className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Seu Plano Alimentar</h1>
          <p className="text-lg opacity-90">
            Dieta personalizada para seus objetivos
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Premium Banner */}
        {!isPremium && (
          <Card className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 border-0 text-white">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-10 h-10" />
                  <div>
                    <h3 className="font-bold text-lg">Desbloqueie o Plano Premium</h3>
                    <p className="text-sm opacity-90">
                      Dieta 100% personalizada + acompanhamento nutricional
                    </p>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
                >
                  Assinar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Nutrition Stats */}
        <Card className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950 dark:to-pink-950">
          <CardHeader>
            <CardTitle>Resumo Nutricional Diário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-600" />
                  Calorias
                </span>
                <span className="font-semibold">
                  {totalCalories} / {targetCalories} kcal
                </span>
              </div>
              <Progress value={caloriesProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Beef className="w-6 h-6 text-red-600" />
                </div>
                <p className="text-2xl font-bold">165g</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Proteínas</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Apple className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold">220g</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Carboidratos</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Droplet className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold">60g</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Gorduras</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cardápio Diário */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cardápio do Dia</h2>
          {meals.map((meal) => (
            <Card key={meal.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <p className="text-lg">{meal.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-normal">
                      {meal.time}
                    </p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300">
                    {meal.calories} kcal
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {meal.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Receitas Rápidas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-orange-600" />
              Receitas Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recipes.map((recipe, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div>
                  <p className="font-semibold">{recipe.name}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mt-1">
                    <span>{recipe.calories} kcal</span>
                    <span>•</span>
                    <span>{recipe.time}</span>
                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Ver Receita
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lista de Compras */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-orange-600" />
              Lista de Compras da Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {shoppingList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <div className="w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calculadora de Calorias */}
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 border-purple-200 dark:border-purple-800">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-600" />
                <div>
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">
                    Calculadora de Calorias
                  </h3>
                  <p className="text-sm text-purple-800 dark:text-purple-200">
                    Calcule suas necessidades calóricas diárias
                  </p>
                </div>
              </div>
              <Button variant="outline" className="border-purple-600 text-purple-600">
                Calcular
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Hydration Reminder */}
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
          <CardContent className="py-6">
            <div className="flex items-center gap-4">
              <Droplet className="w-12 h-12 text-blue-600" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Hidratação</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Meta diária: 2.5L de água
                </p>
                <Progress value={65} className="h-2 mt-2" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">1.6L</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">consumido</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
