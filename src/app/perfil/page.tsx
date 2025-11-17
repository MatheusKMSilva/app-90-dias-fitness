"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Phone, Calendar, Target, Award, Settings, LogOut, TrendingUp, Dumbbell, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function PerfilPage() {
  const userStats = [
    { label: "Dias de Treino", value: "45", icon: Calendar },
    { label: "Objetivo", value: "Perda de Peso", icon: Target },
    { label: "Conquistas", value: "12", icon: Award },
  ];

  const weeklyProgress = [
    { week: "Sem 1", weight: 84 },
    { week: "Sem 2", weight: 82.5 },
    { week: "Sem 3", weight: 81 },
    { week: "Sem 4", weight: 80 },
    { week: "Sem 5", weight: 79 },
    { week: "Sem 6", weight: 78 },
  ];

  const recentWorkouts = [
    { date: "Hoje", name: "Pernas", duration: "45 min" },
    { date: "Ontem", name: "Peito e Tríceps", duration: "50 min" },
    { date: "2 dias atrás", name: "Cardio", duration: "30 min" },
  ];

  const recentMeals = [
    { date: "Hoje", meal: "Café da Manhã", calories: 450 },
    { date: "Hoje", meal: "Almoço", calories: 650 },
    { date: "Ontem", meal: "Jantar", calories: 550 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-600 text-white py-8 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="flex justify-center">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <User className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Meu Perfil</h1>
          <p className="text-lg opacity-90">
            Gerencie suas informações e progresso
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card */}
        <Card className="shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">João da Silva</h2>
                <p className="text-gray-600 dark:text-gray-400">Membro desde Jan 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dados Principais */}
        <Card>
          <CardHeader>
            <CardTitle>Dados Principais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Idade</p>
                <p className="text-2xl font-bold">34 anos</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Altura</p>
                <p className="text-2xl font-bold">1.75 m</p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Peso Atual</p>
                <p className="text-2xl font-bold text-orange-600">78 kg</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Peso Desejado</p>
                <p className="text-2xl font-bold text-green-600">72 kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progresso Semanal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
              Progresso Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{week.week}</span>
                    <span className="text-orange-600 font-bold">{week.weight} kg</span>
                  </div>
                  <Progress
                    value={((84 - week.weight) / (84 - 72)) * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 rounded-lg text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Perdido</p>
              <p className="text-3xl font-bold text-green-600">-6 kg</p>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Treinos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="w-6 h-6 text-orange-600" />
              Histórico de Treinos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentWorkouts.map((workout, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{workout.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{workout.date}</p>
                </div>
                <span className="text-sm font-medium text-orange-600">
                  {workout.duration}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Histórico de Refeições */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6 text-orange-600" />
              Histórico de Refeições
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentMeals.map((meal, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{meal.meal}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{meal.date}</p>
                </div>
                <span className="text-sm font-medium text-orange-600">
                  {meal.calories} kcal
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium">joao.silva@email.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">Telefone</p>
                <p className="font-medium">(11) 99999-9999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <div className="flex-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">Data de Nascimento</p>
                <p className="font-medium">15/03/1990</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full h-14 justify-start text-left"
            size="lg"
          >
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
            size="lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
