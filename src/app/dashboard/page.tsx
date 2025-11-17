"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Dumbbell, 
  Calendar, 
  TrendingUp, 
  Award, 
  LogOut, 
  User,
  Clock,
  Target,
  Flame,
  CheckCircle2
} from "lucide-react";

interface WorkoutDay {
  day: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    rest: string;
  }[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutDay[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/auth");
        return;
      }

      setUser(user);
      await loadWorkoutPlan(user.id);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      router.push("/auth");
    } finally {
      setLoading(false);
    }
  };

  const loadWorkoutPlan = async (userId: string) => {
    try {
      // Buscar respostas do quiz do usuário
      const { data: quizData } = await supabase
        .from("quiz_responses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (quizData) {
        // Gerar plano de treino baseado nas respostas
        const plan = generateWorkoutPlan(quizData);
        setWorkoutPlan(plan);
      }
    } catch (error) {
      console.error("Erro ao carregar plano:", error);
    }
  };

  const generateWorkoutPlan = (quizData: any): WorkoutDay[] => {
    const { goals, exercise_type, training_location, activity_level } = quizData;

    // Plano básico baseado nos objetivos
    if (goals === "Perda de peso") {
      return [
        {
          day: "Segunda-feira",
          exercises: [
            { name: "Corrida/Caminhada", sets: "1", reps: "30 min", rest: "-" },
            { name: "Burpees", sets: "3", reps: "15", rest: "60s" },
            { name: "Mountain Climbers", sets: "3", reps: "20", rest: "45s" },
            { name: "Prancha", sets: "3", reps: "45s", rest: "30s" },
          ],
        },
        {
          day: "Quarta-feira",
          exercises: [
            { name: "Ciclismo/Elíptico", sets: "1", reps: "40 min", rest: "-" },
            { name: "Agachamento", sets: "4", reps: "15", rest: "60s" },
            { name: "Flexão", sets: "3", reps: "12", rest: "60s" },
            { name: "Abdominal", sets: "3", reps: "20", rest: "45s" },
          ],
        },
        {
          day: "Sexta-feira",
          exercises: [
            { name: "HIIT Cardio", sets: "1", reps: "25 min", rest: "-" },
            { name: "Polichinelo", sets: "4", reps: "30", rest: "30s" },
            { name: "Afundo", sets: "3", reps: "12/perna", rest: "60s" },
            { name: "Prancha Lateral", sets: "3", reps: "30s/lado", rest: "30s" },
          ],
        },
      ];
    } else if (goals === "Ganho de massa muscular") {
      return [
        {
          day: "Segunda-feira - Peito e Tríceps",
          exercises: [
            { name: "Supino Reto", sets: "4", reps: "8-10", rest: "90s" },
            { name: "Supino Inclinado", sets: "3", reps: "10-12", rest: "90s" },
            { name: "Crucifixo", sets: "3", reps: "12", rest: "60s" },
            { name: "Tríceps Testa", sets: "3", reps: "10-12", rest: "60s" },
            { name: "Tríceps Corda", sets: "3", reps: "12-15", rest: "45s" },
          ],
        },
        {
          day: "Quarta-feira - Costas e Bíceps",
          exercises: [
            { name: "Barra Fixa", sets: "4", reps: "8-10", rest: "90s" },
            { name: "Remada Curvada", sets: "4", reps: "10-12", rest: "90s" },
            { name: "Pulldown", sets: "3", reps: "12", rest: "60s" },
            { name: "Rosca Direta", sets: "3", reps: "10-12", rest: "60s" },
            { name: "Rosca Martelo", sets: "3", reps: "12", rest: "60s" },
          ],
        },
        {
          day: "Sexta-feira - Pernas e Ombros",
          exercises: [
            { name: "Agachamento Livre", sets: "4", reps: "8-10", rest: "120s" },
            { name: "Leg Press", sets: "4", reps: "12-15", rest: "90s" },
            { name: "Stiff", sets: "3", reps: "10-12", rest: "90s" },
            { name: "Desenvolvimento", sets: "4", reps: "10-12", rest: "90s" },
            { name: "Elevação Lateral", sets: "3", reps: "12-15", rest: "60s" },
          ],
        },
      ];
    } else {
      // Plano geral para condicionamento físico
      return [
        {
          day: "Segunda-feira - Corpo Todo",
          exercises: [
            { name: "Agachamento", sets: "3", reps: "15", rest: "60s" },
            { name: "Flexão", sets: "3", reps: "12", rest: "60s" },
            { name: "Remada com Peso", sets: "3", reps: "12", rest: "60s" },
            { name: "Prancha", sets: "3", reps: "45s", rest: "30s" },
          ],
        },
        {
          day: "Quarta-feira - Cardio e Core",
          exercises: [
            { name: "Corrida Moderada", sets: "1", reps: "30 min", rest: "-" },
            { name: "Abdominal", sets: "3", reps: "20", rest: "45s" },
            { name: "Bicicleta no Ar", sets: "3", reps: "30", rest: "45s" },
            { name: "Prancha Lateral", sets: "3", reps: "30s/lado", rest: "30s" },
          ],
        },
        {
          day: "Sexta-feira - Força e Resistência",
          exercises: [
            { name: "Afundo", sets: "3", reps: "12/perna", rest: "60s" },
            { name: "Desenvolvimento", sets: "3", reps: "12", rest: "60s" },
            { name: "Rosca Bíceps", sets: "3", reps: "12", rest: "60s" },
            { name: "Tríceps Banco", sets: "3", reps: "15", rest: "60s" },
          ],
        },
      ];
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando seu plano...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  90 Dias Fitness
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Bem-vindo, {user?.email?.split("@")[0]}!
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Semana Atual</p>
                  <p className="text-3xl font-bold text-orange-600">{currentWeek}</p>
                </div>
                <Calendar className="w-10 h-10 text-orange-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dias Restantes</p>
                  <p className="text-3xl font-bold text-pink-600">{90 - (currentWeek - 1) * 7}</p>
                </div>
                <Clock className="w-10 h-10 text-pink-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Progresso</p>
                  <p className="text-3xl font-bold text-green-600">
                    {Math.round(((currentWeek - 1) / 12) * 100)}%
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Treinos</p>
                  <p className="text-3xl font-bold text-blue-600">{(currentWeek - 1) * 3}</p>
                </div>
                <Award className="w-10 h-10 text-blue-500 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-600" />
              Sua Jornada de 90 Dias
            </CardTitle>
            <CardDescription>
              Você está na semana {currentWeek} de 12
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={((currentWeek - 1) / 12) * 100} className="h-4" />
            <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Início</span>
              <span>Semana {currentWeek}</span>
              <span>Meta: 90 dias</span>
            </div>
          </CardContent>
        </Card>

        {/* Workout Plan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              Seu Plano de Treino Personalizado
            </CardTitle>
            <CardDescription>
              Treinos criados especialmente para você baseados em suas respostas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {workoutPlan.map((day, index) => (
                  <TabsTrigger key={index} value={index.toString()}>
                    {day.day.split(" - ")[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {workoutPlan.map((day, dayIndex) => (
                <TabsContent key={dayIndex} value={dayIndex.toString()} className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950 dark:to-pink-950 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">{day.day}</h3>
                    <div className="space-y-3">
                      {day.exercises.map((exercise, exIndex) => (
                        <div
                          key={exIndex}
                          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {exercise.name}
                              </h4>
                              <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>
                                  <strong>Séries:</strong> {exercise.sets}
                                </span>
                                <span>
                                  <strong>Reps:</strong> {exercise.reps}
                                </span>
                                <span>
                                  <strong>Descanso:</strong> {exercise.rest}
                                </span>
                              </div>
                            </div>
                            <CheckCircle2 className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-green-500 cursor-pointer transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      💡 Dicas para este treino:
                    </h4>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Faça um aquecimento de 5-10 minutos antes de começar</li>
                      <li>• Mantenha a forma correta em todos os exercícios</li>
                      <li>• Hidrate-se durante o treino</li>
                      <li>• Alongue-se ao final da sessão</li>
                    </ul>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Nutrition Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Dicas de Nutrição</CardTitle>
            <CardDescription>
              Alimentação balanceada é essencial para seus resultados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  ✅ Alimentos Recomendados
                </h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>• Proteínas magras (frango, peixe, ovos)</li>
                  <li>• Carboidratos complexos (batata doce, arroz integral)</li>
                  <li>• Vegetais variados</li>
                  <li>• Frutas frescas</li>
                  <li>• Gorduras saudáveis (abacate, castanhas)</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                  ⚠️ Evite ou Modere
                </h4>
                <ul className="text-sm text-red-800 dark:text-red-200 space-y-1">
                  <li>• Alimentos ultraprocessados</li>
                  <li>• Refrigerantes e bebidas açucaradas</li>
                  <li>• Frituras em excesso</li>
                  <li>• Doces e sobremesas frequentes</li>
                  <li>• Fast food regular</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
