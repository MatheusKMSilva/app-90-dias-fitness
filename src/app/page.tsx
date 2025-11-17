"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { User, Users, Sparkles, CheckCircle2, Upload, Loader2, Eye, Check } from "lucide-react";

type Gender = "male" | "female" | "other" | null;
type Step = "gender" | "questions" | "photo" | "loading" | "result" | "subscription";

interface Answers {
  gender: Gender;
  activityLevel: string;
  goals: string;
  exerciseFrequency: string;
  trainingLocation: string;
  mainBarrier: string;
  previousPlan: string;
  exerciseType: string;
  ageRange: string;
  dietaryRestrictions: string;
  favoriteFoods: string[];
  fastFoodFrequency: string;
  preferredTime: string;
  tryNewActivities: string;
  postWorkoutFeeling: string;
  mostGratifying: string;
}

export default function Home() {
  const [step, setStep] = useState<Step>("gender");
  const [answers, setAnswers] = useState<Answers>({
    gender: null,
    activityLevel: "",
    goals: "",
    exerciseFrequency: "",
    trainingLocation: "",
    mainBarrier: "",
    previousPlan: "",
    exerciseType: "",
    ageRange: "",
    dietaryRestrictions: "",
    favoriteFoods: [],
    fastFoodFrequency: "",
    preferredTime: "",
    tryNewActivities: "",
    postWorkoutFeeling: "",
    mostGratifying: "",
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const questions = [
    {
      id: "activityLevel",
      question: "Qual é o seu nível atual de atividade física?",
      type: "radio",
      options: [
        "Sedentário",
        "Levemente ativo (exercícios leves algumas vezes por semana)",
        "Moderadamente ativo (exercícios regulares)",
        "Muito ativo (exercícios intensos quase todos os dias)",
      ],
    },
    {
      id: "goals",
      question: "Quais são seus principais objetivos de fitness?",
      type: "radio",
      options: [
        "Perda de peso",
        "Ganho de massa muscular",
        "Melhora do condicionamento físico",
        "Saúde geral e bem-estar",
      ],
    },
    {
      id: "exerciseFrequency",
      question: "Quantas vezes por semana você gosta de se exercitar?",
      type: "radio",
      options: ["Nunca", "1-2 vezes", "3-4 vezes", "5 ou mais vezes"],
    },
    {
      id: "trainingLocation",
      question: "Você prefere treinar em casa ou na academia?",
      type: "radio",
      options: ["Em casa", "Na academia", "Ambos", "Ao ar livre"],
    },
    {
      id: "mainBarrier",
      question: "Qual é sua principal barreira para se exercitar?",
      type: "radio",
      options: [
        "Falta de tempo",
        "Falta de motivação",
        "Não sei por onde começar",
        "Outros compromissos",
      ],
    },
    {
      id: "previousPlan",
      question: "Você já seguiu algum plano de dieta ou treino antes?",
      type: "radio",
      options: ["Sim", "Não"],
    },
    {
      id: "exerciseType",
      question: "Qual tipo de exercício você mais gosta?",
      type: "radio",
      options: [
        "Cardio (corrida, ciclismo, etc.)",
        "Treino de força (musculação, calistenia, etc.)",
        "Flexibilidade (yoga, pilates, etc.)",
        "Variedade",
      ],
    },
    {
      id: "ageRange",
      question: "Qual é sua faixa etária?",
      type: "radio",
      options: ["Menos de 18 anos", "18-25 anos", "26-35 anos", "36 anos ou mais"],
    },
    {
      id: "dietaryRestrictions",
      question: "Você tem alguma restrição alimentar?",
      type: "radio",
      options: ["Sim", "Não", "Prefiro não dizer"],
    },
    {
      id: "favoriteFoods",
      question: "Quais são seus alimentos favoritos? (Escolha dois)",
      type: "checkbox",
      options: ["Frutas e vegetais", "Carnes", "Laticínios", "Grãos integrais"],
      maxSelections: 2,
    },
    {
      id: "fastFoodFrequency",
      question: "Com que frequência você consome fast food?",
      type: "radio",
      options: ["Nunca", "Raramente", "Às vezes", "Frequentemente"],
    },
    {
      id: "preferredTime",
      question: "Qual horário você prefere para treinar?",
      type: "radio",
      options: ["Manhã", "Tarde", "Noite", "Não tenho preferência"],
    },
    {
      id: "tryNewActivities",
      question: "Você está disposto a tentar novas atividades de fitness?",
      type: "radio",
      options: ["Sim, com certeza!", "Talvez", "Não, prefiro o que já conheço"],
    },
    {
      id: "postWorkoutFeeling",
      question: "Como você se sente após um treino?",
      type: "radio",
      options: ["Energizado", "Cansado", "Neutro", "Satisfeito"],
    },
    {
      id: "mostGratifying",
      question: "Qual desses resultados seria mais gratificante para você?",
      type: "radio",
      options: [
        "Sentir-se mais saudável",
        "Melhorar a autoestima",
        "Participar de uma competição",
        "Melhorar o desempenho em atividades diárias",
      ],
    },
  ];

  const handleGenderSelect = (gender: Gender) => {
    setAnswers({ ...answers, gender });
  };

  const handleContinueFromGender = () => {
    if (answers.gender) {
      setStep("questions");
    }
  };

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("photo");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isCurrentQuestionAnswered = () => {
    const question = questions[currentQuestion];
    const answer = answers[question.id as keyof Answers];
    
    if (question.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    return answer !== "" && answer !== null;
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinueFromPhoto = () => {
    if (uploadedPhoto) {
      setStep("loading");
      // Simular loading de 5-13 segundos
      const loadingTime = Math.random() * 8000 + 5000; // 5-13 segundos
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("result"), 500);
            return 100;
          }
          return prev + (100 / (loadingTime / 100));
        });
      }, 100);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Tela de seleção de gênero
  if (step === "gender") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-4 rounded-2xl">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Bem-vindo ao 90 Dias Fitness!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Para personalizar sua experiência e criar o plano perfeito para você, por favor, selecione seu sexo.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Imagem representativa */}
            <div className="flex justify-center gap-4 mb-8">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=500&fit=crop"
                alt="Fitness diversity"
                className="w-48 h-64 object-cover rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=500&fit=crop"
                alt="Fitness diversity"
                className="w-48 h-64 object-cover rounded-2xl shadow-lg hidden sm:block"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant={answers.gender === "male" ? "default" : "outline"}
                size="lg"
                className={`h-32 flex flex-col gap-3 transition-all duration-300 ${
                  answers.gender === "male"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg scale-105"
                    : "hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                }`}
                onClick={() => handleGenderSelect("male")}
              >
                <User className="w-10 h-10" />
                <span className="text-lg font-semibold">Homem</span>
              </Button>

              <Button
                variant={answers.gender === "female" ? "default" : "outline"}
                size="lg"
                className={`h-32 flex flex-col gap-3 transition-all duration-300 ${
                  answers.gender === "female"
                    ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg scale-105"
                    : "hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-950"
                }`}
                onClick={() => handleGenderSelect("female")}
              >
                <User className="w-10 h-10" />
                <span className="text-lg font-semibold">Mulher</span>
              </Button>

              <Button
                variant={answers.gender === "other" ? "default" : "outline"}
                size="lg"
                className={`h-32 flex flex-col gap-3 transition-all duration-300 ${
                  answers.gender === "other"
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg scale-105"
                    : "hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950"
                }`}
                onClick={() => handleGenderSelect("other")}
              >
                <Users className="w-10 h-10" />
                <span className="text-lg font-semibold">Outros</span>
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg"
              onClick={handleContinueFromGender}
              disabled={!answers.gender}
            >
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de perguntas
  if (step === "questions") {
    const question = questions[currentQuestion];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-2xl border-0">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  Pergunta {currentQuestion + 1} de {questions.length}
                </CardTitle>
                <span className="text-sm font-medium text-muted-foreground">
                  {Math.round(progress)}% completo
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <CardDescription className="text-xl font-medium text-gray-800 dark:text-gray-200 pt-4">
                {question.question}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {question.type === "radio" && (
                <RadioGroup
                  value={answers[question.id as keyof Answers] as string}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  className="space-y-3"
                >
                  {question.options?.map((option) => (
                    <div
                      key={option}
                      className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-accent transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="flex-1 cursor-pointer text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "checkbox" && (
                <div className="space-y-3">
                  {question.options?.map((option) => {
                    const currentAnswers = (answers[question.id as keyof Answers] as string[]) || [];
                    const isChecked = currentAnswers.includes(option);
                    const maxSelections = question.maxSelections || Infinity;
                    const canSelect = currentAnswers.length < maxSelections || isChecked;
                    
                    return (
                      <div
                        key={option}
                        className={`flex items-center space-x-3 border rounded-lg p-4 transition-colors ${
                          canSelect ? "hover:bg-accent cursor-pointer" : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          if (!canSelect) return;
                          const newAnswers = isChecked
                            ? currentAnswers.filter((a) => a !== option)
                            : [...currentAnswers, option];
                          handleAnswerChange(question.id, newAnswers);
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          disabled={!canSelect}
                          className="w-5 h-5 rounded border-gray-300"
                        />
                        <Label className="flex-1 cursor-pointer text-base">{option}</Label>
                      </div>
                    );
                  })}
                  {question.maxSelections && (
                    <p className="text-sm text-muted-foreground text-center">
                      Selecione até {question.maxSelections} opções
                    </p>
                  )}
                </div>
              )}

              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex-1"
                >
                  Anterior
                </Button>
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!isCurrentQuestionAnswered()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                >
                  {currentQuestion === questions.length - 1 ? "Finalizar" : "Próxima"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Tela de upload de foto
  if (step === "photo") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-4 rounded-2xl">
                <Upload className="w-12 h-12 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Adicione sua foto
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Envie uma foto sua para que possamos gerar uma visualização de como você ficará após 90 dias!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {!uploadedPhoto ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-12 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 transition-all"
              >
                <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Clique para adicionar sua foto
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG ou JPEG (máx. 10MB)
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={uploadedPhoto}
                    alt="Foto enviada"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Trocar foto
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg"
              onClick={handleContinueFromPhoto}
              disabled={!uploadedPhoto}
            >
              Continuar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de loading
  if (step === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardContent className="py-16 space-y-8">
            <div className="flex justify-center">
              <Loader2 className="w-20 h-20 text-orange-500 animate-spin" />
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Criando seu plano perfeito...
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Estamos analisando suas respostas e gerando uma transformação incrível para você!
              </p>
            </div>

            <div className="space-y-3">
              <Progress value={loadingProgress} className="h-3" />
              <p className="text-center text-sm text-muted-foreground">
                {Math.round(loadingProgress)}% completo
              </p>
            </div>

            <div className="space-y-3 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>✓ Analisando seu perfil e objetivos</p>
              <p>✓ Criando plano de treino personalizado</p>
              <p>✓ Gerando sua transformação em 90 dias</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de resultado (foto borrada)
  if (step === "result") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-0">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Sua transformação em 90 dias!
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Veja como você ficará seguindo nosso plano personalizado
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Foto original */}
              <div className="space-y-2">
                <p className="text-center font-semibold text-gray-700 dark:text-gray-300">Hoje</p>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src={uploadedPhoto || ""}
                    alt="Foto atual"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* Foto transformada (borrada) */}
              <div className="space-y-2">
                <p className="text-center font-semibold text-gray-700 dark:text-gray-300">
                  Após 90 dias
                </p>
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={uploadedPhoto || ""}
                    alt="Transformação"
                    className="w-full h-80 object-cover blur-2xl"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Eye className="w-12 h-12 text-white mx-auto" />
                      <p className="text-white font-semibold text-lg px-4">
                        Clique para revelar sua transformação
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 shadow-lg"
              onClick={() => setStep("subscription")}
            >
              <Eye className="w-5 h-5 mr-2" />
              Revelar Transformação
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tela de assinatura
  if (step === "subscription") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Escolha seu plano
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comece sua jornada de transformação hoje mesmo!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plano Mensal */}
            <Card className="relative shadow-2xl border-2 border-orange-200 dark:border-orange-800 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center space-y-4 pb-8">
                <div className="inline-block bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400 px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
                <CardTitle className="text-3xl font-bold">Plano Mensal</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl text-gray-400 line-through">R$ 37,90</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-orange-600">R$ 19,90</span>
                    <span className="text-gray-600 dark:text-gray-400">/mês</span>
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    Economize 47%
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Plano de treino personalizado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Acompanhamento semanal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Plano alimentar customizado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Suporte via chat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Acesso ao app mobile</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg"
                >
                  Assinar Plano Mensal
                </Button>
              </CardContent>
            </Card>

            {/* Plano Anual */}
            <Card className="relative shadow-2xl border-2 border-pink-200 dark:border-pink-800 hover:scale-105 transition-transform duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                Melhor Custo-Benefício
              </div>
              
              <CardHeader className="text-center space-y-4 pb-8 pt-8">
                <CardTitle className="text-3xl font-bold">Plano Anual</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-2xl text-gray-400 line-through">R$ 297,00</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-pink-600">R$ 147,00</span>
                    <span className="text-gray-600 dark:text-gray-400">/ano</span>
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-semibold">
                    Economize 50%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Apenas R$ 12,25/mês
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Tudo do plano mensal +</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Consultoria nutricional mensal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Acesso a treinos exclusivos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Comunidade VIP</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Suporte prioritário 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Garantia de 30 dias</span>
                  </li>
                </ul>

                <Button
                  size="lg"
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 shadow-lg"
                >
                  Assinar Plano Anual
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🔒 Pagamento 100% seguro • Cancele quando quiser • Sem taxas ocultas
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
